# pyright: reportMissingImports=false
from playwright.sync_api import sync_playwright
from app.services.text_extractor import extract_structured_text

def scrape_website(url):
    url = str(url)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            channel="chrome",
            args=[
                "--no-sandbox",
                "--disable-dev-shm-usage",
            ]
        )

        page = browser.new_page()
        page.goto(url, timeout=60000)

        html = page.content()
        structured_text = extract_structured_text(html)

        browser.close()

        return {
            "url": url,
            "text": structured_text
        }
def save_text_file(content: str, filename="output.txt"):
    path = f"/tmp/{filename}"
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return path
