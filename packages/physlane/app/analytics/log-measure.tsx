'use client';
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
import { WeightForm } from './weight-form';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Weight } from '@physlane/domain';
import { z } from 'zod';

export function LogMeasure() {
  const [opened, setDialogOpen] = useState(false);
  const submitWeightForm = useForm<Omit<z.infer<typeof Weight>, 'id'>>();

  const createNewEntry = async () => {
    const values: Omit<z.infer<typeof Weight>, 'id'> = {} as any; // getValuesFromForm();

    const response = await fetch('http://localhost:3000/api/analytics/weight', {
      body: JSON.stringify(values),
      method: 'POST',
    });
    if (!response.ok) {
      // TODO handle error
      return;
    }

    const body = await response.json();

    // TODO optimistic report update state
    setDialogOpen(false);
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
        <FormProvider {...submitWeightForm}>
          <WeightForm lastRecord={undefined}></WeightForm>
        </FormProvider>
        <DialogFooter>
          <Button onClick={() => createNewEntry()}>Save</Button>
          <Button variant={'secondary'} onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
