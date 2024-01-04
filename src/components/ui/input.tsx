import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input className={twMerge("w-full h-7 rounded-lg ps-4 pe-3 text-base border ",className)} {...props} />;
};

export default Input;
