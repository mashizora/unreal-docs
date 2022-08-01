# 布局

## 关于本章

布局是 UI 设计和开发的第一步，了解 Slate UI 的布局方法是编写编辑器拓展的基础。本章节将讲解 Slate UI 中用于布局的控件和一些基本布局方法。

## 通用布局属性

Slate UI 提供的布局控件和控件槽中，多数包含以下常用布局属性：

- `HAlign`：水平对齐方式。有效值为：
  ```cpp
  HAlign(HAlign_Left)
  HAlign(HAlign_Center)
  HAlign(HAlign_Right)
  HAlign(HAlign_Fill)
  ```
- `VAlign`：垂直对齐方式。有效值为：

  ```cpp
  VAlign(VAlign_Top)
  VAlign(VAlign_Center)
  VAlign(VAlign_Bottom)
  VAlign(VAlign_Fill)
  ```

- `Padding`：边距。支持以下格式，数值类型均为 `float`

  ```cpp
  Padding(Uniform)
  Padding(Horizontal, Vertical)
  Padding(Left, Top, Right, Bottom)
  ```

实际上，在 Slate 的很多非布局类控件（如按钮，文本等）也会提供这几个属性，方便开发者灵活得调整各级控件对齐方式和边距。

## 固定尺寸 | SBox

可以将内部控件的尺寸指定为固定值

```cpp
SNew(SBox)
.HeightOverride(128)
.WidthOverride(128)
[
    SNew(...)
]
```

## 水平布局 | SHorizontalBox

基本的水平布局，默认总宽度继承自父级控件

```cpp
SNew(SHorizontalBox)
+ SHorizontalBox::Slot()
[
    SNew(...)
]
```

## 垂直布局 | SVerticalBox

基本的垂直布局，默认总宽度继承自父级控件

```cpp
SNew(SVerticalBox)
+ SVerticalBox::Slot()
[
    SNew(...)
]
```

## 滚动布局 | SScrollBox

滚动布局，可指定方向（水平或垂直）。当滚动方向上内容超出窗口时，自动激活滚动条。默认非滚动方向长度继承自父级控件，滚动方向长度由子控件决定

```cpp
SNew(SScrollBox)
.Orientation(Orient_Vertical)
+ SScrollBox::Slot()
[
    SNew(...)
]
```

## 层叠布局 | SOverlay

层叠布局。可以用于图片和文字等的叠加，也可配合子组件的 `Visibility` 属性实现内容切换。

```cpp
SNew(SOverlay)
+ SOverlay::Slot()
[
    SNew(...)
]
```

## 栅格布局 | SGridPanel

基本栅格布局。默认总长宽由子控件决定，未声明栅格将被忽略。

```cpp
SNew(SGridPanel)
+ SGridPanel::Slot(0,0)
[
    SNew(...)
]
+ SGridPanel::Slot(1,1)
[
    SNew(...)
]
```

## 统一栅格布局 | SUniformGridPanel

统一栅格布局，为所有子控件分配相同空间。默认总长宽继承自父级控件，未声明栅格不会被忽略，将会被当做空栅格处理

```cpp
SNew(SUniformGridPanel)
+ SUniformGridPanel::Slot(0,0)
[
    SNew(...)
]
+ SUniformGridPanel::Slot(1,1)
[
    SNew(...)
]
```

## 流布局 | SWrapBox

流布局，可指定方向（水平或垂直）。需设定 `UseAllottedSize(true)` 启用自动宽度限制。

```cpp
SNew(SWrapBox)
.UseAllottedSize(true)
.Orientation(Orient_Horizontal)
+ SWrapBox::Slot()
[
    SNew(...)
]
```

## 统一流布局 | SUniformWrapPanel

流布局，方向水平，为所有子控件分配相同空间。

```cpp
SNew(SUniformWrapPanel)
+ SUniformWrapPanel::Slot()
[
    SNew(...)
]
```

## 总结

以上是 Slate UI 提供的所有布局类控件，合理利用这些控件理论上可以组合出各种常用布局。
