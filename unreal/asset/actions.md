# AssetTypeActions

## 创建 AssetTypeActions

AssetTypeActions 由 `IAssetTypeActions` 接口定义，用于描述一个资产类型在编辑其中的各种行为。例如：显示名称、标签颜色、缩略图、类别等。

Unreal 已经内置了一些 `IAssetTypeActions` 实现，我们可以直接继承这些内置实现来快速构建 AssetTypeActions 。本文选择继承 `FAssetTypeActions_Base` 。

一般来说，至少还需实现以下四个方法：

```cpp
class FCustomAssetTypeActions : public FAssetTypeActions_Base {
public:
	virtual FText GetName() const override { return FText::FromString(TEXT("Custom Asset")); }
	virtual UClass* GetSupportedClass() const override { return UCustomAsset::StaticClass(); }
	virtual FColor GetTypeColor() const override { return FColor::Black; }
	virtual uint32 GetCategories() override { return EAssetTypeCategories::Misc; }
};
```

## AssetToolsModule

AssetTools 模块是 Unreal 的一个内置模块，该模块拥有一个全局单例，维护着所有资产和资产类型的各项状态，包括 AssetTypeActions 。我们可以通过 `FAssetToolsModule::Get()` 方法获得该实例，并向其注册和注销自定义的 AssetTypeActions 。

## 注册 AssetTypeActions

在 Unreal 模块的 `StartupModule()` 钩子中注册 AssetTypeActions

我们可能会在一个模块中自定义多个资产类型，在模块中定义一个 `AssetTypeActionsList` 用于记录已注册对象的指针，便于注销时查找。

```cpp
void FCustomAssetModule::StartupModule()
{
	auto& AssetToolsModule = FModuleManager::LoadModuleChecked<FAssetToolsModule>("AssetTools");
	auto& AssetTools = AssetToolsModule.Get();
	AssetTypeActionsList.Add(MakeShared<FCustomAssetTypeActions>());

	for (auto Actions : AssetTypeActionsList) {
		AssetTools.RegisterAssetTypeActions(Actions);
	}
}
```

## 注销 AssetTypeActions

在 Unreal 模块的 `ShutdownModule()` 钩子中注销 AssetTypeActions

需要注意的是，在 Unreal Editor 退出时，自定义模块的卸载往往迟于内置模块。此处须判断 `AssetToolsModule` 实例是否存在，否则可能会导致在引擎退出时因找不到 AssetTools 模块而引起的程序崩溃。

```cpp
void FCustomAssetModule::ShutdownModule()
{
	auto* AssetToolsModule = FModuleManager::GetModulePtr<FAssetToolsModule>("AssetTools");
	if (AssetToolsModule != nullptr) {
		auto& AssetTools = AssetToolsModule->Get();
		for (auto Actions : AssetTypeActionsList) {
			AssetTools.UnregisterAssetTypeActions(Actions);
		}
	}
}
```
