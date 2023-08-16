import os
import docx2txt
import PyPDF2
import textract
import string
from patterns import patterns
from skills import skills
import re
import json



filename = 'yash.txt'  # Replace this with the actual input filename
filepath = os.path.join('storage/inputresume', filename)


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


def extract_content(paragraphs, patterns_dict):
    '''
    Extract headings and content based on the provided patterns.
    '''
    extracted_data = {}
    current_heading = None
    
    for paragraph in paragraphs:
        for heading, keywords in patterns_dict["titles"].items():
            for keyword in keywords:
                if keyword.lower() in paragraph.lower():
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

def extract_name(text):
    name = ""
    # Extract name using the pattern
    name_matches = re.findall(patterns['regular']['name'][0], text, re.IGNORECASE)
    if name_matches:
        name = ' '.join(name_matches[0])
    return name


def extract_email(text):
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    matches = re.findall(email_pattern, text)
    if matches:
        return matches[0]
    else:
        return ""


def extract_phone(text):
    phone = ""
    phone_matches = re.findall(patterns['regular']['phone'][0], text, re.IGNORECASE)
    if phone_matches:
        phone = ' '.join(filter(str.isdigit,phone_matches[0]))

    return phone


def parse_resume(input_filepath, output_filepath):
    # Extract paragraphs from the resume
    paragraphs = extract_text(input_filepath)

    # Extract text from resume
    resume_text = extract_text_nm(input_filepath)

    # Extract name, email, and other information
    name = extract_name(resume_text)
    email = extract_email(resume_text)
    phone = extract_phone(resume_text)
    content = extract_content(paragraphs, patterns)


    # Create a dictionary to hold the extracted information
    output_data = {
        "name": name,
        "email": email,
        "phone": phone,
        "objective": content.get("objective", ""),
        "summary": content.get("summary", ""),
        "technology": content.get("technology", ""),
        "skills": content.get("skills", ""),
        "experience": content.get("experience", ""),
        "education": content.get("education", ""),
        "languages": content.get("language", ""),
        "courses": content.get("courses", ""),
        "projects": content.get("projects", ""),
        "links": content.get("links", ""),
        "contacts": content.get("contacts", ""),
        "positions": content.get("positions", ""),
        "profiles": content.get("profiles", ""),
        "awards": content.get("awards", ""),
        "honors": content.get("honors", ""),
        "additional": content.get("additional", ""),
        "certification": content.get("certifications", ""),
        "interests": content.get("interests", "")
    }

    output_filepath, output_filename = os.path.split(filepath)  # Using the input file's directory and filename
    output_filename_without_extension, _ = os.path.splitext(output_filename)  # Removing the extension
    parsed_filename = f"{output_filename_without_extension}_parsed.json"  # Creating the parsed filename

    output_filepath = os.path.join('storage/output', parsed_filename)  # Creating the full output file path

    with open(output_filepath, 'w') as json_file:
        json.dump(output_data, json_file, indent=4)


    return output_filepath

if __name__ == '__main__':
    '''input_resume_directory = 'storage/inputresume'
    uploaded_resumes = os.listdir(input_resume_directory)
    latest_resume_filename = max(uploaded_resumes, key=os.path.getctime)
    uploaded_resume_filepath = os.path.join(input_resume_directory, latest_resume_filename)

    output_directory = 'storage/output'  # Replace with the actual output directory path

    parsed_resume_filepath = parse_resume(uploaded_resume_filepath, output_directory)

    print(f"Resume parsed and saved to: {parsed_resume_filepath}")'''
