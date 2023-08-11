import os
import docx2txt
import PyPDF2
import textract
import string

def extract_text(filepath):
    """
    Extract text from a file using its file extension.
    Split the extracted text into paragraphs using newline characters as delimiters.
    Remove unnecessary punctuations from the extracted text.
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
            pages = [page.extract_text() for page in reader.pages]
            text = '\n'.join(pages)
    else:
        text = textract.process(filepath).decode('utf-8')

    # Split text into paragraphs using newline characters as delimiters
    paragraphs = text.split('\n\n')  # Split by double newline to represent paragraphs
    
    # Removing unnecessary punctuations from the extracted text.
    translator = str.maketrans('', '', string.punctuation)
    paragraphs = [paragraph.translate(translator) for paragraph in paragraphs]
    
    return paragraphs

# Example usage
filepath = "storage/inputresume/Adelina_Erimia_PMP1.docx"
paragraphs = extract_text(filepath)
for paragraph in paragraphs:
    print(paragraph)
