import { ArrowUpRight, Mail, MessageCircle, Send } from 'lucide-react';
import { EDITOR_PROFILE } from '@/src/data/projects';

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-white/10 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <p className="font-mono text-xs tracking-[0.14em] text-[#FFB627] uppercase">
          10 / Booking &amp; Inquiries
        </p>

        <h2
          id="contact-heading"
          className="mt-4 max-w-5xl font-display text-[clamp(2.5rem,7.5vw,6.75rem)] font-extrabold leading-[0.93] tracking-tight text-[#F5F3EE] text-balance"
        >
          {EDITOR_PROFILE.contactHeadline}
        </h2>

        {/* Very Large Email Link */}
        <div className="mt-10 border-y border-white/15 py-6 sm:py-8">
          <a
            href={`mailto:${EDITOR_PROFILE.email}`}
            className="group inline-flex min-h-[48px] max-w-full items-center gap-3 font-display text-[clamp(1.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#FFB627] break-all transition-colors hover:text-[#F5F3EE] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB627]"
          >
            <Mail className="h-6 w-6 shrink-0 sm:h-9 sm:w-9" aria-hidden="true" />
            <span>{EDITOR_PROFILE.email}</span>
          </a>
        </div>

        {/* WhatsApp & Telegram Pill Buttons + Social Links */}
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={EDITOR_PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#FFB627] px-6 py-3 font-mono text-xs font-medium tracking-wider text-[#0A0A0F] uppercase transition-colors hover:bg-[#ffc64d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={EDITOR_PROFILE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full border border-white/25 px-6 py-3 font-mono text-xs font-medium tracking-wider text-[#F5F3EE] uppercase transition-colors hover:border-[#FFB627] hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Telegram</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Social links" className="flex flex-wrap items-center gap-6">
            {EDITOR_PROFILE.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs tracking-wider text-[#F5F3EE]/70 uppercase transition-colors hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
              >
                <span>{social.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
