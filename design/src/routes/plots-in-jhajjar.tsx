import { createFileRoute } from "@tanstack/react-router";
import { CityLandingPage, getCityHead } from "@/components/site/CityLandingPage";

export const Route = createFileRoute("/plots-in-jhajjar")({
  head: () => getCityHead("jhajjar"),
  component: JhajjarPage,
});

function JhajjarPage() {
  return <CityLandingPage citySlug="jhajjar" />;
}