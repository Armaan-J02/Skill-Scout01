import re
import docx2txt
import PyPDF2
import textract
import csv
import datetime
from patterns import patterns
import os
import json

def extract_text(filepath):
    """
    Extract text from a file using its file extension.
    """
    extension = os.path.splitext(filepath)[1][1:].lower()
    if extension == 'txt':
        with open(filepath, 'r') as f:
            text = f.read()
    elif extension == 'docx':
        text = docx2txt.process(filepath)
    elif extension == 'pdf':
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f, strict=False)
            pages = [reader.pages[i].extract_text() for i in range(len(reader.pages))]
            text = '\n'.join(pages)
    else:
        text = textract.process(filepath).decode('utf-8')
    return text.lower()

def extract_information(text):
    extracted_info = {}
    
     # Extract first name
    first_name_pattern = r"(?i)(?:\b(?:mr|ms|miss|mrs)\.\s*)?([a-z]+(?: [a-z]+)*)\b"
    first_name_match = re.search(first_name_pattern, text)
    if first_name_match:
        extracted_info['first_name'] = first_name_match.group(1)

    # Extract Sex/Gender
    gender_pattern = r"(?i)(male|female|other)"
    extracted_info['gender'] = re.findall(gender_pattern, text)
    
    # Extract email addresses
    email_pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b"
    extracted_info['email'] = re.findall(email_pattern, text)
    
    # Extract phone numbers
    phone_pattern = r"\b(?:\d{10}|\d{3}-\d{3}-\d{4}|\(\d{3}\)\s*\d{3}-\d{4})\b"
    extracted_info['phone'] = re.findall(phone_pattern, text)
    

    # Extract LinkedIn profiles
    linkedin_pattern = r"(?i)linkedin\.com\/in\/([a-z0-9-]+)"
    extracted_info['linkedin'] = re.findall(linkedin_pattern, text)
    
    # Extract GitHub profiles
    github_pattern = r"(?i)github\.com\/([a-z0-9-]+)"
    extracted_info['github'] = re.findall(github_pattern, text)
    
    # Extract Twitter profiles
    twitter_pattern = r"(?i)twitter\.com\/([a-z0-9_]+)"
    extracted_info['twitter'] = re.findall(twitter_pattern, text)
    
    instagram_pattern = r"(?i)instagram\.com\/([a-z0-9_]+)"
    facebook_pattern = r"(?i)facebook\.com\/([a-z0-9_]+)"
    extracted_info['instagram'] = re.findall(instagram_pattern, text)
    extracted_info['facebook'] = re.findall(facebook_pattern, text)
    
    
    return extracted_info

input_filename = 'Abiral_Pandey_Fullstack_Java.docx'  # Replace this with the actual input filename
input_filepath = os.path.join('storage/inputresume', input_filename)
resume_text = extract_text(input_filepath)
info = extract_information(resume_text)

output_filename = input_filename.split('.')[0] + '_info.json'
output_filepath = os.path.join('storage/output', output_filename)

with open(output_filepath, 'w') as output_file:
    json.dump(info, output_file, indent=2)