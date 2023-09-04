from fastapi import FastAPI, Request
import uvicorn
import joblib

# Load your trained model
model = joblib.load('model_regressor.pkl')
scaler = joblib.load('scaler.pkl')
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Api working on!"}

@app.post("/get-score")
async def score(request: Request):
    data = await request.json()
    features = [[data["age"], data["income"]]]
    
    prediction = model.predict(scaler.transform(features))
    return {"score": prediction[0]}

if __name__ == "__main__":
    uvicorn.run(app)
