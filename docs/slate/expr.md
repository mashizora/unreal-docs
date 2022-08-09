# Slate 表达式

## 关于 Slate 表达式

如果阅读过 Unreal 官方文档或 Unreal Editor 源代码，那么一定会见到类似这样的表达式：

```cpp
SNew(SVerticalBox)
+ SVerticalBox::Slot().Padding(4.0f)
[
  SNew(SHorizontalBox)
  + SHorizontalBox::Slot().Padding(2.0f)
  [
    SNew(SButton).Text(FText::FromString(TEXT("BTN 01")))
  ]
  + SHorizontalBox::Slot().Padding(2.0f)
  [
    SNew(SButton).Text(FText::FromString(TEXT("BTN 02")))
  ]
]
+ SVerticalBox::Slot().Padding(4.0f)
[
  SNew(SHorizontalBox)
  + SHorizontalBox::Slot().Padding(2.0f)
  [
    SNew(SButton).Text(FText::FromString(TEXT("BTN 03")))
  ]
  + SHorizontalBox::Slot().Padding(2.0f)
  [
    SNew(SButton).Text(FText::FromString(TEXT("BTN 04")))
  ]
]
```

在本章节中，将以上这种用于描述 Slate 控件属性绑定和 Slate 控件间组合关系的特殊表达式称为 Slate 表达式。

Slate 表达式在 Unreal 官方文档中已有相关说明，但考虑到官方文档的一大特点是 “好像什么都讲了，但又好像什么都没有讲” ，本章将对 Slate 表达式的基本语法和常用范式做简单介绍。

## 实例化控件

Slate 表达式提供了一组用于实例化控件的宏，它们分别是：

- `SNew(WidgetType)`：实例化控件
- `SAssignNew(ExposeAs, WidgetType)`：实例化控件，同时将控件引用赋给 `ExposeAs`
- `SArgumentNew(InArgs, WidgetType)`：使用 `InArgs` 作为参数实例化控件

这三个宏均使用 Unreal 智能引用实例化 Widget 。相较之下，`SNew()` 最为常用；`SAssignNew()` 在一些需要获取控件引用的场景下能减少代码量，增强易读性；`SArgumentNew()` 则提供了极高的自由度，可以用来构建复杂的自定义控件。

## 绑定 Attribute 属性

可以通过以下语法为 Attribute 属性绑定属性值：

```cpp
SNew(WidgetType).AttrName(AttrValue)
```

Attribute 属性还支持绑定返回属性值的函数，可以使用以下语法绑定不同类型的函数：

```cpp
SNew(WidgetType).AttrName_Static(Function)                  // Global Function
SNew(WidgetType).AttrName_Lambda([] { return AttrValue; })  // Lambda
SNew(WidgetType).AttrName_Raw(Object, Method)               // Raw C++ Class Method
SNew(WidgetType).AttrName(ObjectRef, Method)                // SP Class Method
SNew(WidgetType).AttrName_UObject(UObject, Method)          // UObject Class Method
```

## 绑定 Argument 属性

可以通过以下语法为 Argument 属性绑定属性值：

```cpp
SNew(WidgetType).ArgName(ArgValue)
```

Argument 属性不支持绑定函数，仅支持绑定值。

## 绑定 Event 属性

可以通过以下语法为 Event 属性绑定 Delegate 回调函数：

```cpp
SNew(WidgetType).EventName(DelegateName::CreateStatic(Function))
SNew(WidgetType).EventName(DelegateName::CreateLambda([] { return AttrValue; }))
SNew(WidgetType).EventName(DelegateName::CreateRaw(Object, Method))
SNew(WidgetType).EventName(DelegateName::CreateSP(ObjectRef, Method))
SNew(WidgetType).EventName(DelegateName::CreateUObject(UObject, Method))
```

此外，Slate 核心库提供了一些语法糖，可以简化以上代码：

```cpp
SNew(WidgetType).EventName_Static(Function)                 // Global Function
SNew(WidgetType).EventName_Lambda([] { return AttrValue; }) // Lambda
SNew(WidgetType).EventName_Raw(Object, Method)              // Raw C++ Class Method
SNew(WidgetType).EventName(ObjectRef, Method)               // SP Class Method
SNew(WidgetType).EventName_UObject(UObject, Method)         // UObject Class Method
```

## 绑定 Slot 属性

在介绍控件基本类型时提到，派生自 `SCompoundWidget` 的 Slete 控件拥有 Slot 属性，可为其绑定 Slate 控件作为当前控件的子控件。在描述子控件时，使用 `[...]` 包裹子控件对应的 Slate 表达式。

Slot 属性有 Default Slot 和 Named Slot 两种。Default Slot 在绑定时可省略 Slot 名：

```cpp
SNew(WidgetType)
// .DefaultSlotName()
[
  SNew(...)
]
```

Named Slot 则必须在绑定时显式指定 Slot 名：

```cpp
SNew(WidgetType)
.NamedSlotName()
[
  SNew(...)
]
```

派生自 `SCompoundWidget` 的 Slate 控件通过 Slot 属性实现控件嵌套。由于每个 Slot 仅能容纳一个子控件，导致每种控件可容纳的子控件总数是确定的，这不便于实现一些布局类控件。

## `Slot()` 方法

为解决 Slot 属性的局限性问题，派生自 `SPanel` 的 Slate 控件通过 `Slot()` 方法实现了在控件中包含多个并列结构的子控件。下面给出一个使用 `Slot()` 方法的例子：

```cpp
SNew(WidgetType)
+ WidgetType::Slot().ArgName(ArgValue)
[
  SNew(...)
]
+ WidgetType::Slot().ArgName(ArgValue)
[
  SNew(...)
]
```

从以上 Slate 表达式中可以看出，Slate 核心库重写了 `+` 运算符，实现了将 `[...]` 内实例化的子控件通过 `Slot()` 方法作为参数传递给当前控件。

`Slot()` 方法也可绑定属性，但要注意，`Slot()` 方法的功能只是传递参数，并不实例化 Slate 控件。这里的 `Slot()` 属性与前文提到的控件属性有本质上的区别。在 Slate UI 中，拥有 `Slot()` 方法的 Slate 控件大多为布局类控件，相应地， `Slot()` 属性也大多与布局相关。
