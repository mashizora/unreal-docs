import { defineConfig } from "vitepress";
import { version } from "../package.json";

import fs from "fs";
import path from "path";

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

    socialLinks: [
      { icon: "github", link: "https://github.com/mashisora/docs" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © ${new Date().getFullYear()} mashisora`,
    },
  },
});

function sidebarUnreal() {
  const unreal = fs.readdirSync("unreal");
  return unreal.map((category) => {
    const files = fs.readdirSync(path.join("unreal", category));
    return {
      text: category,
      collapsible: true,
      items: files.map((file) => ({
        text: file.substring(0, file.length - 3),
        link: path.join("unreal", category, file),
      })),
    };
  });
}
