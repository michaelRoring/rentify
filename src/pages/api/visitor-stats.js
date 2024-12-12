export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const currentTime = new Date();
      let visitors;

      if (currentTime.getHours() >= 0 && currentTime.getHours() < 4) {
        visitors = Math.floor(Math.random() * (50 - 20 + 1)) + 20; // 20-50 pengunjung
      } else if (currentTime.getHours() >= 4 && currentTime.getHours() < 7) {
        visitors = Math.floor(Math.random() * (70 - 50 + 1)) + 50; // 50-70 pengunjung
      } else if (currentTime.getHours() >= 7 && currentTime.getHours() < 12) {
        visitors = Math.floor(Math.random() * (200 - 150 + 1)) + 150; // 150-200 pengunjung
      } else {
        visitors = Math.floor(Math.random() * (300 - 200 + 1)) + 200; // 200-250 pengunjung
      }

      res.status(200).json({ totalVisitors: visitors });
    } catch (error) {
      console.error('Error calculating visitor data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
