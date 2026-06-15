import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import PixelTag from "@/components/ui/PixelTag";
import Button from "@/components/ui/Button";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function TasksPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <TasksContent />;
}

function TasksContent() {
  const t = useTranslations("tasks");

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <PixelTag color="yellow">{t("category")}</PixelTag>
      <h1>{t("title")}</h1>
      <p className="mb-8">{t("description")}</p>

      {/* Task table placeholder */}
      <div className="my-8">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-2 px-3 text-left">{t("taskId")}</th>
                <th className="py-2 px-3 text-left">{t("benchmark")}</th>
                <th className="py-2 px-3 text-left">{t("difficulty")}</th>
                <th className="py-2 px-3 text-left">{t("size")}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5 opacity-50">
                <td className="py-2 px-3">—</td>
                <td className="py-2 px-3">Task data loading...</td>
                <td className="py-2 px-3">—</td>
                <td className="py-2 px-3">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <Button href="/arc-agi">{t("exploreBenchmarks")}</Button>
      </div>
    </div>
  );
}
