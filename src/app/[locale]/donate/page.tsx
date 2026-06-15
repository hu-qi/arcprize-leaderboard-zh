import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import PixelTag from "@/components/ui/PixelTag";
import Button from "@/components/ui/Button";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function DonatePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <DonateContent />;
}

function DonateContent() {
  const t = useTranslations("donate");

  return (
    <div className="narrow my-16">
      <PixelTag color="orange">{t("category")}</PixelTag>
      <h1>{t("title")}</h1>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <p>{t("p3")}</p>
      <div className="my-8">
        <Button href="https://arcprize.kit.com/bc80575d89" variant="primary">
          {t("donateNow")}
        </Button>
      </div>
    </div>
  );
}
