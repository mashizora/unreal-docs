# Slate 布局

## 关于 Slate 布局

布局是 UI 设计和开发的重要环节，了解 Slate UI 的布局方法是使用其构建 GUI 的基础。本章将详细介绍 Slate 核心库中的布局类控件。

## 通用布局属性

Slate UI 提供的布局控件和其 `Slot()` 方法多数包含以下布局属性：

- `HAlign`：水平对齐方式。枚举类型，有效值为：
  ```cpp
  .HAlign(HAlign_Left)
  .HAlign(HAlign_Center)
  .HAlign(HAlign_Right)
  .HAlign(HAlign_Fill)
  ```
- `VAlign`：垂直对齐方式。枚举类型，有效值为：

  ```cpp
  .VAlign(VAlign_Top)
  .VAlign(VAlign_Center)
  .VAlign(VAlign_Bottom)
  .VAlign(VAlign_Fill)
  ```

- `Padding`：边距。支持以下格式，数值类型为 `float`

  ```cpp
  .Padding(Uniform)
  .Padding(Horizontal, Vertical)
  .Padding(Left, Top, Right, Bottom)
  ```

实际上，在 Slate 的很多非布局类控件（如按钮，文本等）也会提供这几个属性，方便开发者灵活得调整各级控件对齐方式和边距。

## 固定尺寸

可以将内部控件的尺寸指定为固定值

```cpp
SNew(SBox)
.HeightOverride(128)
.WidthOverride(128)
[
    SNew(...)
]
```

## 水平布局

基本的水平布局，默认宽度均分，总宽度继承自父级控件。  
对子控件槽使用 `AutoWidth()` 可保留子控件宽度。

```cpp
SNew(SHorizontalBox)
+ SHorizontalBox::Slot()
// .AutoWidth()
[
    SNew(...)
]
```

## 垂直布局

基本的垂直布局，默认高度均分，总高度继承自父级控件。  
对子控件槽使用 `AutoHeight()` 可保留子控件高度。

```cpp
SNew(SVerticalBox)
+ SVerticalBox::Slot()
// .AutoHeight()
[
    SNew(...)
]
```

## 滚动布局

滚动布局，可指定方向（水平或垂直）。  
当滚动方向上内容超出窗口时，自动激活滚动条。  
默认非滚动方向长度继承自父级控件，滚动方向长度由子控件决定。

```cpp
SNew(SScrollBox)
.Orientation(Orient_Vertical)
+ SScrollBox::Slot()
[
    SNew(...)
]
```

## 层叠布局

层叠布局，可以用于图片和文字的叠加等场景。

```cpp
SNew(SOverlay)
+ SOverlay::Slot()
[
    SNew(...)
]
```

## 栅格布局

基本栅格布局，默认总长宽由子控件决定，未声明栅格将被忽略。

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

## 统一栅格布局

统一栅格布局，为所有子控件分配相同空间。  
默认总长宽继承自父级控件，未声明栅格不会被忽略，将会被当做空栅格处理

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

## 流布局

流布局，可指定方向（水平或垂直），保持子控件原尺寸。  
需设定 `UseAllottedSize(true)` 启用自动宽度限制。

```cpp
SNew(SWrapBox)
.UseAllottedSize(true)
.Orientation(Orient_Horizontal)
+ SWrapBox::Slot()
[
    SNew(...)
]
```

## 统一流布局

流布局，方向水平，为所有子控件分配相同宽度。

```cpp
SNew(SUniformWrapPanel)
+ SUniformWrapPanel::Slot()
[
    SNew(...)
]
```

## 分割布局

分割布局，可指定方向（水平或垂直）。使子控件的尺寸比例可调整，默认均分。

```cpp
SNew(SSplitter)
.Orientation(Orient_Horizontal)
+ SSplitter::Slot()
[
    SNew(...)
]
```

## 控件切换布局

控件切换布局，通过指定索引改变该控件显示的内容。

```cpp
SNew(SWidgetSwitcher)
.WidgetIndex_Lambda([=] { return index; })
+ SWidgetSwitcher::Slot()
[
    SNew(...)
]
```

## 空白

空白，可调整尺寸，用于构建空白的控件槽，常用于大间距控制或对齐控制。

```cpp
SNew(SSpacer)
.Size(FVector2d(100.f, 50.f))
```

## 分隔

分隔，可指定方向和宽度。

```cpp
SNew(SSeparator)
.Orientation(Orient_Vertical)
.Thickness(1.0f)
```

## 总结

以上是 Slate UI 提供的常用布局类控件，合理利用这些控件理论上可以组合出各种布局。
