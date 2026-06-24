from fastapi import Depends, HTTPException, APIRouter, Response, status
from components import models, schema
from typing import List
from sqlalchemy.orm import Session
from components.database import get_db
from components.dependency import get_current_admin


router = APIRouter(
    prefix="/admin",
    tags=["admin"],
)

@router.get("/users", response_model=List[schema.UserResponse])
async def get_users(
    db: Session = Depends(get_db), current_user: models.User =Depends(get_current_admin)
):
    users = db.query(models.User).all()
    return users

@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id:int, db: Session = Depends(get_db), current_user:models.User = Depends(get_current_admin)):
    deleted_query = db.query(models.User).filter(models.User.id == user_id)
    deleted = deleted_query.first()
    if deleted is None:
        raise HTTPException(status_code=404, detail="User not found")
    deleted_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.get("/listings", response_model=List[schema.ListingResponse])
async def listing(db:Session = Depends(get_db), current_user:models.User = Depends(get_current_admin)):
    listings = db.query(models.Listing).all()
    return listings

@router.delete("/listings/{listing_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_listing(listing_id:int, db:Session = Depends(get_db), current_user:models.User = Depends(get_current_admin)):
    deleted_listing = db.query(models.Listing).filter(models.Listing.id == listing_id)
    listed = deleted_listing.first()
    if listed is None:
        raise HTTPException(status_code=404, detail="Listing not found")
    deleted_listing.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.post("/categories", status_code=status.HTTP_201_CREATED, response_model=schema.CategoryResponse)
async def create(category:schema.CategoryCreate, db:Session=Depends(get_db), current_user:models.User = Depends(get_current_admin)):
    existing = db.query(models.Category).filter(models.Category.name == category.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")
    new_category = models.Category(**category.model_dump())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

@router.put("/categories/{category_id}", status_code=200, response_model=schema.CategoryResponse)
async def update_category(category_id:int, db:Session=Depends(get_db), current_user:models.User = Depends(get_current_admin)):
    cat_query = db.query(models.Category).filter(models.Category.id == category_id)
    cat = cat_query.first()
    if cat is None:
        raise HTTPException(status_code=404, detail="Category not found")
    cat_query.update(category.model_dump(), synchronize_session=False)
    db.commit()
    return cat_query.first()

@router.delete("/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(category_id:int, db:Session= Depends(get_db), current_user:models.User = Depends(get_current_admin)):
    cat_query = db.query(models.Category).filter(models.Category.id == category_id)
    cat = cat_query.first()
    if cat is None:
        raise HTTPException(status_code=404, detail="Category not found")
    cat_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)