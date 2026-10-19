import fs from "node:fs";
import path from "node:path";

const BASE_URL =
  "https://nandu-pg.nandu-pg.workers.dev";

const PROPERTY_PAGES = [
  {
    slug: "ashwamedha-mens-pg-hitec-city",
    title:
      "Campus Ashwamedha Men's PG in HITEC City | Nandu PG",
    description:
      "Nandu Men's PG in Patrika Nagar, HITEC City, Hyderabad, near Raheja Mindspace and HITEC City Metro.",
  },

  {
    slug: "indraprastha-mens-pg-madhapur",
    title:
      "Campus Indraprastha Men's PG in Madhapur | Nandu PG",
    description:
      "Nandu Men's PG in Siddhi Vinayak Nagar, Madhapur, Hyderabad, near HITEC City Metro and major IT offices.",
  },

  {
    slug: "samaveda-mens-pg-hitec-city",
    title:
      "Campus Samaveda Men's PG in HITEC City | Nandu PG",
    description:
      "Nandu Men's PG in Vittal Rao Nagar, HITEC City, Hyderabad, close to Durgam Cheruvu Metro, HITEC City Metro and Inorbit Mall.",
  },

  {
    slug: "himavana-mens-pg-raidurg",
    title:
      "Campus Himavana Men's PG in Rai Durg | Nandu PG",
    description:
      "Nandu Men's PG in Prashant Hills, Rai Durg, Hyderabad, with convenient access to Knowledge City and the Financial District.",
  },

  {
    slug: "sindhoor-womens-pg-madhapur",
    title:
      "Campus Sindhoor Women's PG in Madhapur | Nandu PG",
    description:
      "Nandu Women's PG in Ayyappa Society, Madhapur, Hyderabad, near Durgam Cheruvu Metro and Raheja Mindspace.",
  },

  {
    slug: "skanda-womens-pg-raidurg",
    title:
      "Campus Skanda Women's PG in Rai Durg | Nandu PG",
    description:
      "Nandu Women's PG in Prashant Hills, Rai Durg, Hyderabad, with convenient access to Knowledge City and the Financial District.",
  },
];

const distDirectory =
  path.resolve("dist");

const indexPath =
  path.join(distDirectory, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error(
    "dist/index.html was not found. Run Vite build first."
  );

  process.exit(1);
}

const homepageHtml =
  fs.readFileSync(indexPath, "utf8");

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const replaceMeta = (
  html,
  pattern,
  replacement
) => {
  if (!pattern.test(html)) {
    throw new Error(
      `Metadata pattern not found: ${pattern}`
    );
  }

  return html.replace(
    pattern,
    replacement
  );
};

for (const property of PROPERTY_PAGES) {
  const propertyUrl =
    `${BASE_URL}/pg/${property.slug}`;

  const title =
    escapeHtml(property.title);

  const description =
    escapeHtml(property.description);

  let html = homepageHtml;

  /*
   * TITLE
   */

  html = replaceMeta(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${title}</title>`
  );

  /*
   * DESCRIPTION
   */

  html = replaceMeta(
    html,
    /<meta\s+name="description"[\s\S]*?>/i,
    `<meta name="description" content="${description}" />`
  );

  /*
   * CANONICAL
   */

  html = replaceMeta(
    html,
    /<link\s+rel="canonical"[\s\S]*?>/i,
    `<link rel="canonical" href="${propertyUrl}" />`
  );

  /*
   * OPEN GRAPH
   */

  html = replaceMeta(
    html,
    /<meta\s+property="og:title"[\s\S]*?>/i,
    `<meta property="og:title" content="${title}" />`
  );

  html = replaceMeta(
    html,
    /<meta\s+property="og:description"[\s\S]*?>/i,
    `<meta property="og:description" content="${description}" />`
  );

  html = replaceMeta(
    html,
    /<meta\s+property="og:url"[\s\S]*?>/i,
    `<meta property="og:url" content="${propertyUrl}" />`
  );

  /*
   * TWITTER
   */

  html = replaceMeta(
    html,
    /<meta\s+name="twitter:title"[\s\S]*?>/i,
    `<meta name="twitter:title" content="${title}" />`
  );

  html = replaceMeta(
    html,
    /<meta\s+name="twitter:description"[\s\S]*?>/i,
    `<meta name="twitter:description" content="${description}" />`
  );

  /*
   * CREATE:
   *
   * dist/pg/property-name.html
   */

  const outputDirectory =
    path.join(distDirectory, "pg");

  fs.mkdirSync(
    outputDirectory,
    {
      recursive: true,
    }
  );

  const outputPath =
    path.join(
      outputDirectory,
      `${property.slug}.html`
    );

  fs.writeFileSync(
    outputPath,
    html,
    "utf8"
  );

  console.log(
    `Created /pg/${property.slug}`
  );
}

console.log(
  `\nGenerated ${PROPERTY_PAGES.length} property HTML pages with property-specific metadata.`
);