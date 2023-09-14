"use client";

import * as React from "react";

import { cn } from "../../utils";
import { Button } from "./button";
import { Calendar, CalendarProps } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Icons } from "./icon";

type DatePickerProps = {
  value?: Date;
  dateFormatter?: (date: Date | number) => string;
  emptySelectorContent?: React.ReactNode;
  onSelect: (day: Date | undefined) => void;
} & Pick<CalendarProps, "disabled">;

const defaultDateFormatter = (date: Date | number): string => {
  return Intl.DateTimeFormat().format(date);
};

const defaultDisabledMatcher = (): boolean => false;

export function DatePicker({
  dateFormatter = defaultDateFormatter,
  disabled = defaultDisabledMatcher,
  emptySelectorContent = <span>Pick a date</span>,
  onSelect,
  value,
}: DatePickerProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <Icons.Calendar className="mr-2 h-4 w-4" />
          {value ? dateFormatter(value) : emptySelectorContent}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onSelect}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}
