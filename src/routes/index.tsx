import { createFileRoute } from "@tanstack/react-router";
import { VerifiedAwardDashboard } from "@/components/verified-award-dashboard";

export const Route = createFileRoute("/")({
  component: VerifiedAwardDashboard,
});
