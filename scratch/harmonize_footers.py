import re

html_files = [
    "about.html",
    "services.html",
    "courses.html",
    "attachments.html",
    "gallery.html",
    "testimonials.html",
    "portfolio.html",
    "team.html",
    "blog.html",
    "contact.html",
    "partner.html",
    "enroll.html",
    "feedback.html"
]

# Read footer from index.html
with open("index.html", "r", encoding="utf-8") as f:
    index_content = f.read()

footer_match = re.search(r'<footer>.*?</footer>', index_content, re.DOTALL)
if not footer_match:
    print("Error: Could not find footer in index.html")
    exit(1)

index_footer = footer_match.group(0)

def replace_footer(filename):
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace footer
    if re.search(r'<footer>.*?</footer>', content, re.DOTALL):
        new_content = re.sub(r'<footer>.*?</footer>', index_footer, content, flags=re.DOTALL)
        with open(filename, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Harmonized footer for {filename}")
    else:
        print(f"Warning: No footer found in {filename}")

for fn in html_files:
    replace_footer(fn)

print("Footer harmonization complete!")
