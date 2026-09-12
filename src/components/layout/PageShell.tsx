import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  type BreadcrumbItem,
} from "@/lib/json-ld";

type PageShellProps = {
  locale: string;
  title: string;
  lead: string;
  breadcrumbs: BreadcrumbItem[];
  children?: React.ReactNode;
};

export function PageShell({
  locale,
  title,
  lead,
  breadcrumbs,
  children,
}: PageShellProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <JsonLd data={breadcrumbJsonLd(locale, breadcrumbs)} />
      <nav className="mb-6 text-sm text-ink-soft">
        <Link href="/" className="hover:text-navy">
          TOPIK Campus
        </Link>
        {breadcrumbs.map((crumb) => (
          <span key={crumb.path}>
            <span className="px-2">/</span>
            <Link href={crumb.path} className="hover:text-navy">
              {crumb.name}
            </Link>
          </span>
        ))}
      </nav>
      <h1 className="font-display text-4xl leading-tight text-navy">{title}</h1>
      <p className="mt-4 text-lg leading-8 text-ink-soft">{lead}</p>
      {children}
    </div>
  );
}
