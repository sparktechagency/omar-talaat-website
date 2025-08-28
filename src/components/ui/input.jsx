import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(function Input(
  { className, type = "text", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-blue-500 selection:text-white dark:bg-input/30 border-white flex h-12 w-full min-w-0 rounded-md border-[1px] border-solid bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border file:border-input file:rounded-md file:px-2 file:py-1 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-white focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "select-text cursor-text", // Explicitly enable text selection and cursor
        className
      )}
      aria-invalid={props["aria-invalid"] || false}
      style={{
        userSelect: 'text',
        WebkitUserSelect: 'text',
        MozUserSelect: 'text',
        msUserSelect: 'text',
        ...props.style
      }}
      {...props}
    />
  );
});

export { Input };
