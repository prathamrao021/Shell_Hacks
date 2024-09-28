from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import List, Optional
from bson import ObjectId
from .auth import PyObjectId  # Assuming this is defined in your auth models

class EventCategory(str, Enum):
    ENVIRONMENT = "Environment"
    COMMUNITY = "Community"
    ARTS = "Arts"
    EDUCATION = "Education"
    HEALTH = "Health"

class Event(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    location: str
    time: datetime  # Assuming this refers to a specific datetime, not just hour/minute
    category: EventCategory
    number_of_volunteers_required: int
    description: str
    posted_by: PyObjectId  # Reference to the User model's ID
    current_volunteers: List[PyObjectId] = []  # List of User IDs who have agreed to volunteer
    start_time: datetime
    end_time: datetime

    class Config:
        json_encoders = {
            ObjectId: lambda v: str(v),
        }

class EventCreate(BaseModel):
    location: str
    time: datetime
    category: EventCategory
    number_of_volunteers_required: int
    description: str
    start_time: datetime
    end_time: datetime

class EventUpdate(BaseModel):
    location: Optional[str] = None
    time: Optional[datetime] = None
    category: Optional[EventCategory] = None
    number_of_volunteers_required: Optional[int] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class EventResponse(BaseModel):
    id: PyObjectId
    location: str
    time: datetime
    category: EventCategory.name
    number_of_volunteers_required: int
    description: str
    posted_by: str  # Assume you will convert user ID to user name in the response
    current_volunteers: List[str]  # Assume you will convert user IDs to names
    start_time: datetime
    end_time: datetime
    participants_count: int = Field(default_factory=lambda: len(self.current_volunteers))
