import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import PixelTag from "@/components/ui/PixelTag";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HistoryPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <HistoryContent />;
}

function HistoryContent() {
  const t = useTranslations("history");

  return (
    <div className="narrow my-16">
      <PixelTag color="yellow">{t("category")}</PixelTag>
      <h1>{t("title")}</h1>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <p>{t("p3")}</p>
    </div>
  );
}
