// @ts-nocheck
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Instrukcje pracy",
  tagline: "Dokumentacja bezpieczeństwa i procedur",
  favicon: "img/favicon.ico",

  url: "https://grzegorzstacel.github.io",
  baseUrl: "/docs/",

  organizationName: "GrzegorzStacel",
  projectName: "docs",
  deploymentBranch: "gh-pages",

  onBrokenLinks: "warn",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
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
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      items: [{ to: "obliczanie-dlugosci-rolki", label: "Dokumentacja", position: "left" }],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Działy",
          items: [
            { label: "Znajomość zasad BHP", to: "bhp/znajomosc-bhp" },
            { label: "Znajomość zagrożeń na stanowisku", to: "bhp/zagrozenia-praca" },
            { label: "Nadzór nad przydzielonym sprzętem", to: "bhp/nadzor-sprzetu" },
            { label: "System LOTO", to: "bhp/system-loto" },
            { label: "Zarządzanie gospodarką odpadami", to: "bhp/zarzadzanie-gospodarka-odpadami" },
            // { label: "Operacje (Linia-RAD05)", to: "/linia-rad05/zamawianie" },
            { to: "/lkj/postepowanie-z-wyrobem-niezgodnym", label: "LKJ", position: "left" },
            { label: "Obliczanie długości rolki", to: "obliczanie-dlugosci-rolki" },
            { label: "Kontrola poprawnego wyrzutu splice", to: "kontrola-wyrzutu-splice" },
            { label: "Kontrola kamer – poprawne wykonywanie testów", to: "kontrola-kamer" },
            { label: "Panel HMI", to: "panel-hmi" },
            { label: "Herman", to: "herman" },
            { label: "Audyt", to: "audyt" },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()}`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
