import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import PixelTag from "@/components/ui/PixelTag";
import Button from "@/components/ui/Button";
import {Link} from "@/i18n/navigation";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CompetitionsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <CompetitionsContent />;
}

const competitionYears = [2026, 2025, 2024] as const;

function CompetitionsContent() {
  const t = useTranslations("allCompetitions");

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <PixelTag color="green">{t("category")}</PixelTag>
      <h1>{t("title")}</h1>
      <p className="mb-8">{t("description")}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {competitionYears.map((year) => (
          <Link
            key={year}
            href={`/competitions/${year}`}
            className="card-bg block rounded-sm p-6 hover:brightness-110 transition"
          >
            <p className="text-xs opacity-50 mb-2">{t(`year${year}_label`)}</p>
            <h2 className="mb-2">{t(`year${year}_title`)}</h2>
            <p className="text-sm opacity-70 mb-4">{t(`year${year}_desc`)}</p>
            <span className="text-xs yellow">{t("viewDetails")}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
