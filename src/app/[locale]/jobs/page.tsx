import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import PixelTag from "@/components/ui/PixelTag";
import Button from "@/components/ui/Button";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function JobsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <JobsContent />;
}

function JobsContent() {
  const t = useTranslations("jobs");

  return (
    <div className="narrow my-16">
      <PixelTag color="orange">{t("category")}</PixelTag>
      <h1>{t("title")}</h1>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <div className="my-8">
        <Button href="/about">{t("learnAboutTeam")}</Button>
      </div>
    </div>
  );
}
