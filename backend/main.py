#pip install fastapi uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

# Create a FastAPI app
# Root endpoint returns the app description
app = FastAPI()

#Stores the user's email, username, and password
class User(BaseModel):
    email: str
    username: str
    password: str


#In memory storage
User_db: List[User] = []

@app.get("/")
async def read_root():
    return("Welcome")

#CRUD operations
#POST
@app.post("/user/", response_model=User)
async def create_user ( new_user: User ):
    User_db.append(new_user)
    return new_user

#GET
@app.get("/user/{email}", response_model= List[User])
async def get_user (email: str):
    for user in User_db:
        if user.email == email:
            return user
    raise HTTPException(status_code=404, detail="User not found")
