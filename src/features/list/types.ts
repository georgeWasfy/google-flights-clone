type FlightPlace = {
  flightPlaceId: string;
  displayCode: string;
  parent: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
  };
  name: string;
  type: string;
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
    operationType: string;
  };
  segments: Segment[];
};

export type Itinerary = {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  fareAttributes: Record<string, unknown>;
  tags?: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
};

type Context = {
  status: string;
  sessionId: string;
  totalResults: number;
};

type FarePolicy = {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
};

export type FlightData = {
  context: Context;
  itineraries: Itinerary[];
};
  
  export type FlightResponse = {
    status: boolean;
    timestamp: number;
    sessionId: string;
    data: FlightData;
    messages: string[];
  };
  