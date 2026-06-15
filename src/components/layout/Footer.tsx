import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

type Props = {
  locale: string;
};

export default function Footer({locale}: Props) {
  const t = useTranslations("footer");

  return (
    <footer className="mx-auto max-w-[1200px] px-6 py-4">
      <div className="footer-top grid gap-8 md:grid-cols-2 md:items-start">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="logo-container">
            <Link href="/">
              <img
                src="/media/images/arc-prize-logo-secret.svg"
                className="h-8 w-auto"
                alt="ARC Prize"
              />
            </Link>
          </div>
          <div className="copyright-text hidden text-xs md:flex">
            © 2026 ARC Prize, Inc.
            <Link href="/privacy">{t("privacy")}</Link>
            <Link href="/terms">{t("terms")}</Link>
            <Link href="/policy">{t("testingPolicy")}</Link>
          </div>
        </div>
        <ul className="footer-social-links flex justify-end md:justify-self-end">
          <li>
            <a
              href="https://arcprize.kit.com/bc80575d89"
              aria-label="Newsletter"
            >
              <img src="/media/images/icon-email.svg" alt="" />
              <span>{t("newsletter")}</span>
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/9b77dPAmcA"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
            >
              <img src="/media/images/icon-discord.svg" alt="" />
              <span>{t("discord")}</span>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/arcprize"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <img src="/media/images/icon-x.svg" alt="" />
              <span>{t("twitter")}</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UC_rdrp-QkrZn-ce9uCE-0EA"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <img src="/media/images/icon-youtube.svg" alt="" />
              <span>{t("youtube")}</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/arcprize"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <img src="/media/images/icon-github.svg" alt="" />
              <span>{t("github")}</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="copyright-text pt-2 text-xs md:hidden">
        © 2026 ARC Prize, Inc.
        <Link href="/privacy">{t("privacy")}</Link>
        <Link href="/terms">{t("terms")}</Link>
        <Link href="/policy">{t("testingPolicy")}</Link>
      </div>
    </footer>
  );
}
