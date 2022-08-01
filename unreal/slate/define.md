# 定义控件

## 为什么要定义控件

Unreal 的 Slate 库为我们提供了构建 Unreal Editor 所使用的所有控件，一般来说可以满足绝大多数工具的开发需求。

一般在以下两种情况下，我们希望能定义自己的控件：

- 复杂的应用场景下，不能从 Slate 库中找到合适的控件
- 希望将基本控件的组合封装成新控件以便复用

## 声明 Slate Widget

Unreal 提供了一组用于定义控件的宏，使得我们可以用声明式语法来快速的描述一个新控件，而无需处理定义的内部细节。

下面是一个使用声明式语法定义控件 `SMyCompoundWidget` 的例子：

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

此段代码实现了定义一个组合控件，可以在 `ChildSlot[]` 中描述此控件的内容

## 完全自定义控件

TODO: 该部分需要覆写 `SWidget` 渲染相关函数，属于 Slate 高级用法，现阶段不列入本文档中。如有需求可直接查阅源码学习。
