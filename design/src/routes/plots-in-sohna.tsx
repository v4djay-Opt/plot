import { createFileRoute } from "@tanstack/react-router";
import { CityLandingPage, getCityHead } from "@/components/site/CityLandingPage";

export const Route = createFileRoute("/plots-in-sohna")({
  head: () => getCityHead("sohna"),
  component: SohnaPage,
});

function SohnaPage() {
  return <CityLandingPage citySlug="sohna" />;
}