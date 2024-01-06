import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Variants = {
  base: string;
  default: string;
  primary: string;
  danger: string;
  warning: string;
  success: string;
};

const variants: Variants = {
  base: "inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-gray-500/10",
  default: "bg-gray-50 text-gray-600",
  primary: "bg-blue-50 text-blue-600",
  danger: "bg-red-50 text-red-600",
  warning: "bg-yellow-50 text-yellow-600",
  success: "bg-green-100 text-green-700",
};

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof Variants;
};

const Badge: React.FC<BadgeProps> = ({ children, variant }) => {
  return (
    <span className={twMerge(variants.base, variant && variants[variant])}>
      {children}
    </span>
  );
};

export default Badge;
