'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Weight } from '@physlane/domain';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@physlane/ui';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateWeightEntry } from './data';
import { WeightForm } from './weight-form';

const FormSchema = Weight.merge(
  z.object({
    id: z.string().optional(),
  })
);

export function LogMeasure() {
  const [opened, setDialogOpen] = useState(false);
  const { mutateAsync: createEntryAsync, isLoading } = useCreateWeightEntry();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      createdAt: new Date(),
      measure: 'KG',
      weight: 10,
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    // @ts-expect-error https://github.com/colinhacks/zod/issues/2663
    resolver: zodResolver(FormSchema, {
      errorMap: (error, ctx) => {
        return { message: ctx.defaultError };
      },
    }),
  });

  const createNewEntry = async () => {
    if (!form.formState.isValid) {
      return;
    }
    const values: Omit<z.infer<typeof Weight>, 'id'> = form.getValues(); // getValuesFromForm();

    try {
      await createEntryAsync(values);
      setDialogOpen(false);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <Dialog open={opened} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-max">Log measure</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new entry</DialogTitle>
          <DialogDescription>
            Add new information about your weight. You&apos;ll be able to
            correct it later within personal report.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <WeightForm onSubmit={() => createNewEntry()}></WeightForm>
        </FormProvider>
        <DialogFooter>
          <Button
            disabled={isLoading}
            spinner={isLoading}
            onClick={() => createNewEntry()}
          >
            Save
          </Button>
          <Button variant={'secondary'} onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
