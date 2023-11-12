import React from "react";

interface TextProps {
  tag?: string;
  className?: string;
  children: React.ReactNode;
}

export function Text({ tag, children, className, ...props }: TextProps) {
  const Tag = tag || "p" as React.ElementType;

  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}