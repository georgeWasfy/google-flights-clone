type FlightPlace = {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: "City";
    };
    name: string;
    type: "Airport";
    country: string;
  };
  
  type Carrier = {
    id: number;
    alternateId: string;
    logoUrl?: string;
    name: string;
  };
  
  type Segment = {
    id: string;
    origin: FlightPlace;
    destination: FlightPlace;
    departure: string;
    arrival: string;
    durationInMinutes: number;
    flightNumber: string;
    marketingCarrier: Carrier;
    operatingCarrier: Carrier;
  };
  
  type Price = {
    raw: number;
    formatted: string;
    pricingOptionId: string;
  };
  
  type Leg = {
    id: string;
    origin: {
      id: string;
      entityId: string;
      name: string;
      displayCode: string;
      city: string;
      country: string;
      isHighlighted: boolean;
    };
    destination: {
      id: string;
      entityId: string;
      name: string;
      displayCode: string;
      city: string;
      country: string;
      isHighlighted: boolean;
    };
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: {
      marketing: Carrier[];
      operationType: "fully_operated";
    };
    segments: Segment[];
  };
  
  type Itinerary = {
    id: string;
    price: Price;
    legs: Leg[];
  };
  
  type Context = {
    status: "incomplete";
    sessionId: string;
    totalResults: number;
  };
  
  type FarePolicy = {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  
  type FlightData = {
    context: Context;
    itineraries: Itinerary[];
    isSelfTransfer: boolean;
    isProtectedSelfTransfer: boolean;
    farePolicy: FarePolicy;
    fareAttributes: Record<string, unknown>;
    tags: string[];
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
  };
  
  export type FlightResponse = {
    status: boolean;
    timestamp: number;
    sessionId: string;
    data: FlightData;
    messages: string[];
  };
  