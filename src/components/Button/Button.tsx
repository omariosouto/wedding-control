import NextLink from "next/link";

interface Tag {
  children: React.ReactNode;
}

interface ButtonLink extends Tag {
  href: string;
}

interface ButtonBase extends Tag {
  type: "submit";
}

type ButtonProps = ButtonLink | ButtonBase;

export function Button({children, ...props}: ButtonProps) {
  const isButtonLink = "href" in props;

  const className = "text-2xl";

  if(isButtonLink) {
    return (
      <NextLink href={props.href} className={className}>
        {children}
      </NextLink>
    );
  }

  return (
    <button className={className}>
      {children}
    </button>
  );
}