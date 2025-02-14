import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { api } from "../../../api";
import { SearchParams } from "../types";
import { AxiosError } from "axios";
import { FlightResponse } from "../../list/types";

const queryKey = (params?: SearchParams) => ["flights", params];

const queryFn = (params?: SearchParams) =>
  api
    .get<FlightResponse>("v2/flights/searchFlights", {
      params,
    })
    .then((res) => res.data);

export const useFlightsQuery = (
  params?: SearchParams,
  options?: UseQueryOptions<FlightResponse, AxiosError<{ message: string }>>
) =>
  useQuery({
    queryKey: queryKey(params),
    queryFn: () => queryFn(params),
    enabled: !!params,
    ...options,
  });

export function useInvalidateFlights() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: "flights" });
}
