import { defineConfig } from 'vitepress';
import { version } from '../../package.json';

export default defineConfig({
  lang: 'zh-CN',
  title: 'Unreal Editor Dev Docs',
  description: `mashisora's Unreal Docs`,

  lastUpdated: true,

  themeConfig: {
    sidebar: [
      {
        text: '开始',
        collapsible: true,
        items: [
          { text: '关于本文档', link: '/start/about' },
          { text: '前置要求', link: '/start/before' },
        ],
      },
      {
        text: '基础',
        collapsible: true,
        items: [
          { text: '智能指针', link: '/basic/pointer' },
          { text: '代理机制', link: '/basic/delegate' },
          { text: '模块', link: '/basic/module' },
        ],
      },
      {
        text: '拓展 Editor',
        collapsible: true,
        items: [
          { text: '拓展 Editor', link: '/extend/intro' },
          { text: 'Commands 系统', link: '/extend/commands' },
          { text: '拓展菜单', link: '/extend/menu' },
          { text: '拓展 Tab', link: '/extend/tab' },
        ],
      },
      {
        text: 'Slate UI',
        collapsible: true,
        items: [
          { text: 'Slate UI', link: '/slate/intro' },
          { text: 'Slate 控件', link: '/slate/widget' },
          { text: 'Slate 表达式', link: '/slate/expr' },
          { text: 'Slate 布局', link: '/slate/layout' },
          { text: '细节面板', link: '/slate/details' },
          { text: '编写中', link: '/slate/writing' },
        ],
      },
      {
        text: '资产类型',
        collapsible: true,
        items: [
          { text: '资产类型', link: '/asset/intro' },
          { text: '资产类型 Object', link: '/asset/object' },
          { text: '资产类型 Factory', link: '/asset/factory' },
          { text: '资产类型 Actions', link: '/asset/actions' },
          { text: '资产编辑器', link: '/asset/editor' },
          { text: '编写中', link: '/asset/writing' },
        ],
      },
      {
        text: '自动化脚本',
        collapsible: true,
        items: [{ text: '编写中', link: '/auto/writing' }],
      },
      {
        text: '杂项',
        collapsible: true,
        items: [
          { text: '消息通知', link: '/misc/notif' },
          { text: '进度条窗口', link: '/misc/progress' },
          { text: '编写中', link: '/misc/writing' },
        ],
      },
    ],

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
