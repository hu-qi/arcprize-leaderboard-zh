import {setRequestLocale, getTranslations} from "next-intl/server";
import ShellPuzzleWrapper from "@/components/tasks/ShellPuzzleWrapper";

type Props = {
  params: Promise<{locale: string; id: string}>;
};

export default async function TaskPage({params}: Props) {
  const {locale, id} = await params;
  setRequestLocale(locale);

  const t = await getTranslations("tasks");
  const isZh = locale === "zh";

  const labels = {
    input: t("input"),
    output: t("output"),
    example: t("example"),
    start: t("start"),
    reset: t("reset"),
    submit: t("submit"),
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1>{isZh ? `任务: ${id.toUpperCase()}` : `Task: ${id.toUpperCase()}`}</h1>
      <p className="my-4 opacity-70">
        {isZh
          ? "通过观察示例输入/输出对来推断变换规则，然后将规则应用到测试输入上。"
          : "Observe the example input/output pairs to infer the transformation rule, then apply it to the test input."}
      </p>

      <div className="my-8">
        <ShellPuzzleWrapper taskId={id} labels={labels} />
      </div>
    </div>
  );
}
