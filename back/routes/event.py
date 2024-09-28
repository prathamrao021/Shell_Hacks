from fastapi import APIRouter, HTTPException, Depends, status
from models.event import Event
from utils.dbUtils import get_client
from pymongo import MongoClient
from utils.auth import verify_and_return_token
from typing import Annotated
from utils.event import insert_event, exclusive_events, accept_event
from models.auth import PyObjectId

router = APIRouter()


@router.post("/event")
async def create_event(
    token: Annotated[dict, Depends(verify_and_return_token)],
    db: Annotated[MongoClient, Depends(get_client)],
    event: Event
)-> Event:
    event.posted_by = token['username']
    return await insert_event(event, db)

@router.get("/events")
async def get_events(
    token: Annotated[dict, Depends(verify_and_return_token)],
    db: Annotated[MongoClient, Depends(get_client)],
)-> list[Event]:
    return await exclusive_events(db, token["user_id"])

@router.patch("/event/{event_id}")
async def accept_event(
    token: Annotated[dict, Depends(verify_and_return_token)],
    db: Annotated[MongoClient, Depends(get_client)],
    event_id: str)-> Event:
    return await accept_event(event_id, db, token["user_id"])