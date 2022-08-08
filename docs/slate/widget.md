# Slate 控件

## 关于 Slate 控件

Slate 控件是所有基于 Slate UI 构建的 GUI 的基本单位。有 GUI 开发经验的读者应该都能理解控件的概念，在这里不过多赘述。

在 Unreal 中，所有 Slate 控件的基类是 `SWidget`，其所有派生类命名均带有 `S` 前缀。

## 控件属性

Slate 控件属性主要分为 4 类，分别是：

- Attribute：一般属性，支持绑定属性值或绑定返回属性值的函数。
- Argument：一般属性，仅支持绑定属性值。
- Event：事件，支持绑定 Delegate 回调函数。
- Slot：子控件槽，支持绑定 Slate 控件。

其中 Slot 属性有 Default Slot 和 Named Slot 两种，二者在声明和绑定语法上有差异，但功能和实现完全一致。控件属性的绑定需要用到 Slate 表达式，相关语法将在下一章节中详细介绍。

## 控件基本类型

Slate 核心库依据可容纳子控件的数量设计了三种控件基本类型：

- `SLeafWidget` : 派生类无 Slot 属性，不包含子控件。多用于基本控件。
- `SCompoundWidget` : 派生类有 Slot 属性，可包含数量固定的子控件。多用于功能性控件。
- `SPanel` : 派生类实现 `Slot()` 方法，可包含多个并列结构的子控件。多用于布局类控件。

在插件开发过程中，一般选择继承 `SCompoundWidget` 设计自定义控件。

## 声明控件类型

Slate UI 框架提供了一组基于声明式语法的宏用于简化 Slate 控件类型的声明。下面是一个派生自 `SCompoundWidget` 的自定义 Slate 控件类型声明示例：

```cpp
class SMyWidget : public SCompoundWidget {
public:
    SLATE_BEGIN_ARGS(SMyWidget)
        : _AttrName(true)
        , _ArgName(0.0f)
        {}
        SLATE_ATTRIBUTE(bool, AttrName)
        SLATE_ARGUMENT(float, ArgName)
        SLATE_EVENT(FOnClicked, OnClicked)
        SLATE_DEFAULT_SLOT(FArguments, DefaultSlotName)
        SLATE_NAMED_SLOT(FArguments, SlotName)
    SLATE_END_ARGS()

    void Construct(const FArguments& InArgs);
};
```

在本实例中，使用了以下宏：

- `SLATE_BEGIN_ARGS() {}`：开始 Slate 控件类型声明。
- `SLATE_ATTRIBUTE()`：声明 Attribute 属性。
- `SLATE_ARGUMENT()`：声明 Argument 属性。
- `SLATE_EVENT()`：声明 Event 属性。
- `SLATE_DEFAULT_SLOT()`：声明 Default Slot 属性。
- `SLATE_NAMED_SLOT()`：声明 Named Slot 属性。
- `SLATE_END_ARGS()`：结束 Slate 控件类型声明。

在开始 Slate 控件类型声明时，可以使用类似构造函数的语法为控件属性指派初值。控件属性对应的实际变量名均带有 `_` 前缀。

## 实现控件类型

在完成控件类型声明后，至少需要实现 `Construct()` 方法来描述该控件的内容。`Construct()` 方法在控件实例化时被调用，该方法接收一个名为 `InArgs` 的，带有全部控件属性的 `FArguments` 参数。可以使用如下语法实现 `Construct()` 方法：

```cpp
void SMyWidget::Construct(const FArguments& InArgs)
{
    ChildSlot
    [
        SNew(SButton)
        .Text(FText::FromString(TEXT("MyWidget")))
        .OnClicked(InArgs._OnClicked)
    ];
}
```

在 `ChildSlot [...];` 中使用 Slate 表达式定义该控件类型的内容。Slate 表达式语法将在下一章节详细介绍。

## 关于自定义

Unreal 为我们提供了构建 Unreal Editor 所使用的全部控件，一般来说可以满足绝大多数工具的开发需求。从工程性的角度考虑，应避免刻意的自定义控件，多复用 Unreal Editor 提供的控件。仅在以下两种情况下建议使用自定义控件：

- 将频繁使用的基本控件组合进行封装。
- 应用场景复杂，不能从 Unreal Editor 中找到合适的控件。

至于完全自定义控件，涉及到重写 `SWidget` 渲染相关函数，本文档暂不涉及（可能以后会添加）。

---

# 分割线 WIP...

---

## 基本控件

### `SDockTab`

在拓展窗口章节中，我们提到了使用 `FTabManager` 注册自定义窗口，其中 `FOnSpawnTab` 代理需要返回的控件就是该控件。

`SDockTab` 控件描述了一个 Tab 的标签信息和内容，是构建 Unreal 内独立窗口应用的入口。
