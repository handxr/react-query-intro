import { useInfiniteQuery } from "react-query";
import { PeopleResponse } from "../types";

export const initialUrl = "https://swapi.dev/api/people/";

export async function getPeopleApi(url: string): Promise<PeopleResponse> {
  return fetch(url).then((res) => res.json());
}

export function useGetPeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: "sw-people",
      queryFn: ({ pageParam = initialUrl }) => getPeopleApi(pageParam),
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
  };
}
