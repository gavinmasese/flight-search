import type { FlightOffer } from "../types/flight";

export default function FlightList({ flights }: { flights?: FlightOffer[] }) {
  if (!flights || flights.length === 0) {
    return <p className="mt-4">No flights found.</p>;
  }

  return (
    <div className="mt-4 space-y-2">
      {flights.map((flight) => (
        <div key={flight.id} className="border p-3 rounded bg-white">
          <div>Price: ${flight.price.total}</div>
          <div>
            Stops: {flight.itineraries[0].segments.length - 1}
          </div>
        </div>
      ))}
    </div>
  );
}

