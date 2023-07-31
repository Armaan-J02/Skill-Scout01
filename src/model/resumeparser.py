import os
import textract
from PyPDF2 import PdfReader
from PyPDF2.errors import PdfReadError
import pandas as pd
from docx import Document
import re


def extract_text_from_text_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()


def extract_text_from_word(file_path):
    try:
        doc = Document(file_path)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    except Exception as e:
        print(f"Error while extracting text from Word file: {e}")
        return None


def extract_text_from_pdf(file_path):
    try:
        text = textract.process(file_path).decode('utf-8')
        return text
    except Exception as e:
        print(f"Error while extracting text from PDF: {e}")
        return None


def extract_name(text):
    match = re.search(
        r'\b([A-Z][a-z]+(?:\s+[A-Z]\.\s*)?(?:[A-Z][a-z]+)?)\b', text, re.IGNORECASE)
    if match:
        return match.group(1)
    return None


def extract_dob(text):
    match = re.search(
        r'\b((?:19|20)\d{2}[-/](?:0?[1-9]|1[0-2])[-/](?:0?[1-9]|[12]\d|3[01]))\b', text)
    if match:
        return match.group(1)
    return None


def extract_skills(text):
    match = re.search(
        r'\b((?:[A-Za-z]+(?:/[A-Za-z]+)?(?:,\s*|\s+and\s+)?)+)\b', text)
    if match:
        skills_str = match.group(1)
        return [skill.strip() for skill in skills_str.split(',')]
    return []


def process_file(input_file_path):
    if input_file_path.endswith('.docx'):
        extracted_text = extract_text_from_word(input_file_path)
    elif input_file_path.endswith('.DOCX'):
        extracted_text = extract_text_from_word(input_file_path)
    elif input_file_path.endswith('.pdf'):
        extracted_text = extract_text_from_pdf(input_file_path)
    elif input_file_path.endswith('.txt'):
        extracted_text = extract_text_from_text_file(input_file_path)
    else:
        print(f"Unsupported file format: {input_file_path}")
        return None
    return extracted_text


def process_files_in_folder(input_folder, output_file):
    resume_data = []
    for root, _, files in os.walk(input_folder):
        for file in files:
            input_file_path = os.path.join(root, file)
            data = process_file(input_file_path)
            resume_data.append(data)

    df = pd.DataFrame(resume_data)
    df.to_csv(output_file, index=False)
    print("Resume data extracted and saved to CSV successfully.")


if __name__ == "__main__":
    input_folder = "src/storage/resumeinput"
    output_file = "src/storage/resumeoutput/resume_output.csv"
    if not os.path.exists(input_folder):
        print("Input folder does not exist.")
        exit()

    process_files_in_folder(input_folder, output_file)
