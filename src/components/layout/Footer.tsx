import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-line bg-navy-deep text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <p className="font-semibold">{SITE_NAME}</p>
          <p className="max-w-xl text-sm text-paper/80">{t("tagline")}</p>
          <p className="max-w-2xl text-xs leading-6 text-paper/70">{t("disclaimer")}</p>
          <p className="max-w-2xl text-xs leading-6 text-paper/70">{t("disclaimerKo")}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm md:items-end">
          <Link className="hover:text-accent-soft" href="/legal/terms">
            {t("terms")}
          </Link>
          <Link className="hover:text-accent-soft" href="/legal/privacy">
            {t("privacy")}
          </Link>
          <Link className="hover:text-accent-soft" href="/legal/disclaimer">
            {t("disclaimerLink")}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-paper/60">
        {t("copyright", { year })}
      </div>
    </footer>
  );
}
