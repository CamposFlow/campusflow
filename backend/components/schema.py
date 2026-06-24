from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from components.models import Condition, Status




class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    id: Optional[int] = None

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    full_name: str
    bio: Optional[str]
    phone: Optional[str]
    is_admin: bool
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True




class CategoryCreate(BaseModel):
    name: str
    slug: str

class CategoryResponse(BaseModel):
    id: int
    name: str
    slug: str

    class Config:
        from_attributes = True



class ListingCreate(BaseModel):
    title: str
    description: str
    price: float
    condition: Condition
    location: str
    category_id: int

class ListingUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    condition: Optional[Condition] = None
    location: Optional[str] = None
    category_id: Optional[int] = None

class ListingResponse(BaseModel):
    id: int
    title: str
    description: str
    price: float
    condition: Condition
    location: str
    status: Status
    category_id: int
    seller_id: int
    created_at: datetime

    class Config:
        from_attributes = True




class ConversationCreate(BaseModel):
    listing_id: int
    seller_id: int

class ConversationResponse(BaseModel):
    id: int
    listing_id: int
    buyer_id: int
    seller_id: int
    created_at: datetime

    class Config:
        from_attributes = True




class MessageCreate(BaseModel):
    content: str

class MessageResponse(BaseModel):
    id: int
    conversation_id: int
    sender_id: int
    content: str
    is_seen: bool
    created_at: datetime

    class Config:
        from_attributes = True




class PaginatedResponse(BaseModel):
    total: int
    page: int
    limit: int
    items: List