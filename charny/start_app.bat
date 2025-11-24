@echo off
echo Starting Charny App...

echo Starting Backend...
start "Charny Backend" cmd /k "cd server && pip install -r requirements.txt && python app.py"

echo Starting Frontend...
start "Charny Frontend" cmd /k "cd client && npm run dev"

echo App started! 
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
