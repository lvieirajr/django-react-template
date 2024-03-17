import { Loader as LoaderIcon, type LucideProps } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const loaderVariants = cva(["animate-spin"], {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface LoaderProps extends LucideProps, VariantProps<typeof loaderVariants> {}

function Loader({ className, variant, ...props }: LoaderProps) {
  return (
    <LoaderIcon {...props} className={cn(loaderVariants({ variant, className }))} />
  );
}

export { Loader, loaderVariants };
