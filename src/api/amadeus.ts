import axios from "axios";

export const searchFlights = async (params: {
  origin: string;
  destination: string;
  date: string;
}) => {
  const res = await axios.get("/api/flights", {
    params: {
      originLocationCode: params.origin.toUpperCase(),
      destinationLocationCode: params.destination.toUpperCase(),
      departureDate: params.date,
      adults: 1,
      max: 20,
      currencyCode: "USD",
    },
  });

  return res.data.data;
};
