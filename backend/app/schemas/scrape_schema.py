# app/schemas/scrape_schema.py
from pydantic import BaseModel, HttpUrl

class ScrapeRequest(BaseModel):
    url: HttpUrl
