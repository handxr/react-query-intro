import { PostsList } from "./features/posts/components/posts-list";
import { PeopleList } from "./features/sw-people/components/people-list";

import { AppProvider } from "./providers/app";

export default function App() {
  return (
    <AppProvider>
      <PostsList />
      {/* <PeopleList /> */}
    </AppProvider>
  );
}
