'use client';

import { Weight } from '@physlane/domain';
import {
  Table,
  Badge,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Button,
  TableCaption,
  TableHead,
  Icons,
} from '@physlane/ui';
import { Text } from '@radix-ui/themes';
import { z } from 'zod';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function WeightTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    columns,
    data,
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
                data-state={row.getIsSelected() && 'selected'}
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

// export const WeightTable = ({ data }: { data: z.infer<typeof Weight>[] }) => {
//   return (
//     <Table>
//       <colgroup>
//         <col style={{ width: '50%' } as React.CSSProperties} />
//         <col style={{ width: '30%' } as React.CSSProperties} />
//         <col style={{ width: '20%' } as React.CSSProperties} />
//       </colgroup>
//       <TableCaption>Entries</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Weight</TableHead>
//           <TableHead>Date</TableHead>
//           <TableHead></TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {data.map((entry) => {
//           return (
//             <TableRow key={entry.id}>
//               <TableCell>
//                 <div className="flex justify-between">
//                   <Text>{entry.weight}</Text>
//                   <Badge>{entry.measure}</Badge>
//                 </div>
//               </TableCell>
//               <TableCell>{entry.createdAt.toISOString()}</TableCell>
//               <TableCell>
//                 <div className="flex justify-end">
//                   <Button variant={'destructive'} size={'icon'}>
//                     <Icons.DeleteEntry />
//                   </Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           );
//         })}
//       </TableBody>
//     </Table>
//   );
// };
