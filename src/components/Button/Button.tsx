import NextLink from "next/link";
import { Button as UIButton } from "@ui/ui/button";

interface Tag {
  className?: string;
  size?: React.ComponentProps<typeof UIButton>["size"];
  variant?: React.ComponentProps<typeof UIButton>["variant"];
  onClick?: React.ComponentProps<typeof UIButton>["onClick"];
  formAction?: React.ComponentProps<typeof UIButton>["formAction"];
  children: React.ReactNode;
}

interface ButtonLink extends Tag {
  href: string;
}

interface ButtonBase extends Tag {
  type: "submit" | "button";
}

type ButtonProps = ButtonLink | ButtonBase;

export function Button({ children, className, ...props }: ButtonProps) {
  const isButtonLink = "href" in props;

  if (isButtonLink) {
    const variant = props.variant || "link";
    return (
      <UIButton {...props} className={className} variant={variant} asChild>
        <NextLink href={props.href}>
          {children}
        </NextLink>
      </UIButton>
    );
  }

  return (
    <UIButton {...props} className={className}>
      {children}
    </UIButton>
  );
}