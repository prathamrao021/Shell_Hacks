from pymongo import MongoClient
from models.event import Event
from models.auth import UserResponse, PyObjectId
from bson import ObjectId

async def insert_event(event: Event, db: MongoClient) -> Event:
    db.events.insert_one(event.model_dump())
    return event

def check_in_recurring(event: Event, user: UserResponse) -> bool:
    recurring_events = user.recurring_events
    start = event.start_time.time()
    end = event.end_time.time()
    day = start.weekday()
    for times in recurring_events[day]:
        if times[0] <= start and times[1] >= end:
            return True
    return False

def check_intersection(a_start, a_end, b_start, b_end):
    if a_start <= b_start and a_end >= b_start:
        return True
    if a_start >= b_start and a_start <= b_end:
        return True
    return False

def check_not_in_not_avail(event: Event, user: UserResponse) -> Event:
    not_available = user.not_available
    date = event.start.date()
    start_time = event.start_time.time()
    end_time = event.end_time.time()
    for times in not_available[date]:
        if check_intersection(start_time, end_time, times[0], times[1]):
            return False
    return True

    
async def exclusive_events(db: MongoClient, user_id: str) -> list[Event]:
    user = db.users.find_one({"_id": ObjectId(user_id)})
    events = db.events.find()
    return_events = []
    for event in events:
        if check_in_recurring(event, user) and check_not_in_not_avail(event, user):
            return_events.append(event)
    return return_events

async def accept_event(event_id: str, db: MongoClient, user_id: str) -> Event:
    user = db.users.find_one({"_id": ObjectId(user_id)})
    event = db.events.find_one({"_id": ObjectId(event_id)})
    event.current_volunteers.append(user_id)
    db.events.update_one({"_id": ObjectId(event_id)}, {"$set": event})
    if event.start_date.date() not in user.not_available:
        user.not_available[event.start_time.date()] = [[event.start_time.time(), event.end_time.time()]]
    else:
        user.not_available[event.start_time.date()].append([evnet.start_time.time(), event.end_time.time()])
    db.users.update_one({"_id": ObjectId(user_id)}, {"$set": user})