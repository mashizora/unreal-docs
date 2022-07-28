import { defineConfig } from "vitepress";
import { version } from "../package.json";

import fs from "fs";
import path from "path";

const unrealDir = fs.readdirSync("unreal");

export default defineConfig({
  lang: "en-US",
  title: "unreal editor dev",
  description: "unreal editor dev",

  lastUpdated: true,

  themeConfig: {
    sidebar: {
      "/unreal/": sidebarUnreal(),
    },

    editLink: {
      pattern: "https://github.com/mashisora/docs/edit/main/:path",
      text: "Edit this page on GitHub",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/mashisora" }],

    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © ${new Date().getFullYear()} mashisora`,
    },
  },
});

function sidebarUnreal() {
  return [
    {
      text: "Unreal",
      collapsible: true,
      items: unrealDir.map((filename) => ({
        text: filename.substring(0, filename.length - 3),
        link: path.join("unreal", filename),
      })),
    },
  ];
}
