import { useState } from "react";
import { searchFlights } from "../api/amadeus";
import type { FlightOffer } from "../types/flight";
import SearchForm from "../components/SearchForm";
import FlightList from "../components/FlightList";

export default function Home() {
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(false);

 const handleSearch = async () => {
  try {
    setLoading(true);

    const data = await searchFlights({
      origin: "NBO",
      destination: "LHR",
      date: "2026-01-25",
    });

    console.log("FLIGHTS RESPONSE:", data);

    setFlights(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error(err);
    setFlights([]);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : <FlightList flights={flights} />}
    </>
  );
}
