import {Link} from "@/i18n/navigation";

type Props = {
  href?: string;
  variant?: "primary" | "default";
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
};

export default function Button({
  href,
  variant = "default",
  className = "",
  children,
  external,
  onClick,
}: Props) {
  const cls = `button ${variant === "primary" ? "primary" : ""} ${className}`;

  if (href && external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
