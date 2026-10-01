import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colour Visualizer",
  description:
    "Pick a room, choose any Colorsome shade, and preview it applied to the wall — with the room's own light and shadow kept intact.",
};

export default function ColourVisualizerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
