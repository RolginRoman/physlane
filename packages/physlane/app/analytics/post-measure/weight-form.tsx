"use client";
import { ALL_MEASURES, Weight } from "@physlane/domain";
import {
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@physlane/ui";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const FormSchema = Weight.merge(
  z.object({
    id: z.string().optional(),
  })
);

export const WeightForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const formContext = useFormContext<z.infer<typeof FormSchema>>();

  const { trigger } = formContext;
  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Form {...formContext}>
      <form
        className="w-full space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex space-x-3">
          <FormField
            control={formContext.control}
            name="weight"
            render={({ field, fieldState }) => (
              <FormItem className="grow-[2]">
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Your weight data" {...field} />
                </FormControl>
                {fieldState.error && <FormMessage className="text-xs" />}
              </FormItem>
            )}
          />
          <FormField
            control={formContext.control}
            name="measure"
            render={({ field, fieldState }) => (
              <FormItem className="grow">
                <FormLabel>Measure</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select measure" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ALL_MEASURES.map((measure) => (
                        <SelectItem key={measure} value={measure}>
                          {measure.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {fieldState.error && <FormMessage className="text-xs" />}
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={formContext.control}
          name="measureDate"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Measure date</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              </FormControl>
              {fieldState.error && <FormMessage className="text-xs" />}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
