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

def extract_objective(text):
    objective = ""
    objective_pattern = patterns['titles']['objective'][0]
    objective_matches = re.finditer(objective_pattern, text, re.IGNORECASE)
    
    for match in objective_matches:
        start = match.end()  # Start right after the heading
        
        # Find the end of the objective section
        next_heading_start = len(text)  # Initialize with the end of the text

        for title, title_patterns in patterns['titles'].items():
            if title != 'objective':
                for pattern in title_patterns:
                    matches = re.finditer(pattern, text, re.IGNORECASE)
                    for m in matches:
                        pattern_start = m.start()
                        if 0 <= pattern_start < next_heading_start:
                            next_heading_start = pattern_start

        end = next_heading_start
        objective = text[start:end].strip()

    return objective

def extract_summary(text):
    summary = ""
    summary_pattern = r'summary'
    summary_matches = re.finditer(summary_pattern, text, re.IGNORECASE)
    
    for match in summary_matches:
        start = match.end()  # Start right after the heading
        next_heading_start = len(text)  # Initialize with the end of the text

        for title in patterns['titles']:
            if title.lower() != 'summary':
                title_patterns = patterns['titles'][title]
                for pattern in title_patterns:
                    matches = re.finditer(pattern, text, re.IGNORECASE)
                    for m in matches:
                        pattern_start = m.start()
                        if 0 <= pattern_start < next_heading_start:
                            next_heading_start = pattern_start

        end = next_heading_start
        summary = text[start:end].strip()

    return summary



input_filename = 'Abiral_Pandey_Fullstack_Java.docx'  # Replace this with the actual input filename
input_filepath = os.path.join('storage/inputresume', input_filename)
resume_text = extract_text(input_filepath)

summary = extract_summary(resume_text)
objective = extract_objective(resume_text)
name = extract_name(resume_text)
email = extract_email(resume_text)
print("Name:", name)
print("Email", email)
print("Objective", objective)
print("Summary:", summary)
parsed_info = {
    "name": name,
    "e-mail": email,
    "objective": objective,
    "summary:": summary
}

# Define the output filename based on the input filename
output_filename = f"{input_filename.split('.')[0]}_parsed.json"
output_filepath = os.path.join('storage/output', output_filename)

# Save the extracted information to a JSON file
with open(output_filepath, 'w') as output_file:
    json.dump(parsed_info, output_file, indent=2)






import os
import docx2txt
import PyPDF2
import textract
import string
from patterns import patterns
from skills import skills
import re
import json

filename = 'rohit.txt'  # Replace this with the actual input filename
filepath = os.path.join('storage/inputresume', filename)
""" 
    This extract_text function will extract text from a file using its file extension, 
    split the extracted text into paragraphs using newline characters as delimiters,
    Remove unnecessary punctuations from the extracted text.
"""
def extract_text(filepath):
    extension = os.path.splitext(filepath)[1][1:]
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

def extract_text_nm(filepath):
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


#-----------------------------------------

'''This function is extracting name from the resume using the regulare expression 
defined in the patterns dictionary in the patterns.py module.''' 
def extract_name(text):
    name = ""
    # Extract name using the pattern
    name_matches = re.findall(patterns['regular']['name'][0], text, re.IGNORECASE)
    if name_matches:
        name = ' '.join(name_matches[0])
    return name

#-------------------------------------

'''This function is extracting email from the resume using the email_pattern logic
defined in this function itself!'''
def extract_email(text):
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    matches = re.findall(email_pattern, text)
    if matches:
        return matches[0]
    else:
        return ""

#----------------------------------------
'''
    Defining function to extract phone/mobile no.
'''
def extract_phone(text):
    phone = ""
    phone_matches = re.findall(patterns['regular']['phone'][0], text, re.IGNORECASE)
    if phone_matches:
        phone = ' '.join(phone_matches[0])
    return phone




resume_text = extract_text_nm(filepath)
name, email, phone = extract_name(resume_text), extract_email(resume_text), extract_phone(resume_text)

print("Name:", name, "\nEmail", email, "\nPhone", phone)




paragraphs = extract_text(filepath) 

content = extract_content(paragraphs, patterns)
for heading, content in content.items():
    #print()
    print(heading,"\n",content,"\n")

output_fname = f"{filename.split('.')[0]}_parsed.json"
output_filepath = os.path.join('storage/output', output_fname)

























