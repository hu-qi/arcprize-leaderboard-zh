import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import PixelTag from "@/components/ui/PixelTag";
import Button from "@/components/ui/Button";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function PlatformPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <PlatformContent />;
}

function PlatformContent() {
  const t = useTranslations("platform");

  return (
    <div className="narrow my-16">
      <PixelTag color="green">{t("category")}</PixelTag>
      <h1>{t("title")}</h1>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <div className="my-8">
        <Button href="/leaderboard">{t("viewLeaderboard")}</Button>
      </div>
    </div>
  );
}
