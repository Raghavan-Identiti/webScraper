# pyright: reportMissingImports=false
from playwright.sync_api import sync_playwright
from app.services.text_extractor import extract_structured_text

def scrape_website(url: str):
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--no-sandbox",
                "--disable-dev-shm-usage",
            ],
        )
        page = browser.new_page()
        page.goto(url, timeout=60000)
        html = page.content()
        browser.close()
        return html

def save_text_file(content: str, filename="output.txt"):
    path = f"/tmp/{filename}"
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return path
