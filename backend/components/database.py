from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


DB_URL = "postgresql://postgres:Jenissi@localhost/uniplug"
engine = create_engine(DB_URL)
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()