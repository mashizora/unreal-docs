import { defineConfig } from "vitepress";
import { version } from "../package.json";

import fs from "fs";
import path from "path";

const unrealdir = fs.readdirSync("unreal");

export default defineConfig({
  lang: "en-US",
  title: "mashisora",
  description: "mashisora's blog",

  lastUpdated: true,

  themeConfig: {
    sidebar: {
      "/unreal/": sidebarUnreal(),
    },

    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Evan You",
    },
  },
});

function sidebarUnreal() {
  return [
    {
      text: "Unreal",
      collapsible: true,
      items: unrealdir.map((filename) => ({
        text: filename.substring(0, filename.length - 3),
        link: path.join("unreal", filename),
      })),
    },
  ];
}
