import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert Assistance",
  description:
    "Our paint experts provide personalized guidance for product selection, shade recommendations, and professional execution. From consultation to completion, we're with you every step.",
};

export default function AssistanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
