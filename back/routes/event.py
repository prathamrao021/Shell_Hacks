from fastapi import APIRouter, HTTPException, Depends, status
from models.event import EventCreate, EventResponse
from utils.dbUtils import get_client
from pymongo import MongoClient

router = APIRouter()

@router.post("/events", response_model=EventResponse)
async def create_event(event: EventCreate, db: MongoClient = Depends(get_client), current_user: PyObjectId = Depends(get_current_user)):
    event_data = event.dict()
    event_data['posted_by'] = current_user  # assuming current_user is the ObjectId of the logged-in user
    event_id = db.events.insert_one(event_data).inserted_id
    return {**event_data, "id": event_id}

#All events
@router.get("/events", response_model=List[EventResponse])
async def list_events(db: MongoClient = Depends(get_client)):
    events = list(db.events.find())
    return [EventResponse(**event) for event in events]

#Specific events
@router.get("/events/{event_id}", response_model=EventResponse)
async def get_event(event_id: str, db: MongoClient = Depends(get_client)):
    event = db.events.find_one({"_id": ObjectId(event_id)})
    if event:
        return EventResponse(**event)
    raise HTTPException(status_code=404, detail="Event not found")

@router.put("/events/{event_id}", response_model=EventResponse)
async def update_event(event_id: str, event: EventUpdate, db: MongoClient = Depends(get_client)):
    updated_event = db.events.find_one_and_update(
        {"_id": ObjectId(event_id)},
        {"$set": event.dict(exclude_unset=True)},
        return_document=True
    )
    if updated_event:
        return EventResponse(**updated_event)
    raise HTTPException(status_code=404, detail="Event not found")

@router.delete("/events/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(event_id: str, db: MongoClient = Depends(get_client)):
    result = db.events.delete_one({"_id": ObjectId(event_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
