import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME, SITE_URL } from "../config/site";
import { defaultSeo, getCanonicalUrl, seoByPath, type SeoConfig } from "../config/seo";

function upsertMeta(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertPropertyMeta(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertStructuredData(config: SeoConfig) {
  const id = "lipslab-structured-data";
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Amélia Rey Colaço, 14E",
      addressLocality: "Lisboa",
      postalCode: "1500-664",
      addressCountry: "PT",
    },
    description: config.description,
  });
}

export default function PageSeo({ config }: { config?: Partial<SeoConfig> }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const routeSeo = seoByPath[pathname] ?? defaultSeo;
    const pageSeo = { ...routeSeo, ...config };
    const canonicalUrl = getCanonicalUrl(pageSeo.path ?? pathname);

    document.documentElement.lang = "pt-PT";
    document.title = pageSeo.title;

    upsertMeta("description", pageSeo.description);
    upsertMeta("robots", pageSeo.noIndex ? "noindex, nofollow" : "index, follow");
    upsertMeta("viewport", "width=device-width, initial-scale=1, viewport-fit=cover");
    upsertMeta("theme-color", "#f9d1dc");

    upsertPropertyMeta("og:type", "website");
    upsertPropertyMeta("og:site_name", SITE_NAME);
    upsertPropertyMeta("og:title", pageSeo.title);
    upsertPropertyMeta("og:description", pageSeo.description);
    upsertPropertyMeta("og:url", canonicalUrl);

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", pageSeo.title);
    upsertMeta("twitter:description", pageSeo.description);

    upsertCanonical(canonicalUrl);
    upsertStructuredData(pageSeo);
  }, [config, pathname]);

  return null;
}
