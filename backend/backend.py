from fastapi import FastAPI

app = FastAPI() # Variable holding API

@app.get("/") # Create root endpoint
def home():
	return {"Data": "Test"}