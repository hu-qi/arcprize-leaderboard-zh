import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import PixelTag from "@/components/ui/PixelTag";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function ArcAgiPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <ArcAgiContent />;
}

function ArcAgiContent() {
  const t = useTranslations("arcAgi");

  return (
    <div>
      {/* Version Tabs */}
      <nav className="max-w-[1200px] mx-auto px-6 py-4 flex gap-4 border-b border-white/[0.08]">
        <Link href="/arc-agi" className="text-xs uppercase tracking-wider text-[var(--yellow)] border-b-2 border-[var(--yellow)] pb-2">
          Series
        </Link>
        <Link href="/arc-agi/1" className="text-xs uppercase tracking-wider opacity-60 hover:opacity-100 pb-2">
          ARC-AGI-1
        </Link>
        <Link href="/arc-agi/2" className="text-xs uppercase tracking-wider opacity-60 hover:opacity-100 pb-2">
          ARC-AGI-2
        </Link>
        <Link href="/arc-agi/3" className="text-xs uppercase tracking-wider opacity-60 hover:opacity-100 pb-2">
          ARC-AGI-3
        </Link>
      </nav>

      {/* Header */}
      <div className="narrow my-16">
        <PixelTag color="yellow">{t("category")}</PixelTag>
        <h1>{t("title")}</h1>
        <h3>{t("subtitle")}</h3>
      </div>

      {/* Content */}
      <div className="narrow my-16">
        <h3>{t("measureTitle")}</h3>
        <p>{t("measureDesc")}</p>
        <p><em>{t("measureQuote")}</em></p>

        <hr className="border-white/10 my-8" />

        <h2>{t("definingAgiTitle")}</h2>
        <p>{t("definingAgiP1")}</p>
        <p>{t("definingAgiP2")}</p>
        <p>{t("definingAgiP3")}</p>
        <p>{t("definingAgiP4")}</p>
        <p>{t("definingAgiP5")}</p>
        <p><em>{t("definingAgiP6")}</em></p>
        <p>{t("definingAgiP7")}</p>
        <p><strong>{t("definingAgiP8")}</strong></p>
        <p>{t("definingAgiP9")}</p>
        <p><em>{t("definingAgiP10")}</em></p>
        <blockquote className="border-l-2 border-[var(--yellow)] pl-4 my-6 opacity-80">
          <p className="text-sm">{t("definingAgiFormal")}</p>
        </blockquote>
        <p>{t("definingAgiP11")}</p>
        <p><strong>{t("definingAgiP12")}</strong></p>

        <hr className="border-white/10 my-8" />

        <h2>{t("coreKnowledgeTitle")}</h2>
        <p>{t("coreKnowledgeP1")}</p>
        <p>{t("coreKnowledgeP2")}</p>
        <p>{t("coreKnowledgeP3")}</p>
        <p>{t("coreKnowledgeP4")}</p>
        <p>{t("coreKnowledgeP5")}</p>
        <p><em>{t("coreKnowledgeP6")}</em></p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>{t("coreKnowledgeLi1")}</li>
          <li>{t("coreKnowledgeLi2")}</li>
        </ul>
        <p>{t("coreKnowledgeP7")}</p>

        <hr className="border-white/10 my-8" />

        <h2>{t("designTitle")}</h2>
        <h3>{t("designSubtitle")}</h3>
        <p>{t("designP1")}</p>
        <p>{t("designP2")}</p>
        <p>{t("designP3")}</p>
        <p>{t("designP4")}</p>
        <p>{t("designP5")}</p>
      </div>

      {/* YouTube Embed */}
      <div className="max-w-[800px] mx-auto px-6 my-12">
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/2W5D6J8om0c"
          title="ARC Benchmark Origins"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-sm"
        />
      </div>
    </div>
  );
}
