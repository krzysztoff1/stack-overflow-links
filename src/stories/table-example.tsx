import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tag } from "@/types";

const data: Tag[] = [
  {
    has_synonyms: false,
    is_moderator_only: false,
    is_required: false,
    count: Math.floor(Math.random() * 1000),
    name: "react",
  },
  {
    has_synonyms: false,
    is_moderator_only: false,
    is_required: false,
    count: Math.floor(Math.random() * 1000),
    name: "javascript",
  },
  {
    has_synonyms: false,
    is_moderator_only: false,
    is_required: false,
    count: Math.floor(Math.random() * 1000),
    name: "typescript",
  },
];

export function TableDemo() {
  const columnHelper = createColumnHelper<Tag>();
  const columns = React.useMemo(
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
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
