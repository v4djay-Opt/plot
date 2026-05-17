import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, Clock, MapPin, User, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Rohit Singh â€” PlotsGurgaon.in" },
      {
        name: "description",
        content:
          "Contact Rohit Singh for plot enquiries, site visits, and pricing in Gurgaon, Sohna, and Jhajjar. Call, WhatsApp, or email â€” typical response in 2 hours.",
      },
      { property: "og:title", content: "Contact Rohit Singh â€” PlotsGurgaon.in" },
      {
        property: "og:description",
        content:
          "Reach Rohit Singh for plot enquiries, site visits, and pricing across Gurgaon, Sohna, and Jhajjar.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Enquiry sent! Rohit will reach out within 2 hours.");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section
        className="relative overflow-hidden border-b border-border"
      >
        <img
          src={heroBg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 opacity-15"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <h1 className="font-display text-4xl font-bold text-primary-foreground sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            Get in touch with Rohit Singh for plot enquiries, site visits, and pricing.
          </p>
        </div>
      </section>

      {/* Two-column */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left â€” Contact Info */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
              <div className="flex items-center gap-4">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="size-10" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">Rohit Singh</h2>
                  <p className="text-sm text-muted-foreground">Senior Property Consultant</p>
                </div>
              </div>

              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
                    <a href="tel:+919311122787" className="font-medium text-foreground hover:text-primary">
                      +91 93111 22787
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                    <a
                      href="https://wa.me/919311122787"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground hover:text-primary"
                    >
                      +91 93111 22787
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                    <a
                      href="mailto:info@plotsgurgaon.in"
                      className="font-medium text-foreground hover:text-primary"
                    >
                      info@plotsgurgaon.in
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Working Hours</p>
                    <p className="font-medium text-foreground">Monâ€“Sat, 9 AM â€“ 7 PM</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Office</p>
                    <p className="font-medium text-foreground">Gurgaon, Haryana</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 grid grid-cols-3 gap-2">
                <Button asChild variant="outline" className="h-11">
                  <a href="tel:+919311122787">
                    <Phone className="size-4" /> Call
                  </a>
                </Button>
                <Button
                  asChild
                  className="h-11 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  <a href="https://wa.me/919311122787" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" /> WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <a href="mailto:info@plotsgurgaon.in">
                    <Mail className="size-4" /> Email
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right â€” Form */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Send an Enquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us what you're looking for and we'll get back to you with shortlisted options.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input id="name" name="name" required maxLength={100} className="mt-1.5 h-11" />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    pattern="[0-9]{10}"
                    required
                    placeholder="10-digit mobile"
                    className="mt-1.5 h-11"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" name="email" type="email" maxLength={255} className="mt-1.5 h-11" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="location" className="text-sm font-medium">Location Interest</label>
                  <Select name="location">
                    <SelectTrigger id="location" className="mt-1.5 h-11">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gurgaon">Gurgaon</SelectItem>
                      <SelectItem value="sohna">Sohna</SelectItem>
                      <SelectItem value="jhajjar">Jhajjar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="budget" className="text-sm font-medium">Budget Range</label>
                  <Select name="budget">
                    <SelectTrigger id="budget" className="mt-1.5 h-11">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<50L">Under â‚¹50 Lakh</SelectItem>
                      <SelectItem value="50L-1Cr">â‚¹50 Lakh â€“ â‚¹1 Cr</SelectItem>
                      <SelectItem value="1-2Cr">â‚¹1 â€“ 2 Cr</SelectItem>
                      <SelectItem value="2-5Cr">â‚¹2 â€“ 5 Cr</SelectItem>
                      <SelectItem value="5Cr+">â‚¹5 Cr+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={1000}
                  placeholder="Tell us about your requirementsâ€¦"
                  className="mt-1.5"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="h-12 w-full rounded-md bg-secondary text-base font-semibold text-secondary-foreground hover:bg-secondary/90"
              >
                {submitting ? "Sendingâ€¦" : "Send Enquiry"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                We typically respond within 2 hours
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
            Quick Links
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "View Gurgaon Plots", to: "/plots-in-gurgaon" as const },
              { label: "View Sohna Plots", to: "/plots-in-sohna" as const },
              { label: "View Jhajjar Plots", to: "/plots-in-jhajjar" as const },
            ].map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group flex items-center justify-between rounded-2xl border border-border bg-background p-6 transition-all hover:border-secondary hover:shadow-md"
              >
                <span className="font-display text-base font-semibold text-foreground">{c.label}</span>
                <ArrowRight className="size-5 text-secondary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
            <a
              href="https://wa.me/919311122787?text=Hi%20Rohit%2C%20I%27d%20like%20to%20book%20a%20site%20visit."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-border bg-background p-6 transition-all hover:border-secondary hover:shadow-md"
            >
              <span className="font-display text-base font-semibold text-foreground">Book Site Visit</span>
              <ArrowRight className="size-5 text-secondary transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}