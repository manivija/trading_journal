import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
      return res.status(500).json({ status: "error", error: "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY" });
    }

    const r = await fetch(`${url}/auth/v1/settings`, { headers: { apikey: key } });

    return res.status(r.ok ? 200 : 502).json({
      status: r.ok ? "alive" : "bad_gateway",
      supabaseStatus: r.status,
    });
  } catch (e) {
    return res.status(500).json({ status: "error", error: String(e) });
  }
}
