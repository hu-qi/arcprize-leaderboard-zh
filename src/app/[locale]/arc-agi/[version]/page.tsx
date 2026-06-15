import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

type Props = {
  params: Promise<{locale: string; version: string}>;
};

const versionData: Record<string, {title: string; titleZh: string; desc: string; descZh: string}> = {
  "1": {
    title: "ARC-AGI-1",
    titleZh: "ARC-AGI-1",
    desc: "The original ARC benchmark. A static reasoning benchmark measuring passive fluid intelligence through grid transformation tasks.",
    descZh: "原始 ARC 基准测试。通过网格变换任务衡量被动流体智能的静态推理基准测试。",
  },
  "2": {
    title: "ARC-AGI-2",
    titleZh: "ARC-AGI-2",
    desc: "An updated version with improved task design and efficiency measurement. Introduced the concept of cost-per-task for evaluating AI systems.",
    descZh: "改进任务设计和效率测量的更新版本。引入了每任务成本概念来评估 AI 系统。",
  },
  "3": {
    title: "ARC-AGI-3",
    titleZh: "ARC-AGI-3",
    desc: "The latest version measuring agentic intelligence. AI agents must adapt on the fly to novel interactive environments. Currently unbeaten.",
    descZh: "最新版本，衡量智能体智能。AI 智能体必须在全新的交互环境中即时适应。目前未被攻破。",
  },
};

export default async function ArcAgiVersionPage({params}: Props) {
  const {locale, version} = await params;
  setRequestLocale(locale);

  const data = versionData[version];
  if (!data) return <div>Version not found</div>;

  return (
    <div>
      {/* Version Tabs */}
      <nav className="max-w-[1200px] mx-auto px-6 py-4 flex gap-4 border-b border-white/[0.08]">
        <Link href="/arc-agi" className="text-xs uppercase tracking-wider opacity-60 hover:opacity-100 pb-2">
          Series
        </Link>
        <Link href="/arc-agi/1" className={`text-xs uppercase tracking-wider pb-2 ${version === "1" ? "text-[var(--yellow)] border-b-2 border-[var(--yellow)]" : "opacity-60 hover:opacity-100"}`}>
          ARC-AGI-1
        </Link>
        <Link href="/arc-agi/2" className={`text-xs uppercase tracking-wider pb-2 ${version === "2" ? "text-[var(--yellow)] border-b-2 border-[var(--yellow)]" : "opacity-60 hover:opacity-100"}`}>
          ARC-AGI-2
        </Link>
        <Link href="/arc-agi/3" className={`text-xs uppercase tracking-wider pb-2 ${version === "3" ? "text-[var(--yellow)] border-b-2 border-[var(--yellow)]" : "opacity-60 hover:opacity-100"}`}>
          ARC-AGI-3
        </Link>
      </nav>

      <div className="narrow my-16">
        <h1>{data.titleZh}</h1>
        <p className="text-lg my-4">{data.descZh}</p>
        <div className="mt-8">
          <Link href="/leaderboard" className="button">
            {locale === "zh" ? "查看排行榜" : "View Leaderboard"}
          </Link>
        </div>
      </div>
    </div>
  );
}
