import { useState } from "react";
import { searchFlights } from "../api/amadeus";
import FlightList from "../components/FlightList";

export default function Home() {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const data = await searchFlights({
      origin: "NBO",
      destination: "LHR",
      date: "2026-01-25", // update to a valid date
    });
    console.log("FLIGHTS RESPONSE:", data);
    setFlights(data);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Flight Search</h1>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Search Flights
      </button>

      {loading && <p>Loading...</p>}

      <FlightList flights={flights} />
    </div>
  );
}
