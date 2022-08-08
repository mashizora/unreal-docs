# 资产编辑器

编写中...

前文提到 `Actions` 定义了该资产类型适用何种资产编辑器。实际上

在 `FAssetTypeActions_Base` 中，实现了为资产创建默认的资产编辑器

```cpp
void FAssetTypeActions_Custom::OpenAssetEditor(
	const TArray<UObject*>& InObjects,
	TSharedPtr<IToolkitHost> EditWithinLevelEditor
) {
	FSimpleAssetEditor::CreateEditor(EToolkitMode::Standalone, EditWithinLevelEditor, InObjects);
}
```

当需要自定义资产编辑器时，需要重写该方法。

可以继承 `FAssetEditorToolkit` 类设计自定义资产编辑器。
