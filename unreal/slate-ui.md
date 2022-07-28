# Unreal Slate UI

## Slate 基类 | Slate Base Class

`SLeafWidget` : 无 `Slot()` 成员，不包含子 `Widget`

`SCompoundWidget` : 有 `Slot()` 成员，可包含一个子 `Widget`

`SPanel` : 通过子类实现 `Slot()` 结构，可包含多个子 `Widget`

## Slate 布局 | Slate Layout

水平和垂直布局 `SScrollBox` `SVerticalBox` `SHorizontalBox`

```cpp
SNew(SScrollBox)
+ SScrollBox::Slot()
[
    ...
]

SNew(SVerticalBox)
+ SVerticalBox::Slot()
[
    ...
]

SNew(SHorizontalBox)
+ SHorizontalBox::Slot()
[
    ...
]
```

栅格布局 `SUniformGridPanel`

```cpp
SNew(SUniformGridPanel)
+ SUniformGridPanel::Slot(0,0)
[
    ...
]
+ SUniformGridPanel::Slot(0,0)
[
    ...
]
```

层叠布局 `SOverlay`

```cpp
SNew(SOverlay)
+ SOverlay::Slot()
[
    ...
]
```

固定尺寸 `SBox`

```cpp
SNew(SBox)
.HeightOverride(128)
.WidthOverride(128)
[
    ...
]
```

流布局 `SWrapBox`

```cpp
SNew(SWrapBox)
+SWrapBox::Slot()
[
    ...
]
```

## 声明 Slate Widget

```cpp
// SMyCompoundWidget.h
DECLARE_DELEGATE_OneParam(FMyEvent, FString);

class EXSLATE_API SMyCompoundWidget : public SCompoundWidget {
public:
    SLATE_BEGIN_ARGS( SMyCompoundWidget )
        : _AttributeOne(false)
        , _AttributeTwo(0)
        {}

        SLATE_NAMED_SLOT( FArguments, FSimpleSlot, Content )

        SLATE_ATTRIBUTE( bool, AttributeOne )
        SLATE_ATTRIBUTE( int, AttributeTwo )

        SLATE_EVENT( FOnClicked, OnClicked )
        SLATE_EVENT( FMyEvent, MyEvent )

    SLATE_END_ARGS()

	SMyCompoundWidget(void);
	~SMyCompoundWidget();
    void Construct(const FArguments& InArgs)
};
```

```cpp
// SMyCompoundWidget.cpp
SMyCompoundWidget::SMyCompoundWidget() {}
SMyCompoundWidget::~SMyCompoundWidget() {}
void SMyCompoundWidget::Construct(const FArguments& InArgs) {
    ChildSlot
    [
        ...
    ]
}
```
