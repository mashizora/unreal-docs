# Slate 控件

## Slate 控件

有 GUI 开发经验的读者应该都能理解控件的概念，在这里不过多赘述。

在 Unreal 中，所有 Slate 控件的基类是 `SWidget`，所有 Slate 控件的派生类均按照 `S + 控件名` 的规则命名。

## 实例化控件

Slate 提供了一组用于实例化控件的宏，它们分别是：

`SNew(WidgetType)`：实例化控件并返回其结构

`SAssignNew(ExposeAs, WidgetType)`：与 `SNew()` 行为一致，同时将控件指针赋给 `ExposeAs`

`SArgumentNew(InArgs, WidgetType)`：使用 `InArgs` 作为参数实例化控件并返回其结构

这三个宏的内部实现均为使用 Unreal 智能引用构造 Widget 。

## 控件类型 | Widget Type

`SLeafWidget` : 无 `Slot()` 成员，不包含子 `Widget`

`SPanel` : 通过子类实现 `Slot()` 结构，可包含多个子 `Widget`

`SCompoundWidget` : 有显式命名的 `Slot()` 成员，可包含数量固定的 `Widget`

## 基本控件 | Basic Widgets

### `SDockTab`

在拓展窗口章节中，我们提到了使用 `FTabManager` 注册自定义窗口，其中 `FOnSpawnTab` 代理需要返回的控件就是该控件。

`SDockTab` 控件描述了一个 Tab 的标签信息和内容，是构建 Unreal 内独立窗口应用的入口。

Unreal Editor 的开发工具中提供了一个名为 STARSHIP GALLERY 的 Widget Gallery，可以帮助我们学习和开发 Slate Widget。

该工具位于 Tools -> Debug -> Debug Tools -> Test Suite

对应源码位于 `Runtime\AppFramework\Private\Framework\Testing\SStarshipGallery.cpp`

STARSHIP GALLERY 中列举了大部分常用的基本控件供我们选择，除此之外，Slate 也提供了一些易用的组合控件
