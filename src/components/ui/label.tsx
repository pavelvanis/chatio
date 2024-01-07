import React, { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {};

const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label className={twMerge("p-1 font-semibold", className)} {...props}>
      {children}
    </label>
  );
};

export default Label;
