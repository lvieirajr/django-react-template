import { Loader as LoaderIcon, type LucideProps } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const loaderVariants = cva(["animate-spin"], {
  variants: {
    variant: {
      default: "inline-block",
      page: "fixed inset-0 flex justify-center items-center ",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface LoaderProps extends LucideProps, VariantProps<typeof loaderVariants> {}

function Loader({ className, variant, ...props }: LoaderProps) {
  let { size } = props;

  if (!size) {
    size = variant === "page" ? 72 : 24;
  }

  return (
    <div className={cn(loaderVariants({ variant, className }))}>
      <LoaderIcon {...props} size={size} />
    </div>
  );
}

export { Loader, loaderVariants };
