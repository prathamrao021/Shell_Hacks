from pydantic import BaseModel, Field, EmailStr, validator
from datetime import datetime
from enum import Enum
from typing import Annotated, Any
from bson import ObjectId
from datetime import time, date

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v: Any, values: dict, **kwargs):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(ObjectId(v))

    @classmethod
    def __get_pydantic_json_schema__(cls, *args, **kwargs):
        return {"bsonType": "objectId"}

class Day(str, Enum):
    MONDAY = "Monday"
    TUESDAY = "Tuesday"
    WEDNESDAY = "Wednesday"
    THURSDAY = "Thursday"
    FRIDAY = "Friday"
    SATURDAY = "Saturday"
    SUNDAY = "Sunday" 

class RecurringAvailability(BaseModel):
    avail : dict[Day, list[time, time]] = {}

class NotAvailable(BaseModel):
    avail : dict[date, list[time, time]] = {}


class Attachment(BaseModel):
    id : Annotated[PyObjectId, Field(default_factory=PyObjectId ,alias="_id")]
    url: str
    localPath: str
    
    class Config:
        json_encoders = {
            ObjectId: lambda v: str(v),
        }


class UserLogin(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    password: str

    @validator("username", pre=True)
    def validate_username(cls, value):
        return value.lower() if isinstance(value, str) else value


class UserBase(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr = Field(max_length=50)
    location: tuple[float, float] | None = None
    coordinates: tuple[float, float] | None = None
    recurring_availability: RecurringAvailability | None = None
    not_available: NotAvailable | None = None

    @validator("email", "username", pre=True)
    def validate_email(cls, value):
        return value.lower() if isinstance(value, str) else value


class UserRegister(UserBase):
    password: str


class UserResponse(UserBase):
    id : Annotated[PyObjectId, Field(default_factory=PyObjectId ,alias="_id")]
    avatar: Attachment
    createdAt: datetime
    updatedAt: datetime
    isEmailVerified: bool = False
    v: Annotated[int, Field(alias='__v')] = 0
    location: str | None = None
    coordinates : tuple[float, float] | None = None
    recurring_availability: RecurringAvailability | None = None
    not_available: NotAvailable | None = None

class UserInDB(UserResponse):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    refreshToken: str | None = None
    forgotPasswordToken: str | None = None
    forgotPasswordExpiry: datetime | None = None
    emailVerificationToken: str | None = None
    emailVerificationExpiry: datetime | None = None
    v: int = Field(0, alias="__v")

    class Config:
        json_encoders = {
            Enum: lambda v: v.value,
        }
        populate_by_name = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
    email: EmailStr | None = None