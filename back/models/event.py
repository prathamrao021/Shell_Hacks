from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional
from bson import ObjectId
from .auth import PyObjectId  
from enum import Enum

class EventCategory(str, Enum):
    ENVIRONMENT = "Environment"
    COMMUNITY = "Community"
    ARTS = "Arts"
    EDUCATION = "Education"
    HEALTH = "Health"

class Status(str, Enum):
    NOT_STARTED = "not_started"
    ONGOING = "ongoing"
    FINISHED = "finished"

class Event(BaseModel):
    location: str
    coordinates : tuple[float, float] | None = None
    time: datetime
    category: EventCategory
    number_of_volunteers_required: int
    description: str
    posted_by: PyObjectId
    current_volunteers: List[str] = []
    start_time: datetime
    end_time: datetime
    status: Status

    class Config:
        json_encoders = {
            ObjectId: lambda v: str(v),
        }