# Unreal Slate UI

## 模块接口 | Module Interface

```cpp
class IModuleInterface {
public:
	virtual ~IModuleInterface() {}

	// Called after the module has been loaded and the module object has been created
	virtual void StartupModule() {}

	// Called before the module has been unloaded
	virtual void PreUnloadCallback() {}

	// Called after the module has been reloaded
	virtual void PostLoadCallback() {}

	// Called before the module is unloaded, right before the module object is destroyed.
	virtual void ShutdownModule() {}

	// Whether the module supports shutdown separate from the rest of the engine.
	virtual bool SupportsDynamicReloading() { return true; }

	// Whether the module supports shutdown on application exit
	virtual bool SupportsAutomaticShutdown() { return true; }

	// True for "gameplay modules", or false for engine code modules, plugins, etc.
	virtual bool IsGameModule() const { return false; }
};
```

## 通知弹窗 | Notification

```cpp
FNotificationInfo Info(FText::FromString(str));
FSlateNotificationManager::Get().AddNotification(Info);
```

## 进度条窗口 | Slow Task Progress Window

```cpp
FScopedSlowTask SlowTask(Objects.Num(), FText::FromString(TEXT("Task")));
SlowTask.MakeDialog(true);
for (auto object : Objects) {
    if (SearchTask.ShouldCancel()) {
        break;
    }
    // ...Do Something
    SlowTask.EnterProgressFrame();
};
```

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
