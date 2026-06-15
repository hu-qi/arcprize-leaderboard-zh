import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import PixelTag from "@/components/ui/PixelTag";
import Button from "@/components/ui/Button";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <div className="pt-0">
      {/* ===== Hero Section ===== */}
      <div
        className="relative overflow-hidden bg-cover py-16 md:py-24"
        style={{
          backgroundImage: "url('/media/images/Ls20Human-2.gif')",
          backgroundPosition: "50% 50%",
        }}
      >
        <Link
          href="/tasks/ls20"
          className="pixel absolute top-4 right-0 z-20 block bg-[var(--yellow)] px-4 pt-1.5 pb-1 text-[10px] uppercase text-[var(--offblack)] no-underline opacity-80 shadow-[0_4px_14px_rgba(0,0,0,0.28)] transition-opacity hover:opacity-100"
        >
          {t("playArcAgi3")}
        </Link>
        <div className="flex flex-col justify-center max-w-[800px] mx-auto px-[24px]">
          <div className="pointer-events-none absolute inset-0 bg-black/70" />
          <div className="relative z-1">
            <h1 className="mb-4">{t("heroTitle")}</h1>
            <p className="max-w-[600px] text-lg mb-8">
              {t("heroSubtitleBefore")}
              <span className="yellow">{t("heroHighlight")}</span>
              {t("heroSubtitleAfter")}
            </p>
            <p className="flex items-center gap-4">
              <Button
                href="https://arcprize.kit.com/bc80575d89"
                variant="primary"
              >
                {t("enterArcPrize")}
              </Button>
              <span className="text-sm">{t("nowInPrizes")}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ===== Trusted By Section ===== */}
      <section className="my-8">
        <h4 className="text-center">{t("trustedByTitle")}</h4>
        <div className="mx-auto my-8 flex flex-nowrap items-center justify-between gap-4 sm:justify-center sm:gap-x-12">
          <img
            src="/media/images/logo-openai.png"
            alt="OpenAI logo"
            className="h-4 w-auto object-contain sm:h-6"
          />
          <img
            src="/media/images/logo-google.png"
            alt="Google logo"
            className="h-4 w-auto object-contain sm:h-6"
          />
          <img
            src="/media/images/logo-xai.png"
            alt="xAI logo"
            className="h-4 w-auto object-contain sm:h-6"
          />
          <img
            src="/media/images/logo-anthropic.png"
            alt="Anthropic logo"
            className="h-3 w-auto object-contain sm:h-4"
          />
        </div>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-stretch gap-6 min-[900px]:grid-cols-4 min-[450px]:grid-cols-2">
          <figure className="card-bg m-0 h-full rounded-sm p-4">
            <img
              src="/media/images/arc-tweet-sam.jpg"
              alt="Sam Altman tweet about ARC Prize"
              className="h-[145px] w-full rounded-[4px] object-cover object-top"
            />
          </figure>
          <figure className="card-bg m-0 h-full rounded-sm p-4">
            <img
              src="/media/images/arc-tweet-demis.jpg"
              alt="Demis Hassabis tweet about ARC Prize"
              className="h-[153px] w-full rounded-[4px] object-cover object-top"
            />
          </figure>
          <figure className="card-bg m-0 h-full rounded-sm p-4">
            <img
              src="/media/images/arc-tweet-sundar-2.jpg"
              alt="Sundar Pichai tweet about ARC Prize"
              className="h-[153px] w-full rounded-[4px] object-cover object-top"
            />
          </figure>
          <figure className="card-bg m-0 h-full rounded-sm p-4">
            <img
              src="/media/images/arc-tweet-elon.jpg"
              alt="Elon Musk tweet about ARC Prize"
              className="h-[145px] w-full rounded-[4px] object-cover object-top"
            />
          </figure>
        </div>
      </section>

      {/* ===== Benchmarks Section ===== */}
      <section className="narrow my-16">
        <h2>{t("benchmarksTitle")}</h2>
        <p>{t("benchmarksDesc1")}</p>
        <p>{t("benchmarksDesc2")}</p>
        <img
          src="/media/images/frontier-arc.png"
          alt="Pinpointing precise changes in AI capabilities"
          className="my-8"
        />
        <h2>{t("newIdeasTitle")}</h2>
        <p>{t("newIdeasDesc1")}</p>
        <p>{t("newIdeasDesc2")}</p>
        <p>{t("newIdeasDesc3")}</p>
        <p>{t("arcAgi3Intro")}</p>
        <Link href="/tasks/vc33" title="View task vc33">
          <img
            src="/media/images/home-human-ai-gap.png"
            alt="The gap between human and AI intelligence"
            className="my-8"
          />
        </Link>
      </section>

      {/* ===== Leaderboard Preview ===== */}
      <div className="mx-auto grid max-w-[1200px] items-start gap-6 my-8 px-6 md:grid-cols-2">
        <div>
          <Link
            href="/leaderboard"
            className="leaderboard-image-link relative block"
            title="ARC-AGI Verified Leaderboard"
          >
            <span className="button home-leaderboard-button pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-xs">
              {t("viewLeaderboard")}
            </span>
            <img
              src="/media/images/arc-home-leaderboard.jpg"
              alt="ARC-AGI Verified Leaderboard"
            />
          </Link>
        </div>
        <div className="self-stretch flex flex-col justify-center">
          <PixelTag color="yellow">{tc("research")}</PixelTag>
          <h2 className="mt-0">{t("leaderboardSection")}</h2>
          <p>{t("leaderboardDesc")}</p>
          <div>
            <Button href="/arc-agi">{t("getStarted")}</Button>
          </div>
        </div>
      </div>

      {/* ===== Prize Preview ===== */}
      <div className="mx-auto grid max-w-[1200px] items-start gap-6 my-8 px-6 md:grid-cols-2">
        <div className="bg-black width-full">
          <img
            src="/media/images/home-arc-prize-2026.jpg"
            alt="Over $2M in prize. 3 tracks. Get started."
          />
        </div>
        <div className="self-stretch flex flex-col justify-center">
          <PixelTag color="green">{tc("prize")}</PixelTag>
          <h2 className="mt-0">{t("prizeSection")}</h2>
          <p>{t("prizeDesc")}</p>
          <div>
            <Button href="/competitions/2026">{t("winPrizes")}</Button>
          </div>
        </div>
      </div>

      {/* ===== Founder Message ===== */}
      <div className="mx-auto grid max-w-[1200px] items-start gap-6 my-8 mb-0 px-6 md:grid-cols-2">
        <div className="bg-black width-full">
          <img
            src="/media/images/nyt-mk-fc-2.jpg"
            alt="ARC Prize Co-Founders Mike Knoop and François Chollet"
          />
        </div>
        <div className="self-stretch flex flex-col justify-center">
          <PixelTag color="orange">{tc("foundation")}</PixelTag>
          <h2 className="mt-0">{t("founderSection")}</h2>
          <p>{t("founderQuote")}</p>
          <p className="text-xs leading-[2]">
            Mike Knoop (Zapier,{" "}
            <a href="https://ndea.com" target="_blank" rel="noreferrer">
              Ndea
            </a>
            ) &amp; François Chollet (Keras, Ndea, ARC-AGI)
          </p>
          <div>
            <Button href="/donate">{t("makeDonation")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
