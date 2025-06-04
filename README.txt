ISS Tracker 
Author : Natalie Sukernik

A full-stack TypeScript application that displays the real-time location of the International Space Station (ISS) on a map. The app updates every 15 seconds and includes a manual refresh button.

Project Structure:
iss-tracker :
1. client ---> Frontend
2. server ---> Backend


Running the Application Locally :

1.Clone the Repository :
bash
git clone https://github.com/Natalie-Sukernik/iss-tracker.git
cd iss-tracker

2. Start the Server :
bash
cd server
npm install
npm run dev


The backend will start at: `http://localhost:5000`

3. Start the Client :

In a new terminal:
bash
cd client
npm install
npm run dev


The frontend will open at: `http://localhost:5173` (or whichever port Vite assigns)

Backend API Documentation :

Base URL
http://localhost:5000/api


GET `/iss`: returns the current position of the ISS.

Response Format : json
{
  "latitude": 50.351441571162,
  "longitude": 26.710869103736,
  "lastUpdated": "2025-06-02T13:58:40.277Z"
}

Fields :
1. `latitude` (number): The ISS's current latitude.
2. `longitude` (number): The ISS's current longitude.
3. `lastUpdated` (string): ISO timestamp of when the data was fetched.

Features :
1. Real-time map showing ISS position
2. Auto-update every 15 seconds
3. Manual refresh button
4. Last updated timestamp display

Tech Stack :
1. Frontend : React, TypeScript, Leaflet, Vite
2. Backend : Express, TypeScript, Axios
3. Map Provider : OpenStreetMap

