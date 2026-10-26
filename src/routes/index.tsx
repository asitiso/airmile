import { createFileRoute } from "@tanstack/react-router";
import { Finder } from "@/components/finder";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Finder />;
}
