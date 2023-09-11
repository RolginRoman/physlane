'use client';

import { api } from '@physlane/api';
import { Weight } from '@physlane/domain';
import { Badge, Button, Icons } from '@physlane/ui';
import { Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

const deleteEntry = async (id: z.infer<typeof Weight>['id']) => {
  await api.delete(`analytics/weight/${id}`).catch((error) => {
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
      const date = new Intl.DateTimeFormat('en-US').format(createdAt);
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
