import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import PixelTag from "@/components/ui/PixelTag";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function PartnersPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <PartnersContent />;
}

function PartnersContent() {
  const t = useTranslations("partners");

  return (
    <div className="narrow my-16">
      <PixelTag color="orange">{t("category")}</PixelTag>
      <h1>{t("title")}</h1>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
    </div>
  );
}
