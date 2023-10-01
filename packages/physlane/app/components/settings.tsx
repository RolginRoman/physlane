"use client";
import {
  Button,
  Label,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Spinner,
} from "@physlane/ui";
import { Heading, Text } from "@radix-ui/themes";
import { useUpdateUserSettings, useWellKnownSettings } from "../user/loader";

export function Settings() {
  const {
    mutate: updateUserSettings,
    isSuccess,
    isLoading,
  } = useUpdateUserSettings();
  const settings = useWellKnownSettings();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>Settings</button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle asChild>
            <Heading as="h3">Edit settings</Heading>
          </SheetTitle>
          <SheetDescription>
            Make changes to your settings here.{" "}
            {isSuccess && <Text>✔️Synced</Text>}
            {isLoading && <Spinner className="h-2.5 w-2.5"></Spinner>}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-3">
          <div className="flex w-full items-center justify-between">
            <Label>Measure</Label>
            <Button
              onClick={() =>
                updateUserSettings({
                  measure: settings?.measure === "kg" ? "lb" : "kg",
                })
              }
            >
              {settings?.measure}
            </Button>
          </div>
          <Separator className="my-3" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
