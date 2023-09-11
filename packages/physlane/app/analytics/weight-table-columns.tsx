'use client';

import { Weight } from '@physlane/domain';
import { Badge, Button, Icons } from '@physlane/ui';
import { Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

const deleteEntry = async (id: z.infer<typeof Weight>['id']) => {
  await fetch(`http://localhost:3000/api/analytics/weight/${id}`, {
    method: 'DELETE',
  }).catch((error) => {
    console.error(error);
    return null;
  });
};

export const columns: ColumnDef<z.infer<typeof Weight>>[] = [
  {
    accessorKey: 'weight',
    cell: ({ row }) => {
      const { measure, weight } = row.original;
      return (
        <div className="flex justify-between">
          <Text>{weight}</Text>
          <Badge>{measure}</Badge>
        </div>
      );
    },
    header: 'Weight',
  },
  {
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const date = new Intl.DateTimeFormat().format(createdAt);
      return (
        <div className="flex justify-between">
          <Text>{date}</Text>
        </div>
      );
    },
    header: 'Date',
  },
  {
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant={'destructive'}
            size={'icon'}
            onClick={() => deleteEntry(row.original.id)}
          >
            <Icons.DeleteEntry />
          </Button>
        </div>
      );
    },
    header: '',
    id: 'actions',
  },
];
