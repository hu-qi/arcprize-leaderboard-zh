"use client";

import React, {useState, useEffect, useRef, useCallback} from "react";
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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  // Close on Escape key
  useEffect(() => {
    if (activeIndex === null) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, close]);

  // Close on click outside
  useEffect(() => {
    if (activeIndex === null) return;
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeIndex, close]);

  return (
    <nav className="hidden md:block" aria-label="Main navigation">
      <div
        ref={wrapperRef}
        className="nav-flyout-wrapper"
        onMouseLeave={close}
      >
        <div className="nav-flyout-bar" role="menubar">
          {columns.map((col, i) => (
            <button
              key={col.title}
              className="nav-flyout-trigger"
              role="menuitem"
              aria-expanded={activeIndex === i}
              aria-haspopup="true"
              aria-controls={activeIndex === i ? `nav-panel-${i}` : undefined}
              onMouseEnter={() => setActiveIndex(i)}
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
            id={`nav-panel-${activeIndex}`}
            className="nav-flyout-dropdown"
            role="menu"
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
                      <li key={item.href} role="none">
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            role="menuitem"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link href={item.href} role="menuitem">
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
