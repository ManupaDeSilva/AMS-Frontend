import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);

  // Determine the type of input field
  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="relative flex items-center">
      <input
        type={inputType}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setPasswordVisible((prev) => !prev)}
          className="absolute right-2 flex h-full items-center text-muted-foreground hover:text-foreground focus:outline-none"
        >
          {isPasswordVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223a10.477 10.477 0 0116.04 0c.76.883.76 2.204 0 3.087a10.477 10.477 0 01-16.04 0c-.76-.883-.76-2.204 0-3.087z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223a10.477 10.477 0 0116.04 0c.76.883.76 2.204 0 3.087a10.477 10.477 0 01-16.04 0c-.76-.883-.76-2.204 0-3.087z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12c1.5 0 2.75-1.25 2.75-2.75S13.5 6.5 12 6.5 9.25 7.75 9.25 9.25 10.5 12 12 12z"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
