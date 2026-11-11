import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { footerNav, site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="night-panel overflow-hidden text-white" data-nav-surface="dark">
      {/* A hairline of brand colour where the page hands over to the footer. */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-accent-2/70 to-transparent"
      />
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Logo invert />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">{site.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">
            AI-driven or fully hand-crafted delivery — your call, same standards.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white transition hover:border-accent-2/60 hover:bg-white/10"
              >
                {social.label}
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Company" items={footerNav.company} />
        <FooterColumn title="Solutions" items={footerNav.solutions} />
        <FooterColumn title="Resources" items={footerNav.resources} />

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li>
              <p className="text-xs uppercase tracking-wider text-white/45">Our Email</p>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-[24px] items-center text-white transition hover:text-accent-2">
                {site.email}
              </a>
            </li>
            <li>
              <p className="text-xs uppercase tracking-wider text-white/45">Our Phone</p>
              <a href={`tel:${site.phoneHref}`} className="inline-flex min-h-[24px] items-center transition hover:text-accent-2">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <p className="text-xs uppercase tracking-wider text-white/45">WhatsApp</p>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[24px] items-center transition hover:text-accent-2"
              >
                Message us
              </a>
            </li>
            <li>
              <p className="text-xs uppercase tracking-wider text-white/45">Our Address</p>
              {site.locations.map((location) => (
                <span key={location.label} className="block">
                  {location.address}
                </span>
              ))}
            </li>
            <li>
              <p className="text-xs uppercase tracking-wider text-white/45">Hours</p>
              <span>{site.hours}</span>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-3 border-t border-white/10 pt-6 pb-24 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between md:pb-6">
        <p>
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/faq" className="inline-flex min-h-[24px] items-center transition hover:text-accent-2">
            FAQ
          </Link>
          <Link href="/privacy" className="inline-flex min-h-[24px] items-center transition hover:text-accent-2">
            Privacy
          </Link>
          <Link href="/terms" className="inline-flex min-h-[24px] items-center transition hover:text-accent-2">
            Terms
          </Link>
          <Link href="/sitemap.xml" className="inline-flex min-h-[24px] items-center transition hover:text-accent-2">
            Sitemap
          </Link>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-white/65">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="inline-flex min-h-[24px] items-center transition hover:text-accent-2">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
