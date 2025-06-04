// server/src/index.ts
import express from 'express';
import axios from 'axios';
import cors from 'cors';

console.log('LOADED CORRECT FILE: server/src/index.ts');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/iss', async (_req, res) => {
  try {
    const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');

    const data = response.data;

    const enrichedData = {
      latitude: data.latitude,
      longitude: data.longitude,
      lastUpdated: new Date().toISOString(),
    };

    console.log('✅ Sending ISS position:', enrichedData);

    res.json(enrichedData);
  } catch (error) {
    console.error('Error fetching ISS data:', (error as Error).message);
    res.status(500).json({ error: 'Failed to fetch ISS data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
