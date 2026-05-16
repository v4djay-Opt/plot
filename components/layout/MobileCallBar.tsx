"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export default function MobileCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.5;
      setVisible(scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="tel:+919311122787"
        className="flex h-14 items-center justify-center gap-2 bg-accent font-semibold text-accent-foreground shadow-lg"
      >
        <Phone className="size-5" />
        <span>Call for Free Site Visit</span>
      </a>
    </div>
  );
}
