"use client";

import { Badge, cn } from "@physlane/ui";
import { Text } from "@radix-ui/themes";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import _groupBy from "lodash/groupBy";
import React, { ReactNode, useMemo } from "react";
import {
  LineChart as ChartsLineChart,
  Label,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { DataKey } from "recharts/types/util/types";
import { useWellKnownSettings } from "../user/loader";

type Grouped<T extends object> = T & { __entries: T[] };
const dateTimeFormat = new Intl.DateTimeFormat();
export type ChartDataItem<T = ReactNode | Date> = Record<string, T>;

const dateFormatter = (value: string) => {
  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(Date.parse(value));
};

export function LineChart<T extends ChartDataItem>({
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
  const groupedByDay: Grouped<T>[] = useMemo(() => {
    const startDate = new Date(0);
    const result = _groupBy(data, (item) =>
      differenceInCalendarDays(startDate, item.measureDate as Date)
    );
    return Object.values(result).map((groupedByDayItems) => {
      const lastEntry = groupedByDayItems[groupedByDayItems.length - 1];
      ((lastEntry ?? {}) as any).__entries = groupedByDayItems;
      return lastEntry as T & { __entries: T[] };
    });
  }, [data]);

  return (
    <div className={cn("h-64 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartsLineChart
          width={400}
          height={400}
          data={groupedByDay}
          margin={{ bottom: 5, left: 0, right: 12, top: 5 }}
        >
          <XAxis
            dataKey={xDataKey as DataKey<T>}
            tickFormatter={dateFormatter}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            dataKey={yDataKey as DataKey<T>}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${Math.floor(value)}`}
            domain={["dataMin - 10", "dataMax + 5"]}
          />

          <Tooltip
            content={(
              props: TooltipProps<
                number | string | Array<string | number>,
                number | string
              >
            ) => <LineTooltip tooltipProps={props} />}
          />

          <ReferenceLine
            y={75}
            strokeWidth={1}
            strokeDasharray="3 3"
            style={
              {
                "--theme-primary": `hsl(var(--primary))`,
                stroke: "var(--theme-primary)",
              } as React.CSSProperties
            }
          >
            <Label className="translate-y-3 text-sm">Goal</Label>
          </ReferenceLine>
          <Line
            dataKey={yDataKey as DataKey<T>}
            type="monotone"
            strokeWidth={2}
            yAxisId={0}
            dot={{ clipDot: false, r: 3 }}
            style={
              {
                "--theme-primary": `hsl(var(--primary))`,
                stroke: "var(--theme-primary)",
              } as React.CSSProperties
            }
            activeDot={{
              r: 6,
              style: { fill: "var(--theme-primary)", opacity: 0.95 },
            }}
            animationDuration={500}
            animationEasing={"ease-out"}
          />
        </ChartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

function LineTooltip<T extends number | string | Array<string | number>>({
  tooltipProps,
}: {
  tooltipProps: TooltipProps<T, number | string>;
}) {
  const settings = useWellKnownSettings();
  const { active, payload, label } = tooltipProps;
  if (active && payload && payload.length) {
    const item = payload[0]?.payload;
    const entries = item?.__entries;
    return (
      <div className="bg-background rounded-lg border p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          {label && (
            <div className="flex flex-col">
              <span className="text-muted-foreground text-[0.70rem] uppercase">
                Date
              </span>
              <span className="text-muted-foreground font-bold">
                {`${dateTimeFormat.format(Date.parse(label))}`}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-muted-foreground text-[0.70rem] uppercase">
              Weight
            </span>
            <span className="font-bold">
              {parseFloat(item?.weight.toFixed(1)) ?? "-"}{" "}
              <span className="font-normal">
                {settings?.measure && settings.measure}
              </span>
            </span>
          </div>
          {(entries?.length ?? 0) > 1 && (
            <Text className="col-span-2 text-xs">
              <Badge variant={"secondary"} className="px-1 py-0">
                {entries?.length}
              </Badge>{" "}
              entries were added. You see only the last one here.
            </Text>
          )}
        </div>
      </div>
    );
  }
  return null;
}
