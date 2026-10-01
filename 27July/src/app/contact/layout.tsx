import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have architectural questions or need bespoke deployment coordination? Reach out directly to our central assistance desks below.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
