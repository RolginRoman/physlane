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
import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { useUpdateUserSettings, useWellKnownSettings } from "../user/loader";
import useTimeout from "./use-timeout";

type SyncIndicatorState = "synced" | "loading" | undefined;

export function Settings() {
  const { mutate, isSuccess, isLoading } = useUpdateUserSettings();
  const wellKnownSettings = useWellKnownSettings();
  const [synced, setSynced] = useState(false);
  const [settings, setSettings] = useState(wellKnownSettings);
  const [resetSyncedState] = useTimeout(() => setSynced(false), 3000);

  useDebounce(() => mutate(settings), 300, [settings]);
  useEffect(() => {
    if (isSuccess) {
      setSynced(isSuccess);
      resetSyncedState?.();
    }
  }, [isSuccess, resetSyncedState]);

  const state = synced ? "synced" : isLoading ? "loading" : undefined;

  const handleMeasureChange = () => {
    setSettings({
      measure: settings.measure === "kg" ? "lb" : "kg",
    });
  };

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
            <span className="mt-1.5 block h-5">
              <SyncIndicator state={state} />
            </span>
          </SheetDescription>
        </SheetHeader>
        <div className="mt-2">
          <div className="flex w-full items-center justify-between">
            <Label>Measure</Label>
            <Button size={"sm"} onClick={handleMeasureChange}>
              {settings.measure}
            </Button>
          </div>
          <Separator className="my-3" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

const SyncIndicator = ({ state }: { state: SyncIndicatorState }) => {
  return (
    <>
      <AnimatePresence mode={"wait"} initial={false}>
        {state === "synced" && (
          <Text asChild>
            <m.span
              key={"synced"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              ✔️ Synced
            </m.span>
          </Text>
        )}
        {state === "loading" && (
          <Spinner asChild className="h-3 w-3">
            <m.span
              key={"loading"}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.2, delay: 0.2 },
              }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
            />
          </Spinner>
        )}
      </AnimatePresence>
    </>
  );
};
