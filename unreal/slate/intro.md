# Slate UI 概览

## 什么是 Slate UI

Slate UI 是 Unreal Engine 中的一套 UI 框架，Unreal Editor 的大部分界面和游戏内的 UMG UI 系统都是基于 Slate UI 构建的。

关于更详细的 Slate UI 架构概述，可以参考[官方文档](https://docs.unrealengine.com/5.0/zh-CN/understanding-the-slate-ui-architecture-in-unreal-engine/)。

## 为什么要学习 Slate UI

本文档的核心主题是 Unreal Editor 插件开发，插件的使用者可能是美术、策划等非技术同学，所以为插件设计一个美观易用的 GUI 是十分必要的。

Unreal Editor 插件主要使用 C++ 和 Unreal 核心库开发，理论上我们也可以引入 [QT](https://www.qt.io/) 、[Dear ImGui](https://github.com/ocornut/imgui) 、[CEF](https://bitbucket.org/chromiumembedded/cef/src/master/) 等第三方框架来构建 GUI 。相较之下，使用 Slate UI 有如下优点：

- 轻量高效：Slate UI 仅依赖 Unreal 核心库，无外部依赖。如引入第三方 GUI 框架，随之也会引入相关依赖，与 Unreal 核心库存在大量功能重合，造成代码冗余。
- 与 Unreal Editor 界面的一致性：Unreal Editor 插件是在 Unreal Editor 中运行的，使用 Slate UI ，可以保证插件界面与编辑器界面在视觉风格和行为上的一致性，便于用户理解和操作。
- 可调用 Unreal Editor 内置控件：Unreal Editor 的主要界面均使用 Slate UI 构建，意味着我们可以复用编辑器自身的一些复杂控件，简化 UI 开发流程。
- 语法的简洁性：Unreal Engine 通过大量宏定义、运算符重载、参数传递等手段，实现了在 C++ 中使用声明式语法和特有的 Slate 表达式来描述 UI ，大大简化了代码。我们将在后面的章节中讨论这些特殊语法。

以上只是一些个人见解，实际开发时是否选择 Slate UI 还需具体问题具体分析。上文提到的三个 C++ 生态下其他的 GUI 框架也都非常优秀，在工具类软件开发领域有大量应用实例。但即使不打算使用 Slate UI，学习它也会对深入理解 Unreal Editor 有很大帮助。

## 其他资料

关于 Slate UI，社区中存在一些可以简化开发流程的方案，虽然这些方案对 Slate UI 的特性支持尚不完全，但仍提供了不错的思路：

- [TAPython](https://www.tacolor.xyz/pages/TAPython.html)
- [UnrealEnginePython](https://github.com/20tab/UnrealEnginePython)

对于开发者来说，在掌握了 Slate UI 的基本用法之后，开发流程并没有想象的那么复杂。但这些工具能够帮助不熟悉 C++ 的同学也能使用 Slate UI 为 Unreal Editor 脚本添加 GUI。
