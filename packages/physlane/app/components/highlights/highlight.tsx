"use client";

import { cn } from "@physlane/ui";
import { Heading } from "@radix-ui/themes";
import { useInView } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { useSelectedHighlight } from "./state";

export const Highlight = ({ title }: { title: string }) => {
  const target = useRef(null);
  const isInView = useInView(target, {
    margin: "-45% 0px -45% 0px",
  });

  const [selected, setSelected] = useSelectedHighlight();

  const isSelected = useMemo(
    () => isInView || (!isInView && selected === title),
    [isInView, selected, title]
  );

  useEffect(() => {
    if (isSelected) {
      setSelected(title);
    }
  }, [isSelected, setSelected, title]);

  return (
    <article ref={target} className="space-y-2">
      <Heading
        as="h2"
        size="8"
        className={cn(
          isSelected ? "text-inherit" : "text-slate-300",
          "transition-colors [text-wrap:balance]"
        )}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </article>
  );
};
