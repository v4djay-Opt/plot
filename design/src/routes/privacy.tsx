import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy â€” PlotsGurgaon.in" },
      {
        name: "description",
        content:
          "Read how PlotsGurgaon.in collects, uses, and protects your personal information when you enquire about plots in Gurgaon, Sohna, and Jhajjar.",
      },
      { property: "og:title", content: "Privacy Policy â€” PlotsGurgaon.in" },
      {
        property: "og:description",
        content:
          "How PlotsGurgaon.in handles your data â€” collection, use, sharing, and your rights.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1B4332 0%, #2d6a4f 60%, #40916C 100%)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 text-primary-foreground md:px-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              Legal
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-primary-foreground/80">
              Last updated: January 2025
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-14 md:px-6">
          <div className="prose prose-neutral max-w-none space-y-8 text-muted-foreground">
            <div>
              <h2 className="font-display text-2xl font-bold text-primary">1. Introduction</h2>
              <p className="mt-2">
                PlotsGurgaon.in ("we", "us", "our") respects your privacy. This
                policy explains what information we collect when you visit our
                website or enquire about a plot, how we use it, and the choices
                you have.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-primary">2. Information We Collect</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Contact details you submit â€” name, phone number, email.</li>
                <li>Enquiry details â€” preferred location, budget, plot size.</li>
                <li>Technical data â€” IP address, browser type, pages visited.</li>
                <li>Cookies and similar technologies for analytics.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-primary">3. How We Use Your Information</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Respond to your enquiries and arrange site visits.</li>
                <li>Share matching plot listings and pricing updates.</li>
                <li>Improve our website, content, and services.</li>
                <li>Comply with legal and regulatory obligations.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-primary">4. Sharing of Information</h2>
              <p className="mt-2">
                We do not sell your personal data. We may share limited
                information with verified plot owners or developers to
                facilitate your enquiry, and with service providers who help us
                run our website. These parties are bound to handle your data
                confidentially.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-primary">5. Data Security</h2>
              <p className="mt-2">
                We use reasonable technical and organisational measures to
                protect your information. However, no method of transmission
                over the internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-primary">6. Your Rights</h2>
              <p className="mt-2">
                You may request access to, correction of, or deletion of your
                personal information. You can also opt out of marketing
                communications at any time by contacting us.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-primary">7. Cookies</h2>
              <p className="mt-2">
                Our website uses cookies to remember your preferences and
                analyse site traffic. You can disable cookies in your browser
                settings, though some parts of the site may not function as
                intended.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-primary">8. Contact Us</h2>
              <p className="mt-2">
                For any questions about this Privacy Policy or your data,
                contact us at{" "}
                <a href="mailto:info@plotsgurgaon.in" className="text-secondary underline">
                  info@plotsgurgaon.in
                </a>{" "}
                or call +91 93111 22787.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}