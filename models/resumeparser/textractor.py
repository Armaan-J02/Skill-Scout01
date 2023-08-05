import os
import PyPDF2
import docx
import nltk
import spacy
import re
import json
import phonenumbers
from phonenumbers import geocoder
from string import punctuation
from sklearn.feature_extraction.text import TfidfVectorizer
from skillextractor import extract_skills
from nameextractor import extract_names

nlp = spacy.load('en_core_web_sm')


def preprocess_text(text):
    processed_text = text.lower()
    processed_text = "".join(
        char for char in processed_text if char not in punctuation)
    return processed_text


def extract_years_of_experience(resume_text):
    patterns = [
        r'(\d+)\s*(year|yr)s?(\s*(of\s*)?experience)?',
        r'(\d+)\s*(year|yr)s?\s*(\d+)\s*(month|mon|mn)s?(\s*(of\s*)?experience)?',
        r'(\d+)\s*(year|yr)s?\s*(\d+)\s*(month|mon|mn)s?\s*(\d+)\s*(day|d|dy)s?',
        r'(\d+)\s*(year|yr)s?,?\s*(\d+)\s*(day|d|dy)s?',
        r'(\d+)\s*(month|mon|mn)s?(\s*(of\s*)?experience)?',
        r'(\d+)\s*(month|mon|mn)s?\s*(\d+)\s*(day|d|dy)s?',
    ]

    years_of_experience = []
    for pattern in patterns:
        matches = re.findall(pattern, resume_text, re.IGNORECASE)
        for match in matches:
            total_years = 0
            for i in range(len(match)):
                if match[i].isdigit():
                    if i + 1 < len(match) and match[i + 1] in ["year", "yr"]:
                        total_years += int(match[i])
                    elif i + 2 < len(match) and match[i + 2] in ["year", "yr"]:
                        total_years += int(match[i])
            years_of_experience.append(total_years)

    return years_of_experience


def extract_education(resume_text, corpus):
    education_keywords = [
        "education", "degree", "university", "college", "school", "qualification", "academic",
        "ssc", "hsc", "matriculation", "intermediate", "bachelor", "master", "diploma", "phd",
        "btech", "mtech", "be", "me", "bcom", "mcom", "bba", "mba", "bca", "mca",
        "ug", "pg", "10th", "12th", "graduation", "post graduation", "doctorate", "board exam"
    ]
    found_education = []
    for keyword in education_keywords:
        if keyword in resume_text.lower():
            found_education.append(keyword)
    preprocessed_resume = preprocess_text(resume_text)
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(corpus)
    resume_vector = vectorizer.transform([preprocessed_resume])
    feature_names = vectorizer.get_feature_names_out()
    tfidf_scores = resume_vector.toarray()[0]
    sorted_tfidf_scores = sorted(
        zip(tfidf_scores, feature_names), reverse=True)

    education_keywords_tfidf = [
        "education", "degree", "university", "college", "school", "qualification", "academic"]
    found_education_tfidf = [
        word for score, word in sorted_tfidf_scores if word.lower() in education_keywords_tfidf]

    education = list(set(found_education + found_education_tfidf))

    return education


def extract_emails(text):
    emails = re.findall(r'\S+@\S+', text)
    return emails


def extract_contact_numbers(text):
    contact_numbers = []
    phone_numbers = phonenumbers.PhoneNumberMatcher(text, "IN")
    for match in phone_numbers:
        number = phonenumbers.format_number(
            match.number, phonenumbers.PhoneNumberFormat.E164)
        contact_numbers.append(number)
    return contact_numbers


def save_extracted_info(output_folder, filename, data):
    output_file_path = os.path.join(output_folder, f"{filename}.json")
    with open(output_file_path, "w") as f:
        json.dump(data, f, indent=4)


def extract_text_from_pdf(pdf_file):
    with open(pdf_file, 'rb') as file:
        pdf_reader = PyPDF2.PdfFileReader(file)
        text = ""
        for page_num in range(pdf_reader.numPages):
            page = pdf_reader.getPage(page_num)
            text += page.extract_text()
    return text


def extract_text_from_docx(docx_file):
    doc = docx.Document(docx_file)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text


def convert_files_to_text(directory_path):
    text_data = []
    corpus = []

    for filename in os.listdir(directory_path):
        if filename.endswith(".pdf"):
            pdf_file = os.path.join(directory_path, filename)
            text = extract_text_from_pdf(pdf_file)
            corpus.append(preprocess_text(text))
            text_data.append(text)

        elif filename.endswith(".docx"):
            docx_file = os.path.join(directory_path, filename)
            text = extract_text_from_docx(docx_file)
            corpus.append(preprocess_text(text))
            text_data.append(text)

    return text_data, corpus


def process_resumes(resume_folder, output_folder):
    resume_texts, corpus = convert_files_to_text(resume_folder)

    nlp = spacy.load('en_core_web_sm')

    for i, resume_text in enumerate(resume_texts):
        extracted_info = {
            "Names":  extract_names(resume_text),
            "Skills": extract_skills(resume_text),
            "Years of Experience": extract_years_of_experience(resume_text),
            "Education": extract_education(resume_text, corpus),
            "Emails": extract_emails(resume_text),
            "Contact Numbers": extract_contact_numbers(resume_text)
        }

        filename = f"extracted_info_{i + 1}"
        save_extracted_info(output_folder, filename, extracted_info)


resume_folder_path = "storage/inputresume"
output_folder_path = "storage/outputtextresume"
process_resumes(resume_folder_path, output_folder_path)