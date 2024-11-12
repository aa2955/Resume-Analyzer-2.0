import requests
import bcrypt
import base64

url= "http://localhost:8000/user"

#Dummy data
data= {
    "email": "123@test.com",
    "username": "123",
    "password": "123"
}

#Encrypting the password
hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt())
hashed_password = base64.b64encode(hashed_password).decode('utf-8')
data["password"]= hashed_password

response= requests.post(url, json=data)

if response.status_code == 200:
    print("User registered")
else:
    print("Failed with status code:", response.status_code)
    print("Error:", response.text)