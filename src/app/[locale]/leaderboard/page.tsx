import {setRequestLocale, getTranslations} from "next-intl/server";
import ScatterPlotWrapper from "@/components/leaderboard/ScatterPlotWrapper";
import leaderboardData from "@/data/leaderboard.json";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function LeaderboardPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations("leaderboard");
  const isZh = locale === "zh";

  const labels = {
    xAxis: isZh ? "每任务成本 (USD)" : "Cost per task (USD)",
    yAxis: isZh ? "得分" : "Score",
    tooltipModel: isZh ? "模型" : "Model",
    tooltipScore: isZh ? "得分" : "Score",
    tooltipCost: isZh ? "成本" : "Cost",
    download: t("downloadChart"),
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1>{t("title")}</h1>

      {/* D3 Scatter Plot */}
      <div className="my-8 overflow-x-auto">
        <ScatterPlotWrapper data={leaderboardData.entries} labels={labels} />
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs opacity-50">
            {isZh ? `最后更新: ${leaderboardData.lastUpdated}` : `Last updated: ${leaderboardData.lastUpdated}`}
          </span>
          <button className="button text-xs">{t("downloadChart")}</button>
        </div>
      </div>

      {/* Understanding */}
      <div className="my-8">
        <h3>{t("understandingTitle")}</h3>
        <p>{t("understandingP1")}</p>
        <p>{t("understandingP2")}</p>
        <h4>{t("interpretingTitle")}</h4>
        <h4>{t("verificationTitle")}</h4>
      </div>

      {/* Leaderboard Table */}
      <div className="my-8">
        <h3>{t("breakdownTitle")}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-2 px-3 text-left">#</th>
                <th className="py-2 px-3 text-left">Model</th>
                <th className="py-2 px-3 text-left">{isZh ? "提供者" : "Provider"}</th>
                <th className="py-2 px-3 text-left">{isZh ? "类型" : "Type"}</th>
                <th className="py-2 px-3 text-left">{isZh ? "得分" : "Score"}</th>
                <th className="py-2 px-3 text-left">{isZh ? "每任务成本" : "Cost/Task"}</th>
                <th className="py-2 px-3 text-left">{isZh ? "日期" : "Date"}</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.entries.map((entry) => (
                <tr key={entry.rank} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="py-2 px-3">{entry.rank}</td>
                  <td className="py-2 px-3 font-bold">{entry.model}</td>
                  <td className="py-2 px-3">{entry.provider}</td>
                  <td className="py-2 px-3">
                    <span className={`px-1.5 py-0.5 rounded-sm text-[10px] ${
                      entry.type === "Open"
                        ? "bg-[var(--green)]/20 text-[var(--green)]"
                        : "bg-[var(--blue)]/20 text-[var(--blue)]"
                    }`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="py-2 px-3">{(entry.score * 100).toFixed(1)}%</td>
                  <td className="py-2 px-3">${entry.costPerTask.toFixed(2)}</td>
                  <td className="py-2 px-3 opacity-50">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div className="my-8">
        <h4>{t("notesTitle")}</h4>
        <p>{t("note1")}</p>
        <p>{t("note2")}</p>
        <p>{t("note3")}</p>
      </div>
    </div>
  );
}
