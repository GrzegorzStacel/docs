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
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      items: [{ to: "/znajomosc-bhp", label: "Dokumentacja", position: "left" }],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Działy",
          items: [
            { label: "Znajomość zasad BHP", to: "/znajomosc-bhp" },
            { label: "Znajomość zagrożeń na stanowisku", to: "/zagrozenia-praca" },
            { label: "Nadzór nad przydzielonym sprzętem", to: "/nadzor-sprzetu" },
            { label: "System LOTO", to: "/system-loto" },
            { label: "Zarządzanie gospodarką odpadami", to: "/zarzadzanie-gospodarka-odpadami" },
            { label: "Operacje (Linia-RAD05)", to: "/linia-rad05/zamawianie" },
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
