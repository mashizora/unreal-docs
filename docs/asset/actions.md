# 资产类型 Actions

## 关于 Actions

在 Unreal Editor 的内容浏览器中，每种资产类型都拥有一套由 `IAssetTypeActions` 派生类定义的 “行为” 。这套 “行为” 描述了该资产类型的显示名称、类别、标签颜色、右键菜单拓展等属性，同时定义了该资产类型适用何种资产编辑器。

本章节中，将用于定义特定资产类型 “行为” 的 `IAssetTypeActions` 派生类称作 Actions 。

## 声明 Actions

要使自定义资产类型被 Unreal Editor 的内容浏览器正确处理，需要为其声明一个 Actions 。

Unreal 已经定义了一些被内置资产类型使用的 Actions ，我们可以直接继承它们以简化代码。本文选择继承 `FAssetTypeActions_Base` ，这是很多 Unreal 内置资产类型 Actions 的基类，该类为 `IAssetTypeActions` 接口中定义的大多数虚函数提供了默认实现或空实现。

一般来说，至少还需实现以下四个方法以声明一个有效 Actions ：

```cpp
class FCustomAssetTypeActions : public FAssetTypeActions_Base {
public:
  virtual FText GetName() const override { return FText::FromString(TEXT("Custom Asset")); }
  virtual UClass* GetSupportedClass() const override { return UCustomAsset::StaticClass(); }
  virtual FColor GetTypeColor() const override { return FColor::Black; }
  virtual uint32 GetCategories() override { return EAssetTypeCategories::Misc; }
};
```

## 注册 Actions

在 Unreal Editor 中，所有资产类型的 Actions 由内置模块 AssetTools 的全局单例负责维护。可以通过 `FAssetToolsModule::Get()` 方法得到该实例，向其注册自定义资产类型的 Actions。

下面代码演示了在 Unreal 模块的 `StartupModule()` 钩子中注册 Actions ：

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

在实际插件开发过程中，一个模块可能会包含多个自定义资产类型。为便于管理这些资产类型 Actions 的注册状态，可以声明一个 `AssetTypeActionsList` 用于记录已注册 Actions 的指针。同时也便于注销 Actions 时获取已注册实例。

## 注销 Actions

下面代码演示了在 Unreal 模块的 `ShutdownModule()` 钩子中注销 Actions ：

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

需要注意的是，在 Unreal Editor 退出时，自定义模块的卸载往往迟于内置模块，导致该函数调用时找不到 AssetTools 模块。注销 Actions 前须判断 `AssetToolsModule` 是否存在，否则可能会在 Unreal Editor 退出时引起崩溃。
