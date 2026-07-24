"use client";

import { parseDateTime } from "@internationalized/date";
import { ChevronDown } from "lucide-react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DateSegment,
  Dialog,
  FieldError,
  Group,
  Label,
  DatePicker as AriaDatePicker,
  Popover,
} from "react-aria-components";

export type DatePickerFieldProps = {
  label: string;
  prefix: string;
  value: string | null;
  onChange: (value: string | null) => void;
  errorMessage?: string | null;
};

export const DatePickerField = ({
  label,
  prefix,
  value,
  onChange,
  errorMessage,
}: DatePickerFieldProps) => {
  return (
    <AriaDatePicker
      granularity="minute"
      value={value ? parseDateTime(value) : null}
      onChange={(date) => onChange(date ? date.toString() : null)}
      isInvalid={Boolean(errorMessage)}
      className="flex flex-col gap-1"
    >
      <Label className="sr-only">{label}</Label>
      <Group className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-3 focus-within:ring-2 focus-within:ring-ring">
        <span className="-my-3 flex shrink-0 items-center self-stretch border-r border-border bg-white py-3 pr-3 text-sm text-muted-foreground">
          {prefix}
        </span>
        <DateInput className="flex flex-1">
          {(segment) => (
            <DateSegment
              segment={segment}
              className="rounded px-0.5 tabular-nums text-foreground outline-none focus:bg-primary focus:text-primary-foreground"
            />
          )}
        </DateInput>
        <Button className="text-muted-foreground">
          <ChevronDown className="size-4" />
        </Button>
      </Group>
      {errorMessage ? (
        <FieldError className="text-sm text-destructive">
          {errorMessage}
        </FieldError>
      ) : null}
      <Popover className="rounded-md border border-border bg-card p-3 shadow-md">
        <Dialog>
          <Calendar>
            <header className="mb-2 flex items-center justify-between">
              <Button slot="previous" className="text-card-foreground">
                ‹
              </Button>
              <Button slot="next" className="text-card-foreground">
                ›
              </Button>
            </header>
            <CalendarGrid>
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="text-muted-foreground">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="cursor-pointer rounded p-1 text-center text-card-foreground data-selected:bg-primary data-selected:text-primary-foreground data-outside-month:text-muted-foreground"
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
};
