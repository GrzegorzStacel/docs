// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ontex — Instrukcje pracy",
  tagline: "Dokumentacja bezpieczeństwa i procedur",
  favicon: "img/favicon.ico",
  url: "https://GrzegorzStacel.github.io",
  baseUrl: "/docs/",
  organizationName: "ontex",
  projectName: "ontex_docs",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "pl",
    locales: ["pl"],
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          remarkPlugins: [],
          rehypePlugins: [],
          showLastUpdateTime: true,
        },
      },
    ],
  ],
  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Instrukcje BHP",
      logo: {
        alt: "Ontex logo",
        src: "img/logo.svg",
      },
      items: [
        { to: "/docs/pierwsza-pomoc", label: "Dokumentacja", position: "left" },
        { href: "https://github.com/ontex/ontex_docs", label: "GitHub", position: "right" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Działy",
          items: [
            { label: "Pierwsza pomoc", to: "/docs/pierwsza-pomoc" },
            { label: "Bezpieczeństwo", to: "/docs/bezpieczenstwo/gasnice" },
            { label: "Operacje", to: "/docs/operacje/zamawianie" },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Ontex.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
