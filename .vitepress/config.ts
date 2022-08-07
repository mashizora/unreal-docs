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
            { text: '智能指针', link: '/unreal/basic/pointer' },
            { text: '代理机制', link: '/unreal/basic/delegate' },
            { text: '模块', link: '/unreal/basic/module' },
          ],
        },
        {
          text: '拓展 Editor',
          collapsible: true,
          items: [
            { text: '拓展 Editor 概览', link: '/unreal/extend/intro' },
            { text: '自定义 Commands', link: '/unreal/extend/commands' },
            { text: '拓展菜单', link: '/unreal/extend/menu' },
            { text: '拓展窗口', link: '/unreal/extend/window' },
          ],
        },
        {
          text: 'Slate UI',
          collapsible: true,
          items: [
            { text: 'Slate UI 概览', link: '/unreal/slate/intro' },
            { text: 'Slate 控件', link: '/unreal/slate/widget' },
            { text: 'Slate 表达式', link: '/unreal/slate/expr' },
            { text: 'Slate 布局', link: '/unreal/slate/layout' },
            { text: '细节面板', link: '/unreal/slate/details' },
            { text: '编写中', link: '/unreal/slate/writing' },
          ],
        },
        {
          text: '资产类型',
          collapsible: true,
          items: [
            { text: '资产类型概览', link: '/unreal/asset/intro' },
            { text: '资产类型 Object', link: '/unreal/asset/object' },
            { text: '资产类型 Factory', link: '/unreal/asset/factory' },
            { text: '资产类型 Actions', link: '/unreal/asset/actions' },
            { text: '资产编辑器', link: '/unreal/asset/editor' },
            { text: '编写中', link: '/unreal/asset/writing' },
          ],
        },
        {
          text: '自动化脚本',
          collapsible: true,
          items: [{ text: '编写中', link: '/unreal/auto/writing' }],
        },
        {
          text: '杂项',
          collapsible: true,
          items: [
            { text: '消息通知', link: '/unreal/misc/notif' },
            { text: '进度条窗口', link: '/unreal/misc/progress' },
            { text: '编写中', link: '/unreal/misc/writing' },
          ],
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
