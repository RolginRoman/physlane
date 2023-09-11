'use client';

import { cn } from '@physlane/ui';
import React, { ReactNode } from 'react';
import {
  LineChart as ChartsLineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer,
} from 'recharts';

const dateTimeFormat = new Intl.DateTimeFormat();
export type ChartDataItem<T = ReactNode> = Record<string, T>;

const dateFormatter = (value: string) => {
  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(Date.parse(value));
};

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
  return (
    <div className={cn('w-full h-64', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartsLineChart
          width={400}
          height={400}
          data={data}
          margin={{ bottom: 5, left: 12, right: 12, top: 5 }}
        >
          <XAxis
            dataKey={xDataKey}
            tickFormatter={dateFormatter}
            tick={{ fontSize: 12 }}
          />
          <YAxis dataKey={yDataKey} tick={{ fontSize: 12 }} />

          <Tooltip
            content={({
              active,
              label,
              payload,
            }: {
              active?: boolean;
              payload?: { payload: T }[];
              label?: string;
            }) => {
              if (active && payload && payload.length) {
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
                        <span className="font-bold">
                          {payload[0]?.payload?.weight ?? '-'}
                        </span>
                      </div>
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
              style: { fill: 'var(--theme-primary)', opacity: 0.25 },
            }}
          />
        </ChartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export { LineChart };
