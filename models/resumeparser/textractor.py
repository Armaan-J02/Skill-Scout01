import os
import PyPDF2
import docx
import nltk
import spacy
import re
import phonenumbers
from phonenumbers import geocoder
from string import punctuation
from sklearn.feature_extraction.text import TfidfVectorizer
import json

# Load spaCy NER model
nlp = spacy.load('en_core_web_sm')

# Define your list of common Indian names
common_indian_names = ["Aarav", "Aryan", "Aaradhya", "Advait", "Aditi", "Ahaan", "Ahana", "Aisha", "Arya", "Avinash",
                       "Divya", "Dhruv", "Ishaan", "Ishani", "Kabir", "Kiara", "Krish", "Krisha", "Manvi", "Mihir",
                       "Mira", "Mohammed", "Myra", "Neha", "Neel", "Nehal", "Pranav", "Preeti", "Reyansh", "Riya",
                       "Rohan", "Saanvi", "Samarth", "Sara", "Shanaya", "Shiv", "Siya", "Shaurya", "Tara", "Vivaan"]

# Load the skills database from the JSON file


def load_skills_database(file_path):
    with open(file_path, "r") as json_file:
        data = json.load(json_file)
    return data

# Function to preprocess text (lowercase, remove punctuation, etc.)
def preprocess_text(text):
    # Convert to lowercase and remove punctuation
    processed_text = text.lower()
    processed_text = "".join(
        char for char in processed_text if char not in punctuation)
    return processed_text

# Function to extract skills from the resume
def extract_skills(resume_text, skills_database):
    # Define a list to store the extracted skills
    extracted_skills = []

    # Perform keyword matching to extract skills
    skill_keywords = skills_database["skills"]
    extracted_skills.extend([skill.lower() for skill in skill_keywords if re.search(
        rf'\b{re.escape(skill)}\b', resume_text, re.IGNORECASE)])

    # Use spaCy for Named Entity Recognition (NER) to extract named entities related to skills
    doc = nlp(resume_text)
    for ent in doc.ents:
        if ent.label_ == "SKILL":
            extracted_skills.append(ent.text.lower())

    # Perform post-processing to remove duplicates
    extracted_skills = list(set(extracted_skills))

    return extracted_skills

# Function to extract years of experience using regex


def extract_years_of_experience(resume_text):
    # Define regular expressions for various ways of mentioning years of experience
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

# Function to extract education using keyword matching or TF-IDF


def extract_education(resume_text, corpus):
    # Implement the code for education extraction using keyword matching or TF-IDF
    # For example:
    education_keywords = [
        "education", "degree", "university", "college", "school", "qualification", "academic",
        "ssc", "hsc", "matriculation", "intermediate", "bachelor", "master", "diploma", "phd",
        "btech", "mtech", "be", "me", "bcom", "mcom", "bba", "mba", "bca", "mca",
        "ug", "pg", "10th", "12th", "graduation", "post graduation", "doctorate", "board exam"
    ]
    # Add more Indian education-related terms here...

    found_education = []
    for keyword in education_keywords:
        if keyword in resume_text.lower():
            found_education.append(keyword)

    # TF-IDF
    preprocessed_resume = preprocess_text(resume_text)
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(corpus)
    resume_vector = vectorizer.transform([preprocessed_resume])

    # Find the words with highest TF-IDF scores in the resume
    feature_names = vectorizer.get_feature_names_out()
    tfidf_scores = resume_vector.toarray()[0]
    sorted_tfidf_scores = sorted(
        zip(tfidf_scores, feature_names), reverse=True)

    # Extract education-related words (e.g., degree, university) from the sorted TF-IDF scores
    education_keywords_tfidf = [
        "education", "degree", "university", "college", "school", "qualification", "academic"]
    found_education_tfidf = [
        word for score, word in sorted_tfidf_scores if word.lower() in education_keywords_tfidf]

    # Combine both methods and remove duplicates
    education = list(set(found_education + found_education_tfidf))

    return education

# Function to extract names using NER


def extract_names(resume_text):
    doc = nlp(resume_text)
    names = []
    for ent in doc.ents:
        if ent.label_ == "PERSON" and ent.text in common_indian_names:
            names.append(ent.text)
    return names

# Function to extract emails using regex
def extract_emails(text):
    emails = re.findall(r'\S+@\S+', text)
    return emails

# Function to extract contact numbers using phonenumbers library
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


def process_resumes(resume_folder, output_folder, skills_database_file_path):
    resume_texts, corpus = convert_files_to_text(resume_folder)

    # Load the skills database from the JSON file
    skills_database = load_skills_database(skills_database_file_path)

    for i, resume_text in enumerate(resume_texts):
        extracted_info = {
            "Names": extract_names(resume_text),
            "Skills": extract_skills(resume_text, skills_database),
            "Years of Experience": extract_years_of_experience(resume_text),
            "Education": extract_education(resume_text, corpus),
            "Emails": extract_emails(resume_text),
            "Contact Numbers": extract_contact_numbers(resume_text)
        }

        filename = f"extracted_info_{i + 1}"
        save_extracted_info(output_folder, filename, extracted_info)


# Example usage:
resume_folder_path = "storage/inputresume"
output_folder_path = "storage/outputtextresume"
skills_database_file_path = "models/resumeparser/skills_database.json"
process_resumes(resume_folder_path, output_folder_path,
                skills_database_file_path)