# 拓展 Editor

Unreal 的源代码是完全开放的，理论上我们可以对 Unreal Editor 做出任意更改。但作为拥有 20 余年历史的当今最强大的商业游戏引擎，Unreal 的底层代码复杂度极高，核心模块间存在大量耦合，并且仍在飞速发展。从开发难度和项目工程性的角度考虑，直接修改 Unreal Editor 的源代码是极不明智的。

但好在 Unreal 开发团队一直在致力于解决历史遗留问题和过度耦合问题，不断优化 API 的易用性。截止到 Unreal 5.0 正式版，Unreal Editor 的应用层部分几乎都使用单例模式进行全局管理，并且预留了大量拓展位和钩子，使得我们可以在不破坏 Unreal 原有代码的前提下方便地对 Unreal Editor 进行拓展。

## 本章内容

本章将介绍以下内容：

- Unreal Editor 中的 Commands 系统。
- 在 Unreal Editor 中添加自定义菜单。
- 在 Unreal Editor 中添加自定义窗口。

## 开发者工具

Editor Preference 中提供了开发者选项 `Display UI Extension Points`，用于查看 Unreal Editor 中的可拓展点位。建议读者在开始本章前尝试此开发者选项，以便对 Unreal Editor 的可拓展性有初步认识。
