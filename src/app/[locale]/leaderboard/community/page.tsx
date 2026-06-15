import {setRequestLocale, getTranslations} from "next-intl/server";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CommunityLeaderboardPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const isZh = locale === "zh";

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1>{isZh ? "社区排行榜" : "Community Leaderboard"}</h1>
      <p className="my-4 opacity-70">
        {isZh
          ? "社区提交的 ARC-AGI 评估结果。这些结果未经官方验证。"
          : "Community-submitted ARC-AGI evaluation results. These results are not officially verified."}
      </p>
      <div className="overflow-x-auto my-8">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-2 px-3 text-left">#</th>
              <th className="py-2 px-3 text-left">Model</th>
              <th className="py-2 px-3 text-left">Score</th>
              <th className="py-2 px-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5 opacity-50">
              <td className="py-2 px-3" colSpan={4}>
                {isZh ? "社区排行榜数据加载中..." : "Community leaderboard data loading..."}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
