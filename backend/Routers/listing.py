from fastapi import HTTPException, APIRouter, Depends, status, Response
from typing import List
from components.database import get_db
from components import schema, models
from sqlalchemy.orm import Session
from components.dependency import get_current_user

router = APIRouter(
    prefix="/listings",
    tags=["listings"],
)

@router.post("/", response_model=schema.ListingResponse)
async def create_listing(posting:schema.ListingCreate, db: Session = Depends(get_db),
                         current_user: models.User = Depends(get_current_user)):
    new_listing = models.Listing(seller_id=current_user.id,
                                 **posting.model_dump())
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    return new_listing

@router.get("/", response_model=List[schema.ListingResponse])
async def get_search(search:str = None, category_id:int = None, condition:str = None, min_price:float=None,
                     max_price:float = None, db: Session = Depends(get_db)):
    query = db.query(models.Listing)
    if search:
        query= query.filter(models.Listing.title.ilike(f"%{search}%"))
    if category_id:
        query= query.filter(models.Listing.category_id == category_id)
    if condition:
        query= query.filter(models.Listing.condition == condition)
    if min_price:
        query= query.filter(models.Listing.price>=min_price)
    if max_price:
        query= query.filter(models.Listing.price<=max_price)

    listing = query.all()
    return listing

@router.get("/category", response_model = List[schema.CategoryResponse])
async def get_category(db: Session = Depends(get_db)):
    category = db.query(models.Category).all()
    return category


@router.get("/{id}", response_model=schema.ListingResponse)
async def get_single(id: int, db: Session = Depends(get_db)):
    listings = db.query(models.Listing).filter(models.Listing.id == id).first()
    if listings is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found!")
    return listings

@router.put("/{id}", response_model=schema.ListingResponse)
async def update_listing(id: int, posting:schema.ListingUpdate, db: Session = Depends(get_db),
                         current_user: models.User = Depends(get_current_user)):
    list_query = db.query(models.Listing).filter(models.Listing.id == id)
    listing = list_query.first()
    if listing is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found!")
    if listing.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="You are not allowed to perform this action")
    list_query.update(posting.model_dump(exclude_unset = True),synchronize_session=False)
    db.commit()
    return list_query.first()

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_listing(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    delete_query = db.query(models.Listing).filter(models.Listing.id == id)
    listing = delete_query.first()
    if listing is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found!")
    if listing.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="You are not allowed to perform this action")
    delete_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)



