from fastapi import FastAPI, Path, Query, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from pydantic import BaseModel
from nanoid import generate

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware (
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class User(BaseModel):
    name: str
    email: str

memory_db = {"users": {}}

@app.get("/api/users")
def get_users():
    return list(memory_db["users"].values())

@app.get("/api/users/{user_id}", response_model=User)
def get_user(user_id: str = Path(description="ID of user")):
    if user_id not in memory_db["users"]:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User ID not found.")

    return memory_db["users"][user_id]

@app.post("/api/users")
def create_user(user: User):
    user_id = generate(size=8)
    if user_id in memory_db["users"]:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Document ID already exists.")
    memory_db["users"][user_id] = user
    return user_id