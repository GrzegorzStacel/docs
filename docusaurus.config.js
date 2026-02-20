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
      // links: [
      // { label: "Zlecenie produkcyjne", to: "zlecenie-produkcyjne" },
      // { label: "Skaner liniowy", to: "skaner-liniowy" },
      // ],
      copyright: `© ${new Date().getFullYear()}`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
