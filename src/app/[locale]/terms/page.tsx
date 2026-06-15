import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function TermsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations("terms");

  return (
    <div className="narrow my-16">
      <h1>{t("title")}</h1>
      <p>{t("lastUpdated")}</p>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <p>{t("p3")}</p>
      <p>{t("p4")}</p>
    </div>
  );
}
