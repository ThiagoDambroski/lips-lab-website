# SEO public folder pass

Primary canonical domain used: https://lips-lab.com

Files added or updated:

- robots.txt
- sitemap.xml
- manifest.webmanifest
- _redirects
- _headers

Important notes:

- The Netlify subdomain and www domain redirect to the primary domain.
- React routes are preserved with the SPA fallback rule.
- /cart and /checkout are blocked in robots.txt because they are not useful search landing pages.
- sitemap.xml uses the current route names in the project, including /experiencie and /giftCard.
- If the route names are changed later to /experience and /gift-card, update sitemap.xml and internal links together.
