from components import models, schema
from fastapi import Depends, HTTPException, Depends, status,HTTPException, APIRouter
from components.database import get_db
from sqlalchemy.orm import Session
from components.dependency import get_current_user
from typing import List
from sqlalchemy import or_

router = APIRouter(
    prefix="/conversation",
    tags=["conversation"],
)

@router.post("/" ,status_code=201, response_model=schema.ConversationResponse)
async def create_conversation(conversation: schema.ConversationCreate, db: Session = Depends(get_db),
                       current_user: models.User = Depends(get_current_user)):
    listing = db.query(models.Listing).filter(models.Listing.id == conversation.listing_id).first()
    if listing is None:
        raise HTTPException(status_code=404, detail="Listing not found")
    if current_user.id == conversation.seller_id:
        raise HTTPException(status_code=403, detail="You are not allowed to perform this action")
    existing = db.query(models.Conversation).filter(models.Conversation.listing_id == conversation.listing_id,
                                                    models.Conversation.buyer_id == current_user.id).first()
    if existing:
        raise HTTPException(status_code=409, detail="Conversation already exists for this Listing")
    new_conversation = models.Conversation(
        buyer_id=current_user.id,
        **conversation.model_dump()
    )
    db.add(new_conversation)
    db.commit()
    db.refresh(new_conversation)
    return new_conversation

@router.get("/" ,status_code=200, response_model=List[schema.ConversationResponse])
async def get_conversation(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    conversations = db.query(models.Conversation).filter(or_(models.Conversation.seller_id == current_user.id,
                                                         models.Conversation.buyer_id == current_user.id)).all()
    if not conversations:
        raise HTTPException(status_code=404, detail="No Conversation to Display")
    return conversations

@router.get("/{id}", status_code=200, response_model=schema.ConversationResponse)
async def get_single_conversation(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    conversation = db.query(models.Conversation).filter(models.Conversation.id == id).first()
    if conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    if current_user.id != conversation.seller_id and current_user.id != conversation.buyer_id:
        raise HTTPException(status_code=403, detail="You are not allowed to perform this action")
    return conversation


@router.post("/{id}/messages", status_code=201, response_model=schema.MessageResponse)
async def send_message(id:int, message:schema.MessageCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    checking = db.query(models.Conversation).filter(models.Conversation.id == id).first()
    if checking is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    if current_user.id != checking.seller_id and current_user.id != checking.buyer_id:
        raise HTTPException(status_code=403, detail="You are not allowed to perform this action")
    new_message = models.Message(
        conversation_id=id,
        sender_id=current_user.id,
        **message.model_dump()
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

@router.get("/{id}/messages", response_model=List[schema.MessageResponse])
async def get_messages(
        id: int, current_user: models.User = Depends(get_current_user),db: Session = Depends(get_db)):
    conversation = db.query(models.Conversation).filter(models.Conversation.id == id).first()
    if conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    if current_user.id != conversation.seller_id and current_user.id != conversation.buyer_id:
        raise HTTPException(status_code=403, detail="You are not allowed to perform this action")
    messages = db.query(models.Message).filter(models.Message.conversation_id == id).all()
    return messages
