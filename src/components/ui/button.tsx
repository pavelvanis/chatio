import React from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button className={twMerge(" cursor-pointer rounded-lg border px-2.5 py-.5 font-semibold text-lg", className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
