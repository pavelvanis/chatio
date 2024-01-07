import React, { InputHTMLAttributes, ForwardRefRenderFunction } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { className, ...props },
  ref
) => {
  return (
    <input
      ref={ref}
      className={twMerge(
        "w-full h-7 rounded-lg ps-4 pe-3 text-base border ",
        className
      )}
      {...props}
    />
  );
};

export default React.forwardRef(Input);
