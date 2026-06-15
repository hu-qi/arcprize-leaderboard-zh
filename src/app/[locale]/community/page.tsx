import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import PixelTag from "@/components/ui/PixelTag";
import Button from "@/components/ui/Button";
import {Link} from "@/i18n/navigation";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CommunityPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <CommunityContent />;
}

function CommunityContent() {
  const t = useTranslations("community");

  return (
    <div className="narrow my-16">
      <PixelTag color="yellow">{t("category")}</PixelTag>
      <h1>{t("title")}</h1>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <div className="my-8 flex gap-4">
        <Button href="https://discord.gg/arcprize" external>{t("joinDiscord")}</Button>
        <Button href="/leaderboard/community">{t("communityLeaderboard")}</Button>
      </div>
    </div>
  );
}
