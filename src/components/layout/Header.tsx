import {Link} from "@/i18n/navigation";
import NavFlyout from "./NavFlyout";
import MobileMenu from "./MobileMenu";
import LocaleSwitcher from "./LocaleSwitcher";

type Props = {
  locale: string;
};

export default function Header({locale}: Props) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--offblack)] border-b border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-12">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="logo" />
        </Link>

        {/* Desktop Nav */}
        <div className="flex-1 hidden md:block">
          <NavFlyout />
        </div>

        {/* Right side: locale switcher + mobile menu */}
        <div className="flex items-center">
          <LocaleSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
