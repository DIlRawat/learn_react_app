Alphabet & Number Learning App
A simple responsive web app to help users learn how to write alphabets and numbers. Built with React for the frontend and FastAPI for the backend.
Users can draw letters and numbers on a touchscreen-friendly sketchpad.
Responsive layout using Flexbox ensures it works on devices of different sizes.
Sound feedback is provided using the SpeechSynthesis Web API.
Users can navigate back and forth between letters and numbers.
Previous version: HTML, CSS, JS version
Sketchpad reference: A simple touchscreen sketchpad

Table of Contents
Demo
Features
Technologies
Setup & Installation

Demo
Add a GIF or screenshot of your app here.

Features
Touchscreen-friendly sketchpad to write letters and numbers.
Audio feedback using browser speech synthesis.
Responsive layout using Flexbox.
Navigate forward and backward through letters and numbers.

Technologies
Frontend: React, JavaScript, CSS (Flexbox)
Backend: FastAPI, Python 3.10 Above
Others: Uvicorn (ASGI server), SpeechSynthesis Web API

Setup & Installation

Backend
Go to the backend folder:
cd backend

Create a virtual environment (if not already created):
python3.13 -m venv venv --upgrade-deps

Activate the virtual environment:
source venv/bin/activate

Install dependencies:
pip install -r requirements.txt

Run the backend:
uvicorn main:app --reload

or, if fastapi-cli is installed:
fastapi dev main.py

Frontend
Go to the frontend folder:
cd frontend

Install dependencies:
npm install

Start the development server:
npm run dev

The app should now be running at http://localhost:5173 (or the port specified by Vite).


![learnapp123](https://github.com/user-attachments/assets/b828fed5-dad6-4200-bb9d-2be1d089211f)
