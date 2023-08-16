import os

def generate_parsed_filename(original_filename):
    filename_without_extension, _ = os.path.splitext(original_filename)
    parsed_filename = f"{filename_without_extension}.json"
    return parsed_filename
