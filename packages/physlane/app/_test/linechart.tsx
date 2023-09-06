'use client';

import { cn } from '@physlane/ui';
import * as React from 'react';
import {
  LineChart as ChartsLineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    amt: 0,
    name: '2023-08-01T16:06:11.297Z',
    pv: 800,
    uv: 0,
  },
  {
    amt: 1400,
    name: '2023-07-01T16:06:11.297Z',
    pv: 800,
    uv: 590,
  },
  {
    amt: 1506,
    name: '2023-06-01T16:06:11.297Z',
    pv: 967,
    uv: 868,
  },
  {
    amt: 989,
    name: '2023-05-01T16:06:11.297Z',
    pv: 1098,
    uv: 1397,
  },
  {
    amt: 1228,
    name: '2023-04-01T16:06:11.297Z',
    pv: 1200,
    uv: 1480,
  },
  {
    amt: 1100,
    name: '2023-03-01T16:06:11.297Z',
    pv: 1108,
    uv: 1520,
  },
  {
    amt: 1700,
    name: '2023-02-01T16:06:11.297Z',
    pv: 680,
    uv: 1400,
  },
];

const dateTimeFormat = new Intl.DateTimeFormat('en-US');

const dateFormatter = (value: string) => {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(Date.parse(value));
};

function CustomTooltip({
  active,
  label,
  payload,
}: {
  active?: boolean;
  payload?: { payload: (typeof data)[number] }[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="flex flex-col bg-white p-1">
        {label && (
          <p className="">{`${dateTimeFormat.format(Date.parse(label))}`}</p>
        )}
        <p className="">uv: {`${item?.payload.uv}`}</p>
      </div>
    );
  }

  return null;
}

export default function LineChart({
  animationStartMs = 0,
  className,
}: React.HTMLAttributes<void> & { animationStartMs?: number }) {
  return (
    <div className={cn('w-full h-64', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartsLineChart
          width={400}
          height={400}
          data={data}
          margin={{ bottom: 5, left: 40, right: 40, top: 5 }}
        >
          <XAxis
            dataKey="name"
            tickFormatter={dateFormatter}
            tick={{ fontSize: 12 }}
          />
          <YAxis dataKey="uv" tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#f5f5f5" />
          <Line
            type="monotone"
            dataKey="uv"
            strokeWidth={1}
            stroke="#334155"
            yAxisId={0}
            dot={{ clipDot: false, r: 3 }}
            activeDot={{ r: 3 }}
            animationBegin={animationStartMs}
          />
        </ChartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
