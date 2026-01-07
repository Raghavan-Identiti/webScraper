from fastapi import APIRouter
from app.schemas.scrape_schema import ScrapeRequest
from app.services.scraper_service import scrape_website

router = APIRouter()

@router.post("/scrape")
def scrape(request: ScrapeRequest):
    return scrape_website(str(request.url))
