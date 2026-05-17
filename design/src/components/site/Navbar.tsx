import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", to: "/" as const },
  { label: "All Plots", to: "/plots" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "Contact", to: "/contact" as const },
];

const cityLinks = [
  { label: "Gurgaon", to: "/plots-in-gurgaon" as const },
  { label: "Sohna", to: "/plots-in-sohna" as const },
  { label: "Jhajjar", to: "/plots-in-jhajjar" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top utility bar */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs">
          <p className="tracking-wide opacity-90">
            RERA Registered Â· Best Price Guaranteed Â· Free Site Visits
          </p>
          <div className="flex items-center gap-5">
            <a href="tel:+919311122787" className="inline-flex items-center gap-1.5 opacity-90 transition hover:opacity-100">
              <Phone className="size-3.5" /> +91 93111 22787
            </a>
            <span className="opacity-70">Monâ€“Sat Â· 9 AM â€“ 7 PM</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "w-full border-b bg-card/95 backdrop-blur transition-all",
          scrolled ? "border-border shadow-sm" : "border-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground shadow-sm">
              P
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold tracking-tight text-primary">
                PlotsGurgaon<span className="text-secondary">.in</span>
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Premium Land Â· Trusted Deals
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="relative rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Home
            </Link>
            <Link
              to="/plots"
              className="relative rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              All Plots
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/75 outline-none transition-colors hover:text-primary data-[state=open]:text-primary">
                Location <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                {cityLinks.map((c) => (
                  <DropdownMenuItem key={c.to} asChild>
                    <Link to={c.to} className="cursor-pointer">
                      {c.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/blog"
              className="relative rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="relative rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              className="hidden rounded-full bg-secondary px-5 text-secondary-foreground shadow-sm hover:bg-secondary/90 md:inline-flex"
            >
              <a href="https://wa.me/919311122787" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                Chat Now
              </a>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="mt-8 flex flex-col gap-1">
                  {links.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                      activeProps={{ className: "bg-muted text-primary" }}
                    >
                      {l.label}
                    </Link>
                  ))}
                  <div className="mt-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Location
                  </div>
                  {cityLinks.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                      activeProps={{ className: "bg-muted text-primary" }}
                    >
                      {c.label}
                    </Link>
                  ))}
                  <Button
                    asChild
                    className="mt-4 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    <a href="https://wa.me/919311122787" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-4" />
                      Chat Now
                    </a>
                  </Button>
                  <a
                    href="tel:+919311122787"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    <Phone className="size-4" /> +91 93111 22787
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}