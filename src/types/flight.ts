export interface FlightOffer {
  id: string;
  price: {
    total: string;
  };
  itineraries: {
    duration: string;
    segments: {
      carrierCode: string;
      numberOfStops: number;
    }[];
  }[];
}
