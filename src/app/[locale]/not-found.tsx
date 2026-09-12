import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl text-navy">{SITE_NAME}</h1>
      <p className="mt-4 text-ink-soft">This page could not be found.</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-navy px-5 py-2.5 text-sm text-paper"
      >
        Go home
      </Link>
    </div>
  );
}
