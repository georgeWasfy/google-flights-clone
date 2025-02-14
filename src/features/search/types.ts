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
