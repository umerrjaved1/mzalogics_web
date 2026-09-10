import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { footerNav, site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white text-navy" data-nav-surface="light">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">{site.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            AI-driven or fully hand-crafted delivery — your call, same standards.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-navy transition hover:bg-paper"
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
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <p className="text-[11px] uppercase tracking-wider">Our Email</p>
              <a href={`mailto:${site.email}`} className="text-navy">
                {site.email}
              </a>
            </li>
            <li>
              <p className="text-[11px] uppercase tracking-wider">Our Phone</p>
              <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
            </li>
            <li>
              <p className="text-[11px] uppercase tracking-wider">WhatsApp</p>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                Message us
              </a>
            </li>
            <li>
              <p className="text-[11px] uppercase tracking-wider">Our Address</p>
              {site.locations.map((location) => (
                <span key={location.label} className="block">
                  {location.address}
                </span>
              ))}
            </li>
            <li>
              <p className="text-[11px] uppercase tracking-wider">Hours</p>
              <span>{site.hours}</span>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-3 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/faq" className="hover:text-navy">
            FAQ
          </Link>
          <Link href="/privacy" className="hover:text-navy">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-navy">
            Terms
          </Link>
          <Link href="/sitemap.xml" className="hover:text-navy">
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
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-muted">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:text-navy">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
