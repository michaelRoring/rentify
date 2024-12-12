import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
    const maticPrice = response.data['matic-network'].usd;
    res.status(200).json({ price: maticPrice });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch MATIC price." });
  }
}