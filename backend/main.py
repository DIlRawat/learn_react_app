from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import base64
from io import BytesIO
import easyocr
from PIL import Image
import numpy as np
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Serve static audio files
# app.mount("/audio", StaticFiles(directory="audio_files"), name="audio")

# Allow CORS for all domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allowing all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class base64ImgStr(BaseModel):
    img_str : str

@app.post('/easyocr')
def text_recognition(item: base64ImgStr):
    img_data = base64.b64decode(item.img_str)
    img = Image.open(BytesIO(img_data))

    # Convert PIL Image to NumPy array
    img_np = np.array(img)
    
    # Text Recognition with EasyOCR
    reader = easyocr.Reader(['en'])
    result = reader.readtext(img_np, detail = 0)
    return {"result": result}
 


