import axios from 'axios';

export default async function handler(req, res) {
  const { from, to } = req.query
  try {
    const url = 'https://api.coingecko.com/api/v3/simple/price'
    const response = await axios.get(`${url}?ids=${from}&vs_currencies=${to}`);
    const maticPrice = response.data[from][to];
    res.status(200).json({ price: maticPrice });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch MATIC price." });
  }
}