import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/site";
import { LocaleSwitcher } from "./LocaleSwitcher";

const NAV_ITEMS = [
  { href: "/topik" as const, key: "topik" as const },
  { href: "/practice" as const, key: "practice" as const },
  { href: "/writing" as const, key: "writing" as const },
  { href: "/community" as const, key: "community" as const },
  { href: "/about" as const, key: "about" as const },
];

export async function Header() {
  const t = await getTranslations("Nav");

  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-navy">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy text-xs text-paper">
            TC
          </span>
          <span>{SITE_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-ink-soft md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-navy"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <LocaleSwitcher />
      </div>
      <nav className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-4 pb-3 text-sm text-ink-soft md:hidden sm:px-6">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {t(item.key)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
