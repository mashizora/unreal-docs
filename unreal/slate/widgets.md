# Slate 控件

## Slate 控件

Slate UI 系统的基本单位是控件，有 GUI 开发经验的读者应该都能理解控件的概念，在这里不过多赘述。

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

## 开发工具

Unreal Editor 的开发工具中提供了两款可以辅助我们学习和开发 Unreal 编辑器的工具：

- STARSHIP GALLERY：该工具位于 `Tools -> Debug -> Debug Tools -> Test Suite`  
  该工具展示了大部分常用的 Slate 控件和对应名称。

- Widget Reflector：该工具位于 `Tools -> Debug -> Widget Reflector`  
  该工具可以从编辑器中拾取 Widget，并展示出其树形结构。

对于不嫌麻烦的读者来说，拿着这两个开发工具，结合阅读 Unreal Editor 源码，已经可以编写绝大部分 UI 了。
