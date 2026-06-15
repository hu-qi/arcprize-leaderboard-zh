import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import PixelTag from "@/components/ui/PixelTag";
import Button from "@/components/ui/Button";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function AboutPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

const teamMembers = [
  {name: "François Chollet", role: "Co-founder, Board Member, Creator of ARC-AGI", roleZh: "联合创始人、董事会成员、ARC-AGI 创造者", img: "/media/images/about-francois-chollet.jpg"},
  {name: "Mike Knoop", role: "Co-founder, Board Member", roleZh: "联合创始人、董事会成员", img: "/media/images/about-mike-knoop.jpg"},
  {name: "Greg Kamradt", role: "President, Board Member", roleZh: "总裁、董事会成员", img: "/media/images/about-greg-kamradt.jpg"},
  {name: "Bryan Landers", role: "Founding Team, Design & Strategy", roleZh: "创始团队成员、设计与战略", img: "/media/images/about-bryan-landers.jpg"},
  {name: "Lauren Wagner", role: "Policy & Growth", roleZh: "政策与增长", img: "/media/images/about-lauren-wagner.jpg"},
  {name: "Hunter Henry", role: "Benchmark Design", roleZh: "基准测试设计", img: "/media/images/about-hunter-henry.jpg"},
  {name: "Derek Smith", role: "Engineering", roleZh: "工程", img: "/media/images/about-derek-smith.png"},
];

function AboutContent() {
  const t = useTranslations("about");
  const locale = typeof window !== "undefined" ? "zh" : "zh";

  return (
    <div>
      {/* Header */}
      <div className="narrow my-16">
        <PixelTag color="orange">{t("category")}</PixelTag>
        <h1>{t("title")}</h1>
        <h3>{t("subtitle")}</h3>
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>{t("p3")}</p>
        <p>{t("p4")}</p>
        <p>{t("p5")}</p>
        <p>{t("p6")}</p>
        <p>
          {t("p7Before")}
          <Link href="/donate" className="yellow underline">{t("donatePage")}</Link>
          {t("p7Middle")}
          <a href="mailto:team@arcprize.org" className="yellow underline">team@arcprize.org</a>
          {t("p7After")}
        </p>
      </div>

      {/* Team */}
      <div className="max-w-[1200px] mx-auto px-6 my-16">
        <h2>{t("teamTitle")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <img
                src={member.img}
                alt={member.name}
                className="w-full aspect-square object-cover rounded-sm mb-2"
              />
              <p className="text-sm font-bold">{member.name}</p>
              <p className="text-xs opacity-70">{member.roleZh}</p>
            </div>
          ))}
        </div>
        <p className="mt-8">
          {t("wantToJoin")}{" "}
          <Link href="/jobs" className="yellow underline">
            {t("viewOpenRoles")}
          </Link>
        </p>
      </div>
    </div>
  );
}
