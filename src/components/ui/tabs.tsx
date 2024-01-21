import * as React from "react";
import * as TabPrimitive from "@radix-ui/react-tabs";
import { twMerge } from "tailwind-merge";

const Tab = React.forwardRef<
  React.ElementRef<typeof TabPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabPrimitive.Root
    ref={ref}
    orientation="vertical"
    className={twMerge(
      "flex flex-col ",
      className
    )}
    {...props}
  />
));

Tab.displayName = TabPrimitive.Root.displayName;

const TabList = React.forwardRef<
  React.ElementRef<typeof TabPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabPrimitive.List
    ref={ref}
    className={twMerge("shrink-0 flex border-b", className)}
    {...props}
  />
));

TabList.displayName = TabPrimitive.List.displayName;

const TabTrigger = React.forwardRef<
  React.ElementRef<typeof TabPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabPrimitive.Trigger
    ref={ref}
    className={twMerge(
      "bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-lg leading-none select-none data-[state=active]:font-semibold data-[state=active]:shadow-custom outline-none cursor-pointer",
      className,
    )}
    {...props}
  />
));

TabTrigger.displayName = TabPrimitive.Trigger.displayName;

const TabContent = React.forwardRef<
  React.ElementRef<typeof TabPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabPrimitive.Content
    ref={ref}
    className={twMerge(
      "grow p-5 bg-white rounded-b-md outline-none",
      className
    )}
    {...props}
  />
));

TabContent.displayName = TabPrimitive.Content.displayName;

export { Tab, TabList, TabTrigger, TabContent };
