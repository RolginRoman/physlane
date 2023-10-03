import { cn } from "@physlane/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

const spinnerVariants = cva(
  "relative inline-block h-12 w-12 animate-spin rounded-full border-2 border-solid border-current border-b-transparent text-slate-400",
  {
    defaultVariants: {
      variant: "light",
    },
    variants: {
      variant: {
        default: "text-slate-400",
        light: "text-slate-800",
      },
    },
  }
);

export type SpinnerPropsType = { asChild?: boolean } & React.PropsWithoutRef<
  React.HTMLAttributes<HTMLSpanElement>
> &
  VariantProps<typeof spinnerVariants>;

export const Spinner = ({
  className,
  variant,
  asChild = false,
  ...props
}: SpinnerPropsType) => {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      aria-label="Indefinite loading indicator"
      className={cn(spinnerVariants({ variant }), className)}
      {...props}
    ></Comp>
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
