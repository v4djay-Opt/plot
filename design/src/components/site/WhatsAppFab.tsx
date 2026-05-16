import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/919311122787"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg shadow-black/25 transition-transform hover:scale-110"
    >
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-40" />
      <MessageCircle className="relative size-7" />
    </a>
  );
}