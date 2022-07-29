import { defineConfig } from 'vitepress';
import { version } from '../package.json';

import fs from 'fs';
import path from 'path';

export default defineConfig({
  lang: 'en-US',
  title: 'unreal editor dev',
  description: 'unreal editor dev',

  lastUpdated: true,

  themeConfig: {
    sidebar: {
      '/unreal/': [
        {
          text: '开始',
          collapsible: true,
          items: [
            { text: '关于本文档', link: '/unreal/start/about' },
            { text: '前置要求', link: '/unreal/start/before' },
          ],
        },
        {
          text: '基础',
          collapsible: true,
          items: [
            { text: '智能指针', link: '/unreal/basic/smart-pointer' },
            { text: '代理机制', link: '/unreal/basic/delegate' },
            { text: '模块', link: '/unreal/basic/module' },
          ],
        },
        {
          text: '拓展 Editor UI',
          collapsible: true,
          items: [
            { text: '新增 Command', link: '/unreal/extend/command' },
            { text: '拓展菜单', link: '/unreal/extend/menu' },
            { text: '拓展窗口', link: '/unreal/extend/window' },
          ],
        },
        {
          text: 'Slate UI',
          collapsible: true,
          items: [
            { text: 'Slate UI', link: '/unreal/slate/slate-ui' },
            { text: '杂项', link: '/unreal/slate/misc' },
            { text: '编写中', link: '/unreal/slate/writing' },
          ],
        },
        {
          text: '自动化脚本',
          collapsible: true,
          items: [{ text: '编写中', link: '/unreal/automation/writing' }],
        },
      ],
    },

    editLink: {
      pattern: 'https://github.com/mashisora/docs/edit/main/:path',
      text: 'Edit this page on GitHub',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/mashisora/docs' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2022 mashisora`,
    },
  },
});
