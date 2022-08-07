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

这三个宏均使用 Unreal 智能引用构造 Widget 。相较之下，`SNew()` 最为常用；`SAssignNew()` 在一些需要获取控件引用的场景下能减少代码量，增强易读性；`SArgumentNew()` 则提供了极高的自由度，可以用来构造复杂的自定义控件。

## 属性绑定

上一章中介绍了 Slate 控件的 4 种基本属性。本章以常用基本控件 `SButton` 为例演示使用 Slate 表达式绑定控件属性。`SButton` 派生自 `SCompoundWidget` ，拥有全部 4 类属性。

### 绑定 Attribute 属性

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

### 绑定 Argument 属性

可以通过以下语法为 Argument 属性绑定属性值：

```cpp
SNew(WidgetType).ArgName(ArgValue)
```

Argument 属性不支持绑定函数，仅支持绑定值。

### 绑定 Event 属性

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

### 绑定 Slot 属性

```cpp
SNew(SButton).Text(FText::FromString("Test"))
```

## 使用 Slot() 方法

```cpp
SNew(SButton).Text(FText::FromString("Test"))
```
