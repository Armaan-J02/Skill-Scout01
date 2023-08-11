import re
import docx2txt
import PyPDF2
import textract
import csv
import datetime
import os
from patterns import patterns
from skills import kills
import json
import string

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
    #Removing unnecessary punctuations from the extracted text.
    text = text.translate.process(str.maketrans('','', string.punctuation))
    return text.lower()


'''This function is extracting name from the resume using the regulare expression 
defined in the patterns dictionary in the patterns.py module.''' 
def extract_name(text):
    name = ""
    # Extract name using the pattern
    name_matches = re.findall(patterns['regular']['name'][0], text, re.IGNORECASE)
    if name_matches:
        name = ' '.join(name_matches[0])
    return name

'''This function is extracting email from the resume using the email_pattern logic
defined in this function itself!'''
def extract_email(text):
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    matches = re.findall(email_pattern, text)
    if matches:
        return matches[0]
    else:
        return ""




input_filename = 'Abiral_Pandey_Fullstack_Java.docx'  # Replace this with the actual input filename
input_filepath = os.path.join('storage/inputresume', input_filename)
resume_text = extract_text(input_filepath)

name = extract_name(resume_text)
email = extract_email(resume_text)
print("Name:", name)
print("Email", email)

parsed_info = {
    "name": name,
    "e-mail": email,
    
}

# Define the output filename based on the input filename
output_filename = f"{input_filename.split('.')[0]}_parsed.json"
output_filepath = os.path.join('storage/output', output_filename)

# Save the extracted information to a JSON file
with open(output_filepath, 'w') as output_file:
    json.dump(parsed_info, output_file, indent=2)
