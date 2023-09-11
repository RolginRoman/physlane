'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Weight } from '@physlane/domain';
import {
  Button,
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
} from '@physlane/ui';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = Weight.merge(
  z.object({
    id: z.string().optional(),
  })
);

export const WeightForm = ({
  lastRecord,
}: {
  lastRecord?: z.infer<typeof Weight>;
}) => {
  const formContext = useFormContext<z.infer<typeof FormSchema>>();
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      createdAt: new Date(),
      measure: 'KG',
      weight: lastRecord?.weight ?? 10, // TODO just get last recorded weight for the placeholder
    },
    // @ts-expect-error https://github.com/colinhacks/zod/issues/2663
    resolver: zodResolver(FormSchema, {
      errorMap: (error, ctx) => {
        return { message: ctx.defaultError };
      },
    }),
  });

  async function onFormSubmit({
    createdAt,
    measure,
    weight,
  }: z.infer<typeof FormSchema>) {
    console.log(createdAt, measure, weight);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="space-y-3 w-full"
      >
        <div className="flex space-x-3">
          <FormField
            control={form.control}
            name="weight"
            render={({ field, fieldState }) => (
              <FormItem className="grow-[2]">
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    placeholder="Your weight data"
                    {...field}
                  ></Input>
                </FormControl>
                {fieldState.error && (
                  <FormMessage className="text-xs"></FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
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
                      <SelectItem value="KG">kg</SelectItem>
                      <SelectItem value="LBS">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {fieldState.error && (
                  <FormMessage className="text-xs"></FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="createdAt"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Measure date</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                ></DatePicker>
              </FormControl>
              {fieldState.error && (
                <FormMessage className="text-xs"></FormMessage>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
