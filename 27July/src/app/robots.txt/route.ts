import { getRobotsTxt } from "../robot";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET() {
  return new Response(getRobotsTxt(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
