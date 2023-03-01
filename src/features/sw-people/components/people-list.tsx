import InfiniteScroll from "react-infinite-scroller";
import { useGetPeople } from "../api/get-people";

export function PeopleList() {
  const { data, error, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetPeople();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error!
        {error?.toString()}
      </div>
    );
  }

  return (
    <div>
      <h1>Star Wars People</h1>

      <InfiniteScroll
        pageStart={0}
        loadMore={fetchNextPage as any}
        hasMore={hasNextPage}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {data?.pages.map((page) => (
          <ul key={page.next}>
            {page.results.map((person) => (
              <li
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
                key={person.name}
              >
                {person.name}
              </li>
            ))}
          </ul>
        ))}
      </InfiniteScroll>
    </div>
  );
}
