import re

# Function to extract skills from the resume


def extract_skills(resume_text):
    skills_database = {
        "skills": [
            "Python", "R", "SQL", "Data Visualization", "Statistical Analysis", "Pandas", "Matplotlib",
            "Java", "Kotlin", "Android Studio", "RESTful API", "Firebase", "SQLite", "XML",
            "Swift", "Objective-C", "Xcode", "iOS SDK", "Core Data", "RESTful API", "JSON",
            "HTML", "CSS", "JavaScript", "React", "Angular", "Vue.js", "Node.js", "MongoDB",
            "TensorFlow", "PyTorch", "Scikit-learn", "Deep Learning", "Computer Vision", "Natural Language Processing",
            "Network Protocols", "Firewalls", "Intrusion Detection", "Penetration Testing", "Security Auditing",
            "Adobe Creative Suite", "User Interface Design", "User Experience Design", "Responsive Design",
            "Marketing Strategy", "Brand Management", "Digital Marketing", "Social Media Advertising", "Market Research",
            "Financial Planning", "Budgeting", "Financial Analysis", "Investment Management", "Risk Assessment",
            "Talent Acquisition", "Performance Management", "Employee Training", "HR Policies", "Labor Law",
            "Customer Service", "Troubleshooting", "Ticketing Systems", "Communication Skills",
            "Data Entry", "MS Excel", "Typing Speed", "Attention to Detail",
            "Adobe Premiere Pro", "Final Cut Pro", "Video Editing", "Motion Graphics",
            "AutoCAD", "SketchUp", "3D Rendering", "Building Regulations", "Construction Management",
            "Business Strategy", "Market Research", "Financial Analysis", "Problem Solving",
            "Counseling", "Community Outreach", "Case Management", "Advocacy",
            "CAD/CAM", "Product Design", "Finite Element Analysis (FEA)", "Prototyping",
            "Network Security", "Vulnerability Assessment", "Incident Response", "Ethical Hacking",
            "Manual Testing", "Automated Testing", "Bug Tracking", "Test Planning",
            "Network Configuration", "Troubleshooting", "Network Monitoring", "Cisco", "Juniper",
            "Diagnosis", "Treatment", "Patient Care", "Medical Research",
            "Chemical Analysis", "Laboratory Techniques", "Quality Control", "Research",
            "Mechanical Repairs", "Machine Maintenance", "Technical Drawings", "Problem Solving",
            "Inventory Management", "Shipping", "Supply Chain Coordination", "Problem Solving",
            "Sales Pitching", "Negotiation", "Client Relationship Management", "Lead Generation",
            "Media Relations", "Brand Promotion", "Crisis Management", "Event Planning",
            "Calendar Management", "Travel Arrangements", "Communication Skills", "Administrative Support",
            "Phone Handling", "Visitor Management", "Administrative Support", "Customer Service",
            "Medication Dispensing", "Patient Counseling", "Drug Interactions", "Pharmacy Management",
            "Fashion Sketching", "Garment Construction", "Pattern Making", "Textile Selection",
            "Data Warehousing", "ETL", "Big Data", "Data Integration", "Apache Spark", "Hadoop",
            "Thermodynamics", "Mechanical Design", "Manufacturing Processes", "SolidWorks",
            "Classroom Management", "Curriculum Development", "Lesson Planning", "Educational Technology",
            "Structural Design", "Geotechnical Engineering", "Construction Management", "AutoCAD", "STAAD.Pro",
            "Legal Research", "Contract Drafting", "Litigation", "Corporate Law", "Intellectual Property",
            "Culinary Arts", "Food Preparation", "Menu Planning", "Food Safety", "Kitchen Management",
            "Event Coordination", "Vendor Management", "Budgeting", "Event Marketing", "Logistics",
            "Electrical Wiring", "Circuit Troubleshooting", "Electrical Repairs", "Safety Procedures",
            "Project Planning", "Resource Management", "Risk Management", "Stakeholder Communication",
            "Psychological Assessment", "Therapy", "Mental Health Research"
        ]

    }

    extracted_skills = []
    skill_keywords = skills_database["skills"]
    extracted_skills.extend([skill.lower() for skill in skill_keywords if re.search(
        rf'\b{re.escape(skill)}\b', resume_text, re.IGNORECASE)])

    return extracted_skills
