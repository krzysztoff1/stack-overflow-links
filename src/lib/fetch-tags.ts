import { STACK_OVERFLOW_API_URL } from "@/constants";
import { tagsResponeSchema } from "@/schemas/stack-overflow-tags.schema";
import type { PaginationState, SortingState } from "@tanstack/react-table";

interface fetchTagsProps {
  readonly queryKey: [
    string,
    { sorting: SortingState; pagination: PaginationState },
  ];
}

export const fetchTags = async ({ queryKey }: fetchTagsProps) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { sorting, pagination } = queryKey[1];
  const columnSort = sorting[0];
  const url = new URL(STACK_OVERFLOW_API_URL);

  url.pathname = "/2.3/tags";
  url.searchParams.set("pagesize", String(pagination.pageSize));
  url.searchParams.set("page", String(pagination.pageIndex));
  url.searchParams.set("order", columnSort.desc ? "desc" : "asc");
  url.searchParams.set("sort", columnSort.id);
  url.searchParams.set("site", "stackoverflow");

  const res = await fetch(url.toString());

  return tagsResponeSchema.parse(await res.json());
};
