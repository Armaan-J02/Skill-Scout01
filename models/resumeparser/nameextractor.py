import re
import spacy
from spacy.matcher import Matcher

# Function to extract names using regular expression


def extract_names_regex(resume_text):
    name_pattern = r"\b[A-Z][a-z]+\s[A-Z][a-z]+\b"
    names = re.findall(name_pattern, resume_text)
    return names

# Function to extract names using spaCy NER model


def extract_names_spacy(resume_text, nlp):
    doc = nlp(resume_text)
    names = []
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            names.append(ent.text)
    return names

# Function to extract names using the `utils.extract_name` method


# Function to integrate all three name extractor methods and return probable names
def extract_names(resume_text):
    # Initialize spaCy NER model
    nlp = spacy.load('en_core_web_sm')

    # Load the required matcher for utils.extract_name method
    matcher = Matcher(nlp.vocab)
    # Add custom patterns to the matcher if needed

    # Extract names using all three methods
    names_regex = extract_names_regex(resume_text)
    names_spacy = extract_names_spacy(resume_text, nlp)

    # Select the common names from all three lists
    common_names = list(set(names_regex).intersection(names_spacy))

    return common_names
