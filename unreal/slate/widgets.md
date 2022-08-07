# Slate 控件

## Slate 控件

Slate 控件是所有基于 Slate UI 构建的 GUI 的基本单位。有 GUI 开发经验的读者应该都能理解控件的概念，在这里不过多赘述。

在 Unreal 中，所有 Slate 控件的基类是 `SWidget`，其所有派生类命名均带有 `S` 前缀。

## 控件属性

Slate 控件属性主要分为 4 类，分别是：

- Attribute：一般属性，支持绑定属性值或绑定返回属性值的函数。
- Argument：一般属性，仅支持绑定属性值。
- Event：事件，支持绑定 Delegate 回调函数。
- Slot：子控件槽，支持使用 Slate 表达式绑定 Slate 控件。

控件属性的绑定需要用到 Slate 表达式，相关语法将在下一章节中详细介绍。

## 控件基本类型

Slate 核心库依据可容纳子控件的数量设计了三种控件基本类型：

- `SLeafWidget` : 派生类无 Slot 属性，不包含子控件。多用于基本控件。
- `SCompoundWidget` : 派生类有 Slot 属性，可包含数量固定的子控件。多用于功能性控件。
- `SPanel` : 派生类实现 `Slot()` 方法，可包含多个并列结构的子控件。多用于布局类控件。

在插件开发过程中，一般选择继承 `SCompoundWidget` 设计自定义控件。

---

---

WIP...

## ~~基本控件 | Basic Widgets~~

### `SDockTab`

在拓展窗口章节中，我们提到了使用 `FTabManager` 注册自定义窗口，其中 `FOnSpawnTab` 代理需要返回的控件就是该控件。

`SDockTab` 控件描述了一个 Tab 的标签信息和内容，是构建 Unreal 内独立窗口应用的入口。
