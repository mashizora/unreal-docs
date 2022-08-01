# Unreal Slate UI

## 控件类型 | Widget Type

`SLeafWidget` : 无 `Slot()` 成员，不包含子 `Widget`

`SPanel` : 通过子类实现 `Slot()` 结构，可包含多个子 `Widget`

`SCompoundWidget` : 有显式命名的 `Slot()` 成员，可包含数量固定的 `Widget`
