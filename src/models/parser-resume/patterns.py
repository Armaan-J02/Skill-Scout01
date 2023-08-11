import re

patterns = {
    "titles": {
        "objective": ['objective', 'objectives', 'career objective', 'professional objective'],
        "summary": ['summary', 'Summary', 'SUMMARY:'],
        "technology": ['technology', 'technologies'],
        "experience": ['experience'],
        "education": ['education'],
        "skills": ['skills', 'Skills & Expertise', 'technology', 'technologies', 'technical skills', 'technical_skills','TECHNICAL SKILLS:', 'summary of skills', 'SKILLS OF SKILLS'],
        "languages": ['languages'],
        "courses": ['courses'],
        "projects": ['projects'],
        "links": ['links'],
        "contacts": ['contacts'],
        "positions": ['positions', 'position'],
        "profiles": ['profiles', 'social connect', 'social-profiles', 'social profiles'],
        "awards": ['awards'],
        "honors": ['honors'],
        "additional": ['additional'],
        "certification": ['certification', 'certifications'],
        "interests": ['interests']
    },
    "profiles": [],
    "inline": {
        # "address": 'address',
        "skype": 'skype'
    },
    "regular": {
        "name": [
         r"([A-Z, a-z]+(?:\s[A-Z][a-z]+)*)"
        ],
        "email": [
            r"([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})"
        ],
        "phone": [
            r"((?:\+?\d{1,3}[\s-])?\(?\d{2,3}\)?[\s.-]?\d{3}[\s.-]\d{4,5})"
        ]
}
}