// /api/flights.ts
import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node"; // or your framework types

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // 1️⃣ Get Amadeus token
    const tokenRes = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const token = tokenRes.data.access_token;

    // 2️⃣ Call Amadeus flight search
    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          originLocationCode: req.query.originLocationCode,
          destinationLocationCode: req.query.destinationLocationCode,
          departureDate: req.query.departureDate,
          adults: req.query.adults || 1,
          max: req.query.max || 20,
        },
      }
    );

    // 3️⃣ Normalize response: always send { data: [...] }
    res.status(200).json({ data: response.data.data || [] });
  } catch (err: any) {
    console.error("API ERROR:", err.response?.data || err.message);
    res.status(500).json({ data: [] });
  }
}
