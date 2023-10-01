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
import { useEffect, useState } from "react";

export function Settings() {
  const {
    mutate: updateUserSettings,
    isSuccess,
    isLoading,
  } = useUpdateUserSettings();
  const { measure } = useWellKnownSettings();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    setSynced(isSuccess);
    const showTimerId = setTimeout(() => {
      setSynced(false);
    }, 3000);
    return () => clearTimeout(showTimerId);
  }, [isSuccess]);

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
            <div className="mt-1.5 h-5">
              {synced && <Text>✔️Synced</Text>}
              {isLoading && <Spinner className="h-2.5 w-2.5"></Spinner>}
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className="mt-2">
          <div className="flex w-full items-center justify-between">
            <Label>Measure</Label>
            <Button
              size={"sm"}
              onClick={() =>
                updateUserSettings({
                  measure: measure === "kg" ? "lb" : "kg",
                })
              }
            >
              {measure}
            </Button>
          </div>
          <Separator className="my-3" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
