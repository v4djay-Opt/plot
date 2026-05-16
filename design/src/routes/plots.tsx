import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plots")({
  component: PlotsLayout,
});

function PlotsLayout() {
  return <Outlet />;
}