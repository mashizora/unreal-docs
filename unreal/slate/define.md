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
