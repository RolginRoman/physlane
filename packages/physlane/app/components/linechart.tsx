'use client';

import { cn, Badge } from '@physlane/ui';
import React, { ReactNode, useMemo } from 'react';
import {
  LineChart as ChartsLineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import _groupBy from 'lodash/groupBy';
import { Text } from '@radix-ui/themes';

const dateTimeFormat = new Intl.DateTimeFormat();
export type ChartDataItem<T = ReactNode | Date> = Record<string, T>;

const dateFormatter = (value: string) => {
  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(Date.parse(value));
};

const millisecondInDay = 1000 * 60 * 60 * 24;

export default function LineChart<T extends ChartDataItem>({
  animationStartMs = 0,
  className,
  data,
  xDataKey,
  yDataKey,
}: React.HTMLAttributes<void> & {
  animationStartMs?: number;
  data: T[];
  xDataKey: keyof T; //Pick<React.ComponentProps<typeof XAxis>, 'dataKey'>;
  yDataKey: keyof T; //Pick<React.ComponentProps<typeof YAxis>, 'dataKey'>;
}) {
  const groupedByDay: (T & { __entries: T[] })[] = useMemo(() => {
    const result = _groupBy(data, (item) =>
      Math.floor((item.createdAt as Date).getTime() / millisecondInDay)
    );
    return Object.values(result).map((groupedByDayItems) => {
      const lastEntry = groupedByDayItems[groupedByDayItems.length - 1]!;
      (lastEntry as any).__entries = groupedByDayItems;
      return lastEntry as T & { __entries: T[] };
    });
  }, [data]);

  return (
    <div className={cn('w-full h-64', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartsLineChart
          width={400}
          height={400}
          data={groupedByDay}
          margin={{ bottom: 5, left: 0, right: 12, top: 5 }}
        >
          <XAxis
            dataKey={xDataKey}
            tickFormatter={dateFormatter}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            dataKey={yDataKey}
            tick={{ fontSize: 12 }}
            domain={['dataMin - 10', 'dataMax + 5']}
          />

          <Tooltip
            content={({
              active,
              label,
              payload,
            }: {
              active?: boolean;
              payload?: { payload: T & { __entries: T[] } }[];
              label?: string;
            }) => {
              if (active && payload && payload.length) {
                const item = payload[0]?.payload;
                const entries = item?.__entries;
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      {label && (
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Date
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {`${dateTimeFormat.format(Date.parse(label))}`}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Weight
                        </span>
                        <span className="font-bold">{item?.weight ?? '-'}</span>
                      </div>
                      {entries?.length > 1 && (
                        <Text className="col-span-2 text-xs">
                          You've added{' '}
                          <Badge variant={'secondary'} className="px-1 py-0">
                            {entries?.length}
                          </Badge>{' '}
                          entries. You see only the last one here.
                        </Text>
                      )}
                    </div>
                  </div>
                );
              }

              return null;
            }}
          />

          <Line
            dataKey={yDataKey}
            type="monotone"
            strokeWidth={2}
            yAxisId={0}
            dot={{ clipDot: false, r: 3 }}
            style={
              {
                '--theme-primary': `hsl(var(--primary))`,
                stroke: 'var(--theme-primary)',
              } as React.CSSProperties
            }
            activeDot={{
              r: 6,
              style: { fill: 'var(--theme-primary)', opacity: 0.55 },
            }}
          />
        </ChartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export { LineChart };
