"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@physlane/ui";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import { columns } from "./weight-table-columns";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DataTableProps<TData, TValue> {
  data: TData[];
}

export function WeightTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    columns: columns as ColumnDef<TData, TValue>[],
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
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
            <AnimatePresence initial={false}>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    asChild
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    <motion.tr
                      layout
                      exit={{
                        opacity: 0,
                        transition: {
                          type: "spring",
                          duration: 0.15,
                          ease: "easeOut",
                        },
                      }}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: {
                          type: "tween",
                          duration: 0.15,
                          ease: "easeIn",
                        },
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="p-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </motion.tr>
                  </TableRow>
                ))
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
    </>
  );
}
