import React from "react";

interface BoxProps {
  tag?: string;
  className?: string;
  children: React.ReactNode;
}

export function Box({tag, children, className, ...props}: BoxProps) {
  const Tag = tag || "div" as React.ElementType;

  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}