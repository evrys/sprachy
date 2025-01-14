import { env } from "$lib/server/env"
import { sprachdex } from "$lib/sprachdex"
import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async () => {
  const baseUrl = env.FRONTEND_BASE_URL

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  }

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  >
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
${sprachdex.publishedPatterns
      .map(pattern =>
        `
<url>
  <loc>${baseUrl}/${pattern.slug}</loc>
  <changefreq>daily</changefreq>
  <priority>0.7</priority>
</url>
`
      )
      .join('')}
  </urlset>`
  return new Response(
    body,
    { headers }
  )
}