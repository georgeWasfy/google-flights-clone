import { AirportSearchResponse } from "../features/search/types";

export const preprocess_airports = (
  data: AirportSearchResponse[] | undefined
) => {
  if (data) {
    return data
      .filter((el) => el.navigation.entityType === "AIRPORT")
      .map((el) => {
        return { id: el.entityId, label: el.presentation.suggestionTitle, skyId: el.skyId };
      });
  }
};

export const mockEmissions = () => {
  const randomNum = 5 + Math.random() * 5;
  return parseFloat(randomNum.toFixed(2));
};
