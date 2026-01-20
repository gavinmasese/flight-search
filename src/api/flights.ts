import axios from "axios";

let accessToken: string | null = null;

async function getToken() {
  if (accessToken) return accessToken;

  const res = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_API_KEY!,
      client_secret: process.env.AMADEUS_API_SECRET!,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  accessToken = res.data.access_token;
  return accessToken;
}

export default async function handler(req: any, res: any) {
  try {
    const token = await getToken();

    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: req.query,
      }
    );

    console.log("AMADEUS RESPONSE:", response.data);


res.status(200).json({
  data: response.data.data,
});
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
