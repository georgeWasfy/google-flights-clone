type Presentation = {
  title: string;
  suggestionTitle: string;
  subtitle: string;
};

type RelevantFlightParams = {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
};

type RelevantHotelParams = {
  entityId: string;
  entityType: string;
  localizedName: string;
};

type Navigation = {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
};

export type AirportSearchResponse = {
  skyId: string;
  entityId: string;
  presentation: Presentation;
  navigation: Navigation;
};

export type ApiResponse<T> = {
  data: T[];
  status: string;
  timestamp: string;
};

export type AirportOptions = {
  id: string,
  label: string
}

export type SearchParams = {
  originSkyId: string;
  destinationSkyId: string;

  originEntityId: string;
  destinationEntityId: string;

  date: string;
  returnDate?: string;

  cabinClass?: (typeof FLIGHT_CLASS)[number];

  adults?: number;
  childrens?: number;
  infants?: number;
  sortBy?: (typeof SORTBY)[number];
  limit?: number;
};

export const FLIGHT_CLASS = [
  "economy",
  "premium_economy",
  "business",
  "first",
] as const;

export const SORTBY = [
  "best",
  "price_high",
  "fastest",
  "outbound_take_off_time",
  "outbound_landing_time",
] as const;