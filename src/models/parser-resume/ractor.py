import os
import docx2txt
import PyPDF2
import textract
import string
from patterns import patterns
from skills import skills
import re
import json

""" 
    This extract_text function will extract text from a file using its file extension, 
    split the extracted text into paragraphs using newline characters as delimiters,
    Remove unnecessary punctuations from the extracted text.
"""
def extract_text(filepath):
    extension = os.path.splitext(filepath)[1][1:].lower()
    if extension == 'txt':
        with open(filepath, 'r') as f:
            text = f.read()
    elif extension == 'docx':
        text = docx2txt.process(filepath)
    elif extension == 'pdf':
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f, strict=False)
            pages = [page.extract_text() for page in reader.pages]
            text = '\n'.join(pages)
    else:
        text = textract.process(filepath).decode('utf-8')

    # Splitting text into paragraphs using newline characters as delimiters
    paragraphs = text.split('\n\n') # Split by double newline to represent paragraphs
    
    # Removing unnecessary punctuations from the extracted text.
    translator = str.maketrans('', '', string.punctuation)
    paragraphs = [paragraph.translate(translator) for paragraph in paragraphs]
    
    return paragraphs
#------------------------------------------------------------
'''
    Defining a function whose funciton would be to consider the paragraph or sentence as the content under that heading when match is found!
'''

def extract_content(paragraphs, patterns_dict):
    """
    Extract headings and content based on the provided patterns.
    """
    extracted_data = {}
    current_heading = None
    
    for paragraph in paragraphs:
        for heading, keywords in patterns_dict["titles"].items():
            for keyword in keywords:
                if keyword in paragraph.lower():
                    current_heading = heading
                    break
        
        if current_heading:
            # Store the paragraph as content under the current heading
            if current_heading not in extracted_data:
                extracted_data[current_heading] = paragraph
            else:
                extracted_data[current_heading] += '\n' + paragraph
        
        current_heading = None  # Reset the current_heading
    
    return extracted_data
#-----------------------------------------------------------
'''
    Function to extract name from the resume file.
'''
def extract_name(text):
    name = ""
    # Extract name using the regularizaiton in patterns dictionary.
    name_matches = re.findall(patterns['regular']['name'][0], text, re.IGNORECASE)
    if name_matches:
        name = ' '.join(name_matches[0])
    return name
#-----------------------------------------------------------
'''
    Funciton to extract email from the resume file.
'''
def extract_email(text):
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    matches = re.findall(email_pattern, text)
    if matches:
        return matches[0]
    else:
        return ""


filename = 'rohit.txt'  # Replace this with the actual input filename
filepath = os.path.join('storage/inputresume', filename)

paragraphs = extract_text(filepath) 

content = extract_content(paragraphs, patterns)
for heading, content in content.items():
    print(heading,"\n",content,"\n")

output_fname = f"{filename.split('.')[0]}_parsed.json"
output_filepath = os.path.join('storage/output', output_fname)

