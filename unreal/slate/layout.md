## 布局 | Layout

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
