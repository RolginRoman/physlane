"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@physlane/ui";
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { Key } from "react";
import { columns } from "./weight-table-columns";

interface IdProvider {
  id: Key;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DataTableProps<TData extends IdProvider, TValue> {
  data: TData[];
}

export function WeightTable<TData extends IdProvider, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    columns: columns as ColumnDef<TData, TValue>[],
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full rounded-md border">
      <Table className="overflow-visible">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-transparent" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="w-1/2" key={header.id}>
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

        <TableBody className="relative">
          <AnimatePresence initial={false}>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row) => <TR key={row.original.id} row={row} />)
            ) : (
              <TableRow key={"empty"}>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}

const TR = <TData extends IdProvider>({ row }: { row: Row<TData> }) => {
  const isPresent = useIsPresent();
  return (
    <TableRow
      asChild
      className="w-full"
      data-state={row.getIsSelected() && "selected"}
      style={{
        position: isPresent ? "relative" : "absolute",
      }}
    >
      <motion.tr
        layout
        exit={{
          opacity: 0,
          height: 0,
          transition: {
            type: "spring",
            duration: 0.35,
            ease: "easeOut",
          },
        }}
        initial={{ opacity: 0, backgroundColor: "transparent" }}
        animate={{
          opacity: [0, 0.8, 1],
          height: "auto",
          backgroundColor: ["transparent", "rgb(255 0 0)", "transparent"],
          transition: {
            type: "tween",
            backgroundColor: {
              times: [0, 0.9, 1],
            },
            duration: 0.15,
            ease: "easeIn",
          },
        }}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className="w-1/2 p-3">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </motion.tr>
    </TableRow>
  );
};
