import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_events():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Check if events already exist
    existing_events = await db.events.count_documents({})
    if existing_events > 0:
        print(f"Events already seeded ({existing_events} events found). Skipping...")
        client.close()
        return
    
    events = [
        {
            "id": "1",
            "title": "Sydney Festival 2025",
            "venue": "Domain Theatre",
            "address": "1 Art Gallery Road, The Domain, Sydney NSW 2000",
            "date": "2025-08-15",
            "time": "7:00 PM",
            "description": "Join us for an unforgettable evening of South Asian fusion music at Sydney Festival 2025. Experience Eastern Empire's electrifying performance featuring both traditional and contemporary hits.",
            "ticketUrl": "https://www.sydneyfestival.org.au/"
        },
        {
            "id": "2",
            "title": "Cultural Night at Opera House",
            "venue": "Sydney Opera House - Studio",
            "address": "Bennelong Point, Sydney NSW 2000",
            "date": "2025-09-20",
            "time": "8:00 PM",
            "description": "An intimate evening celebrating South Asian music and culture. Limited seating available.",
            "ticketUrl": "https://www.sydneyoperahouse.com/"
        },
        {
            "id": "3",
            "title": "Diwali Festival Performance",
            "venue": "Parramatta Park",
            "address": "Pitt Street &, Macquarie Street, Parramatta NSW 2150",
            "date": "2025-10-25",
            "time": "6:00 PM",
            "description": "Celebrate the festival of lights with Eastern Empire! Free entry, family-friendly event.",
            "ticketUrl": None
        }
    ]
    
    result = await db.events.insert_many(events)
    print(f"Successfully seeded {len(result.inserted_ids)} events")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_events())
