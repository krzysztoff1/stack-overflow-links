import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { Tag } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { fetchTags } from "@/lib/fetch-tags";
import { Loader } from "lucide-react";

const sortingOptions = [
  { value: "popular", label: "Popular" },
  { value: "name", label: "Name" },
  { value: "activity", label: "Activity" },
] as const;

export const TagsTable = () => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: sortingOptions[0].value, desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });

  const defferedPagination = useDeferredValue(pagination);
  const defferedSorting = useDeferredValue(sorting);

  const query = useQuery({
    queryKey: [
      "tags",
      { sorting: defferedSorting, pagination: defferedPagination },
    ],
    queryFn: fetchTags,
  });

  const columnHelper = createColumnHelper<Tag>();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: (info) => info.getValue(),
        header: "Name",
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.count, {
        id: "count",
        cell: (info) => info.getValue().toLocaleString(),
        header: "Count",
        footer: (info) => info.column.id,
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: query.data?.items ?? [],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    state: { pagination, sorting },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    manualPagination: true,
    manualSorting: true,
    columns,
  });

  return (
    <div className="rounded-md border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 space-y-2">
        <div className="flex flex-col space-y-1 w-min">
          <span className="text-sm text-gray-800">Rows: </span>
          <Input
            className="w-16"
            placeholder="10"
            min={1}
            max={100}
            value={pagination.pageSize}
            type="number"
            onChange={(e) => {
              const pageSize = Number(e.target.value);
              setPagination((prev) => ({ ...prev, pageSize }));
            }}
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-800">Sort by:</span>
            <Select
              onValueChange={(value) => {
                setSorting((prev) => [
                  {
                    id: value,
                    desc: prev[0].id === value ? !prev[0].desc : true,
                  },
                ]);
              }}
              value={sorting[0].id}
            >
              <SelectTrigger className="w-min">
                <SelectValue placeholder="Popularity" />
              </SelectTrigger>
              <SelectContent>
                {sortingOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-800">Order:</span>
            <Select
              onValueChange={(value) => {
                setSorting((prev) => [
                  { id: prev[0].id, desc: value === "desc" },
                ]);
              }}
              value={sorting[0].desc ? "desc" : "asc"}
            >
              <SelectTrigger className="w-min">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {query.status === "success" && table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={"w-[50%]"}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : null}

          {query.status === "success" && !table.getRowModel().rows?.length ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <span className="text-sm">No results.</span>
              </TableCell>
            </TableRow>
          ) : null}

          {query.status === "pending" ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24">
                <div className="flex items-center justify-center space-x-2">
                  <Loader size={16} className="animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : null}

          {query.status === "error" ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <span className="text-red-500">
                  An error occurred while fetching data. Please try again later.
                </span>
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between p-2">
        <span className="block text-sm text-gray-800">
          Showing page {pagination.pageIndex}
        </span>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex - 1,
              }))
            }
            disabled={pagination.pageIndex === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex + 1,
              }))
            }
            disabled={query.data?.has_more === false}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
