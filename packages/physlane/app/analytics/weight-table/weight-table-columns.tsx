"use client";

import { Weight } from "@physlane/domain";
import { Badge, Button, Icons, WithTooltip } from "@physlane/ui";
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
          <Text weight={"medium"}>{parseFloat(weight.toFixed(1))}</Text>
          <Badge variant={"secondary"} className="w-10 justify-center">
            {measure}
          </Badge>
        </div>
      );
    },
    header: "Weight",
  },
  {
    accessorKey: "measureDate",
    cell: ({ row }) => {
      const { measureDate } = row.original;
      const date = new Intl.DateTimeFormat("en-US").format(measureDate);
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
  const { isLoading, isSuccess, mutate } = useDeleteEntry(entryId);
  const isDeleteProcessing = isLoading || isSuccess;
  return (
    <div className="flex justify-end">
      <WithTooltip content={"Delete entry"} className="mr-5">
        <Button
          disabled={isDeleteProcessing}
          spinner={isDeleteProcessing}
          variant={"destructive"}
          size={"icon"}
          onClick={() => {
            if (!isDeleteProcessing) {
              mutate();
            }
          }}
        >
          <Icons.DeleteEntry />
        </Button>
      </WithTooltip>
    </div>
  );
}
