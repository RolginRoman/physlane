import { cn } from "@physlane/ui";
import { motion, AnimatePresence } from "framer-motion";
import { useMeasure } from "react-use";

export const ResizablePanel = ({
  className,
  children,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const [ref, { height }] = useMeasure<HTMLDivElement>();

  return (
    <motion.div
      animate={{ height: height || "auto" }}
      className={cn("relative overflow-hidden", className)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          className="w-full"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <div
            ref={ref}
            className={`w-full ${height ? "absolute" : "relative"}`}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.
  https://github.com/facebook/react/issues/8669#issuecomment-531515508
  */
const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: string, value: WeakKey | null) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
