from sqlalchemy import Column, Integer, String, Boolean, Text, TIMESTAMP, Numeric, ForeignKey, UniqueConstraint
from sqlalchemy.sql.expression import text
from datetime import datetime
from sqlalchemy import Enum as SAEnum
from enum import Enum
from sqlalchemy import func
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base

Base = declarative_base()
class Condition(str, Enum):
    new = "New"
    like_new = "Like New"
    good = "Good"
    fair = "Fair"
    poor = "Poor"

class Status(str, Enum):
   active = "Active"
   sold = "Sold"
   deleted = "Deleted"
   flagged = "Flagged"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    bio = Column(Text, nullable=True)
    phone = Column(String, nullable=True)
    is_admin = Column(Boolean, nullable=False, default=False)
    is_banned = Column(Boolean, nullable=False, default=False)
    is_verified = Column(Boolean, nullable=False, default=False)
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()")
    )
    updated_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now()
    )
    listings = relationship("Listing", back_populates="seller")
    bought_conversations = relationship(
        "Conversation",
        foreign_keys="Conversation.buyer_id",
        back_populates="buyer"
    )
    sold_conversations = relationship(
        "Conversation",
        foreign_keys="Conversation.seller_id",
        back_populates="seller"
    )


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    slug = Column(String, nullable=False, unique=True)  # add this
    listings = relationship("Listing", back_populates="category")

class Listing(Base):
    __tablename__ = "listings"
    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey('users.id', ondelete = 'CASCADE'), nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id', ondelete = 'CASCADE'), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Numeric(10,2), nullable=False)
    location = Column(String, nullable=False)
    condition = Column(SAEnum(Condition), nullable=False)
    status = Column(SAEnum(Status), nullable=False, default=Status.active)
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()")
    )
    updated_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now()
    )
    seller = relationship("User", back_populates="listings")
    category = relationship("Category", back_populates="listings")
    conversations = relationship("Conversation", back_populates="listing")

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    listing_id = Column(Integer, ForeignKey('listings.id', ondelete='CASCADE'), nullable=False)
    buyer_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    seller_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()")
    )
    __table_args__ = (
        UniqueConstraint('listing_id', 'buyer_id', name='unique_listing_buyer'),
    )

    listing = relationship("Listing", back_populates="conversations")
    buyer = relationship("User", foreign_keys=[buyer_id], back_populates="bought_conversations")
    seller = relationship("User", foreign_keys=[seller_id], back_populates="sold_conversations")
    messages = relationship("Message", back_populates="conversation")


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey('conversations.id', ondelete='CASCADE'), nullable=False)
    sender_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    content = Column(Text, nullable=False)
    is_seen = Column(Boolean, nullable=False, default=False)
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()")
    )

    conversation = relationship("Conversation", back_populates="messages")
    sender = relationship("User", foreign_keys=[sender_id])
