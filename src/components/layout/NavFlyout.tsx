"use client";

import React, {useState} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

type NavColumn = {
  title: string;
  items: {label: string; href: string; external?: boolean}[];
};

export default function NavFlyout() {
  const t = useTranslations("nav");

  const columns: NavColumn[] = [
    {
      title: t("foundation"),
      items: [
        {label: t("donate"), href: "/donate"},
        {label: t("about"), href: "/about"},
        {label: t("history"), href: "/history"},
        {label: t("jobs"), href: "/jobs"},
      ],
    },
    {
      title: t("leaderboards"),
      items: [
        {label: t("verified"), href: "/leaderboard"},
        {label: t("community"), href: "/leaderboard/community"},
        {
          label: t("arcAgi3Competition"),
          href: "https://www.kaggle.com/competitions/arc-prize-2026-arc-agi-3/leaderboard",
          external: true,
        },
        {
          label: t("arcAgi2Competition"),
          href: "https://www.kaggle.com/competitions/arc-prize-2026-arc-agi-2/leaderboard",
          external: true,
        },
      ],
    },
    {
      title: t("benchmark"),
      items: [
        {label: t("arcAgiSeries"), href: "/arc-agi"},
        {label: "ARC-AGI-1", href: "/arc-agi/1"},
        {label: "ARC-AGI-2", href: "/arc-agi/2"},
        {label: "ARC-AGI-3", href: "/arc-agi/3"},
        {label: t("allTasks"), href: "/tasks"},
      ],
    },
    {
      title: t("prize"),
      items: [
        {label: t("arcPrize2026"), href: "/competitions/2026"},
        {label: t("arcPrize2025"), href: "/competitions/2025"},
        {label: t("arcPrize2024"), href: "/competitions/2024"},
        {label: t("allCompetitions"), href: "/competitions"},
      ],
    },
    {
      title: t("research"),
      items: [
        {label: t("startHere"), href: "/research"},
        {label: t("partners"), href: "/partners"},
        {label: t("platform"), href: "/platform"},
      ],
    },
    {
      title: t("content"),
      items: [
        {label: t("blog"), href: "/blog"},
        {label: t("events"), href: "/events"},
        {label: t("community"), href: "/community"},
        {label: t("resources"), href: "/resources"},
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <nav className="hidden md:block relative">
      <div className="nav-flyout-bar">
        {columns.map((col, i) => (
          <button
            key={col.title}
            className="nav-flyout-trigger"
            aria-expanded={activeIndex === i}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() =>
              setActiveIndex(activeIndex === i ? null : i)
            }
          >
            {col.title}
          </button>
        ))}
      </div>
      {activeIndex !== null && (
        <div
          className="nav-flyout-dropdown"
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div className="nav-flyout-track max-w-[1200px] mx-auto px-6">
            {columns.map((col, i) => (
              <div
                key={col.title}
                className={`nav-flyout-panel ${
                  i === activeIndex ? "block" : "hidden"
                }`}
              >
                <h4>{col.title}</h4>
                <ul>
                  {col.items.map((item) => (
                    <li key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link href={item.href}>{item.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
