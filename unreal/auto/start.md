# Start Auto

这一部分主要围绕 Unreal Editor 中的自动化操作展开

## Asset Action Utility

`UAssetActionUtility` 是 Unreal Editor 中 `Blutility` 模块的一个工具类。

在该类的所有派生类中，只要将成员函数通过 `UFUNCTION(CallInEditor)` 暴露给编辑器，该函数入口将会自动添加到资产右键菜单的 Scripted Asset Actions 子菜单中。并且对于需要传入参数的函数，编辑器会以对话框的形式向用户收集参数。

> 此菜单注册操作由 `FBlutilityMenuExtensions::CreateBlutilityActionsMenu()` 实现。在 `FBlutilityContentBrowserExtensions` 类中完成注册。

## Editor Utility Library 函数库

`UEditorUtilityLibrary` 是 Unreal Editor 中 `Blutility` 模块的一个工具函数库。该函数库提供了如下工具函数，可以方便地获取一些编辑器当前状态。

```cpp
GetSelectionSet();
GetSelectionBounds(FVector& Origin, FVector& BoxExtent, float& SphereRadius);
GetSelectedAssets();
GetSelectedBlueprintClasses();
GetSelectedAssetData();
RenameAsset(UObject* Asset, const FString& NewName);
GetActorReference(FString PathToActor);
GetCurrentContentBrowserPath(FString& OutPath);
```
