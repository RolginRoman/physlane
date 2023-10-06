"use client";

import { Weight } from "@physlane/domain";
import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { ActionsColumn } from "./actions-column";
import { MeasureDateColumn } from "./measure-date-column";
import { WeightColumn } from "./weight-column";

export const columns: ColumnDef<z.infer<typeof Weight>>[] = [
  {
    accessorKey: "weight",
    cell: ({ row }) => <WeightColumn data={row.original} />,
    header: "Weight",
  },
  {
    accessorKey: "measureDate",
    cell: ({ row }) => <MeasureDateColumn data={row.original} />,
    header: "Date",
  },
  {
    cell: ({ row }) => <ActionsColumn data={row.original}></ActionsColumn>,
    header: "",
    id: "actions",
  },
];
