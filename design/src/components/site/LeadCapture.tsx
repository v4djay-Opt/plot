import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function LeadCapture() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks! Rohit will call you back shortly.");
    }, 600);
  };

  return (
    <section id="contact" className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Get In Touch
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Interested in a Plot? Get a Free Callback.
          </h2>
          <p className="mt-4 max-w-md text-primary-foreground/80">
            Tell us where you want to invest. Rohit Singh will personally call you within
            business hours with shortlisted options.
          </p>
          <a
            href="https://wa.me/919311122787"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20"
          >
            <MessageCircle className="size-5 text-accent" />
            Or WhatsApp us directly
          </a>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-2xl bg-card p-6 text-foreground shadow-2xl shadow-black/20 md:p-8"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="name">Name</label>
              <Input id="name" name="name" placeholder="Your full name" required className="mt-1.5 h-11" />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="phone">Phone Number</label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                required
                className="mt-1.5 h-11"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="location">Location Interest</label>
              <Select name="location">
                <SelectTrigger id="location" className="mt-1.5 h-11">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gurgaon">Gurgaon</SelectItem>
                  <SelectItem value="sohna">Sohna</SelectItem>
                  <SelectItem value="jajjar">Jajjar</SelectItem>
                  <SelectItem value="any">Open to suggestions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="h-12 w-full rounded-md bg-accent text-base font-semibold text-accent-foreground hover:bg-accent/90"
            >
              {submitting ? "Sending…" : "Request Callback"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}