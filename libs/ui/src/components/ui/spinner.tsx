import { cn } from "@physlane/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva("after:bg-slate-700", {
  defaultVariants: {
    variant: "light",
  },
  variants: {
    variant: {
      default: "after:bg-slate-700",
      light: "after:bg-white",
    },
  },
});

export const Spinner = ({
  className,
  variant,
}: React.PropsWithoutRef<React.HTMLAttributes<HTMLSpanElement>> &
  VariantProps<typeof spinnerVariants>) => {
  return (
    <span
      className={cn(
        "relative inline-block h-12 w-12 animate-spin rounded-full bg-gradient-to-t from-cyan-500 to-blue-500 after:absolute after:left-1/2 after:top-1/2 after:h-5/6 after:w-5/6 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:content-['']",
        spinnerVariants({ variant }),
        className
      )}
    ></span>
  );
};

/**
 * 
 * .loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: linear-gradient(0deg, rgba(255, 61, 0, 0.2) 33%, #ff3d00 100%);
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #263238;
}
@keyframes rotation {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg)}
} 
 */
