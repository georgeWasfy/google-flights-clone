import { AirportSearchResponse } from "../features/search/types";

export const preprocess_airports = (
  data: AirportSearchResponse[] | undefined
) => {
  if (data) {
    return data
      .filter((el) => el.navigation.entityType === "AIRPORT")
      .map((el) => {
        return { id: el.entityId, label: el.presentation.suggestionTitle };
      });
  }
};
