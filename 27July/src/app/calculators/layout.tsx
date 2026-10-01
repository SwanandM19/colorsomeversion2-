import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paint Calculators",
  description:
    "Four focused tools to estimate quantity, cost and materials before you buy — built around your actual project details, not guesswork.",
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
