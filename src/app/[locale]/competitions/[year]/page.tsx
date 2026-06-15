import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import PixelTag from "@/components/ui/PixelTag";
import Button from "@/components/ui/Button";

type Props = {
  params: Promise<{locale: string; year: string}>;
};

export default async function CompetitionPage({params}: Props) {
  const {locale, year} = await params;
  setRequestLocale(locale);
  return <CompetitionContent year={year} />;
}

function CompetitionContent({year}: {year: string}) {
  const t = useTranslations("competitions");

  if (year === "2026") {
    return <Competition2026 t={t} />;
  }

  // Generic competition page for other years
  return (
    <div className="narrow my-16">
      <PixelTag color="green">{t("category")}</PixelTag>
      <h1>ARC Prize {year}</h1>
      <p>Details coming soon.</p>
      <div className="mt-8">
        <Button href="/competitions/2026">{t("viewDetails")}</Button>
      </div>
    </div>
  );
}

function Competition2026({t}: {t: ReturnType<typeof useTranslations>}) {
  return (
    <div>
      {/* Header */}
      <div className="narrow my-16">
        <PixelTag color="green">{t("category")}</PixelTag>
        <h1>{t("title2026")}</h1>
        <h3>{t("subtitle2026")}</h3>
      </div>

      {/* Three Tracks */}
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-6 my-8">
        {/* ARC-AGI-3 Track */}
        <div className="card-bg rounded-sm p-6">
          <div className="text-xs pixel green uppercase mb-2">{t("trackCompetition")}</div>
          <h4>{t("arcAgi3Title")}</h4>
          <p className="text-sm my-4">{t("arcAgi3Desc")}</p>
          <div className="flex gap-4">
            <Button href="/competitions/2026/arc-agi-3">{t("viewDetails")}</Button>
            <Button href="https://www.kaggle.com/competitions/arc-prize-2026-arc-agi-3/overview" external>
              Kaggle ↗
            </Button>
          </div>
        </div>

        {/* ARC-AGI-2 Track */}
        <div className="card-bg rounded-sm p-6">
          <div className="text-xs pixel green uppercase mb-2">{t("trackCompetition")}</div>
          <h4>{t("arcAgi2Title")}</h4>
          <p className="text-sm my-4">{t("arcAgi2Desc")}</p>
          <div className="flex gap-4">
            <Button href="/competitions/2026/arc-agi-2">{t("viewDetails")}</Button>
            <Button href="https://www.kaggle.com/competitions/arc-prize-2026-arc-agi-2/overview" external>
              Kaggle ↗
            </Button>
          </div>
        </div>

        {/* Paper Prize */}
        <div className="card-bg rounded-sm p-6">
          <div className="text-xs pixel orange uppercase mb-2">{t("trackAward")}</div>
          <h4>{t("paperPrizeTitle")}</h4>
          <p className="text-sm my-4">{t("paperPrizeDesc")}</p>
          <div className="flex gap-4">
            <Button href="/competitions/2026/paper">{t("viewDetails")}</Button>
            <Button href="https://www.kaggle.com/competitions/arc-prize-2026-paper-track/overview" external>
              Kaggle ↗
            </Button>
          </div>
        </div>
      </div>

      {/* Key Dates & Goals */}
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-8 my-8">
        <div>
          <h4>{t("keyDates")}</h4>
          <ul className="mt-4 space-y-2">
            <li><strong>March 25, 2026</strong> — {t("compStarts")}</li>
            <li><strong>June 30, 2026</strong> — {t("milestone1")}</li>
            <li><strong>September 30, 2026</strong> — {t("milestone2")}</li>
            <li><strong>November 2, 2026</strong> — {t("submissionsDue")}</li>
            <li><strong>November 8, 2026</strong> — {t("papersDue")}</li>
            <li><strong>December 4, 2026</strong> — {t("resultsAnnounced")}</li>
          </ul>
        </div>
        <div>
          <h4>{t("goalsTitle")}</h4>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>{t("goal1")}</li>
            <li>{t("goal2")}</li>
            <li>{t("goal3")}</li>
          </ul>
        </div>
      </div>

      {/* Spirit */}
      <div className="narrow my-16">
        <h3>{t("spiritTitle")}</h3>
        <p><strong>{t("spiritP1")}</strong></p>
        <p>{t("spiritP2")}</p>
        <p>{t("spiritP3")}</p>
      </div>

      {/* Rules */}
      <div className="narrow my-16">
        <h2>{t("rulesTitle")}</h2>

        <h3>{t("licenseTitle")}</h3>
        <p>{t("licenseDesc")}</p>

        <h3>{t("eligibilityTitle")}</h3>
        <p>{t("eligibilityP1")}</p>
        <p>{t("eligibilityP2")}</p>

        <h3>{t("generalTitle")}</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t("general1")}</li>
          <li>{t("general2")}</li>
          <li>{t("general3")}</li>
          <li>{t("general4")}</li>
        </ul>
      </div>
    </div>
  );
}
