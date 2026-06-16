"use client";

import {useRouter, usePathname} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";
import {useLocale} from "next-intl";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.push(pathname, {locale: newLocale as "zh" | "en"});
  }

  return (
    <div className="flex items-center gap-1 ml-2">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2 py-1 text-[0.65rem] uppercase tracking-wider transition-colors ${
            locale === loc
              ? "text-[var(--yellow)] border-b border-[var(--yellow)]"
              : "text-[var(--offwhite)] opacity-60 hover:opacity-100"
          }`}
        >
          {loc === "zh" ? "中" : "EN"}
        </button>
      ))}
    </div>
  );
}
