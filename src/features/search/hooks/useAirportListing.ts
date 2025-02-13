import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { api } from "../../../api";
import { AirportSearchResponse, ApiResponse } from "../types";
import { AxiosError } from "axios";

interface AirportParams {
  query: string;
}

const queryKey = ({ query }: AirportParams) => ["airport", query];

const queryFn = (params: AirportParams) => 
  api
    .get<ApiResponse<AirportSearchResponse>>("v1/flights/searchAirport", {
      params,
    })
    .then((res) => res.data);

export const useAirportsQuery = (
  params: AirportParams,
  options?: UseQueryOptions<
    ApiResponse<AirportSearchResponse>,
    AxiosError<{ message: string }>
  >
) =>
  useQuery({
    queryKey: queryKey(params),
    queryFn: () => queryFn(params),
    ...options,
  });

export function useInvalidateAirports() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: "airport" });
}
