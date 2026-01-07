from bs4 import BeautifulSoup

def extract_structured_text(html: str) -> str:
    soup = BeautifulSoup(html, "lxml")

    # Remove unwanted elements
    for tag in soup(["script", "style", "nav", "footer", "header"]):
        tag.decompose()

    lines = []

    for element in soup.find_all(
        ["h1", "h2", "h3", "h4", "h5", "h6", "p", "li"]
    ):
        text = element.get_text(strip=True)

        if not text:
            continue

        # Headings
        if element.name.startswith("h"):
            lines.append("\n" + text.upper())
        # List items
        elif element.name == "li":
            lines.append(f"- {text}")
        # Paragraphs
        else:
            lines.append(text)

    return "\n".join(lines)
