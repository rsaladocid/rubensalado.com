import { slugify } from "@/lib/utils/textConverter";
import { sortByDate } from "@/lib/utils/sortFunctions";

const taxonomyFilter = (posts: any[], name: string, key: string) =>
  sortByDate(posts.filter((post) =>
    post.data[name].map((name: string) => slugify(name)).includes(key),
  ));

export default taxonomyFilter;
