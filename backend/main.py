from fastapi import FastAPI
from components.database import engine
from fastapi.middleware.cors import CORSMiddleware
from Routers import user, login, listing, conversation, admin


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(user.router)
app.include_router(login.router)
app.include_router(listing.router)
app.include_router(conversation.router)
app.include_router(admin.router)

