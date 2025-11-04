from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    firstName: str
    lastName: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    subject: str
    message: str

class Event(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    title: str
    venue: str
    address: str
    date: str
    time: str
    description: Optional[str] = None
    ticketUrl: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True

class EventCreate(BaseModel):
    title: str
    venue: str
    address: str
    date: str
    time: str
    description: Optional[str] = None
    ticketUrl: Optional[str] = None

class BookingInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    eventType: str
    eventDate: str
    venue: str
    guestCount: Optional[str] = None
    configuration: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending")

class BookingInquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    eventType: str
    eventDate: str
    venue: str
    guestCount: Optional[str] = None
    configuration: Optional[str] = None
    message: Optional[str] = None


# Routes
@api_router.get("/")
async def root():
    return {"message": "Eastern Empire API"}

# Newsletter endpoints
@api_router.post("/newsletter", response_model=NewsletterSubscription)
async def subscribe_newsletter(input: NewsletterSubscriptionCreate):
    # Check if email already exists
    existing = await db.newsletter_subscriptions.find_one({"email": input.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    subscription = NewsletterSubscription(**input.dict())
    await db.newsletter_subscriptions.insert_one(subscription.dict())
    return subscription

@api_router.get("/newsletter", response_model=List[NewsletterSubscription])
async def get_newsletter_subscriptions():
    subscriptions = await db.newsletter_subscriptions.find().to_list(1000)
    return [NewsletterSubscription(**sub) for sub in subscriptions]

# Contact form endpoints
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(input: ContactMessageCreate):
    message = ContactMessage(**input.dict())
    await db.contact_messages.insert_one(message.dict())
    return message

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find().sort("created_at", -1).to_list(100)
    return [ContactMessage(**msg) for msg in messages]

# Events endpoints
@api_router.post("/events", response_model=Event)
async def create_event(input: EventCreate):
    event_dict = input.dict()
    event = Event(**event_dict)
    event_data = event.dict(by_alias=True)
    await db.events.insert_one(event_data)
    return event

@api_router.get("/events", response_model=List[Event])
async def get_events():
    events = await db.events.find().sort("date", 1).to_list(1000)
    result = []
    for event in events:
        # Convert ObjectId to string if present
        if "_id" in event:
            event["_id"] = str(event["_id"])
        if "id" not in event and "_id" in event:
            event["id"] = event["_id"]
        result.append(Event(**event))
    return result

@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    result = await db.events.delete_one({"id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}

# Booking inquiry endpoints
@api_router.post("/bookings", response_model=BookingInquiry)
async def submit_booking(input: BookingInquiryCreate):
    booking = BookingInquiry(**input.dict())
    await db.booking_inquiries.insert_one(booking.dict())
    return booking

@api_router.get("/bookings", response_model=List[BookingInquiry])
async def get_bookings():
    bookings = await db.booking_inquiries.find().sort("created_at", -1).to_list(100)
    return [BookingInquiry(**booking) for booking in bookings]

@api_router.patch("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str):
    result = await db.booking_inquiries.update_one(
        {"id": booking_id},
        {"$set": {"status": status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking status updated successfully"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()