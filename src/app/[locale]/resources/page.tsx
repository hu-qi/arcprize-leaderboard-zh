import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import PixelTag from "@/components/ui/PixelTag";
import Button from "@/components/ui/Button";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function ResourcesPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <ResourcesContent />;
}

function ResourcesContent() {
  const t = useTranslations("resources");

  return (
    <div className="narrow my-16">
      <PixelTag color="yellow">{t("category")}</PixelTag>
      <h1>{t("title")}</h1>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <div className="my-8">
        <Button href="/arc-agi">{t("viewBenchmarks")}</Button>
      </div>
    </div>
  );
}
