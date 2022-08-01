# Slate UI 简介

## 什么是 Slate UI

Slate UI 是 Unreal Engine 中的一套 UI 框架，Unreal Editor 的大部分界面和游戏内的 UMG UI 系统都是基于 Slate UI 构建的。

关于更详细的 Slate UI 架构概述，可以参考[官方文档](https://docs.unrealengine.com/5.0/zh-CN/understanding-the-slate-ui-architecture-in-unreal-engine/)。

## 为什么要学习 Slate UI

本文档的核心主题是 Unreal Editor 插件开发，插件的使用者可能是美术、策划等非技术同学，所以为编写的插件设计一个美观易用的 GUI 是十分必要的。

Unreal Editor Plugin 使用 C++ 和 Unreal 核心库开发，理论上我们也可以引入 QT 或 CEF 等第三方库来构建 GUI，相较之下，使用 Slate UI 有如下优点：

- 轻量高效：Slate UI 仅依赖 Unreal 核心库，无外部依赖。例如生命周期管理由 Unreal 智能指针实现，事件监听由 Unreal Delegate 机制实现等。如引入 QT 等第三方 GUI 库，随之也会引入其相关核心库和工具函数库，与 Unreal 核心库存在大量功能重合，造成代码冗余。
- 与 Unreal Editor 保持一致性：我们的插件是在 Unreal Editor 中运行的，使用 Slate UI 构建 GUI，可以与编辑器保持在视觉风格和行为上的一致性，便于用户理解和操作。
- UMG 也基于 Slate ：Unreal Engine 的游戏内 UI 系统 UMG 本质上是对 Slate UI 的二次封装。所以学习 Slate UI 也能加深我们对于 Unreal 游戏内 UI 系统的理解。

以上只是一些个人见解，实际开发前的技术选型需要具体问题具体分析。QT 本身也是设计非常优秀的 C++ GUI 方案，嵌入 CEF 等框架也能大大加快 UI 迭代速度，但既然都打算深入学习 Unreal Editor 了，了解一下编辑器使用的 UI 框架也没什么坏处。

## 其他资料

关于 Slate UI，社区中存在一些可以简化开发流程的方案，虽然这些方案对 Slate UI 的特性支持尚不完全，但仍提供了不错的思路：

- [TAPython](https://www.tacolor.xyz/pages/TAPython.html)
- [UnrealEnginePython](https://github.com/20tab/UnrealEnginePython)

期待将来能出现一些更成熟的简化 Slate UI 开发流程的工具。~~但其实在掌握了 Slate UI 的基本用法之后，开发流程并没有想象的那么复杂。~~ 这些工具能够帮助不熟悉 C++ 开发的同学也能使用 Slate UI 为 Unreal 脚本添加 GUI。
