"use client";

import { Weight } from "@physlane/domain";
import { Badge, Button, Icons } from "@physlane/ui";
import { Text } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { useDeleteEntry } from "../loader";

export const columns: ColumnDef<z.infer<typeof Weight>>[] = [
  {
    accessorKey: "weight",
    cell: ({ row }) => {
      const { measure, weight } = row.original;
      return (
        <div className="flex justify-between">
          <Text>{parseFloat(weight.toFixed(1))}</Text>
          <Badge>{measure}</Badge>
        </div>
      );
    },
    header: "Weight",
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const date = new Intl.DateTimeFormat("en-US").format(createdAt);
      return (
        <div className="flex justify-between">
          <Text>{date}</Text>
        </div>
      );
    },
    header: "Date",
  },
  {
    cell: ({ row }) => {
      return <DeleteButton entryId={row.original.id}></DeleteButton>;
    },
    header: "",
    id: "actions",
  },
];

function DeleteButton({ entryId }: { entryId: string }) {
  const { isLoading, mutate } = useDeleteEntry(entryId);
  return (
    <div className="flex justify-end">
      <Button
        disabled={isLoading}
        spinner={isLoading}
        variant={"destructive"}
        size={"icon"}
        onClick={() => mutate()}
      >
        <Icons.DeleteEntry />
      </Button>
    </div>
  );
}
