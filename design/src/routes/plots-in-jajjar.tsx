import { createFileRoute } from "@tanstack/react-router";
import { CityLandingPage, getCityHead } from "@/components/site/CityLandingPage";

export const Route = createFileRoute("/plots-in-jajjar")({
  head: () => getCityHead("jajjar"),
  component: JajjarPage,
});

function JajjarPage() {
  return <CityLandingPage citySlug="jajjar" />;
}