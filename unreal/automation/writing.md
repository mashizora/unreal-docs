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

## 关于资产对象的名称和路径

### 获取当前选中 Assets

`UEditorUtilityLibrary` 提供了两种获取编辑器中当前选中资产对象的 API ，分别为：

```cpp
UEditorUtilityLibrary::GetSelectedAssets();     // () -> TArray<UObject*>
UEditorUtilityLibrary::GetSelectedAssetData();  // () -> TArray<FAssetData>
```

两者均通过 `FContentBrowserModule` 获取当前选中资产的 `FAssetData` ，区别在于：

- `GetSelectedAssetData()` 在得到 `FAssetData` 后直接返回。
- `GetSelectedAssets()` 使用 `FAssetData` 查找相应的 `UObject` 并返回。

### 资产对象的名称和路径

`FAssetData` 是一个记录已加载资产信息的结构体，拥有以下名称和路径属性：

- `ObjectPath` : 完整对象路径，形如 `/Game/Path/Package.ObjectName`
- `PackageName` : 包名（含路径），形如 `/Game/Path/Package`
- `PackagePath` : 包路径（不含包名），形如 `/Game/Path`
- `AssetName` : 资产名，对于资产对象，一般与对象名一致
- `AssetClass` : 资产类名，Unreal Editor 中的资产类型名

上述属性均为 `FName` 类型，可以使用 `ToString()` 方法获取相应的字符串。

此外，也可通过 `UObject` 提供的通用 API 获取资产对象的名称和路径属性，下面给出一组方法：

```cpp
auto ObjectPath = Object->GetPathName();
auto PackageName = Object->GetPackage()->GetName();
int32 index;
ObjectPath.FindLastChar('/', index);
auto PackagePath = ObjectPath.Left(index);
auto AssetName = Object->GetName();
auto AssetClass = Object->GetClass()->GetName();
```

## 获取当前选中 Actors

Editor Scripting Utilities 插件已在 Unreal 5.0 中标记为 Deprecated。不建议使用该插件中 `UEditorLevelLibrary` 提供的 API，建议使用 Subsystem API。

```cpp
auto SelectedActors = GEditor
        ->GetEditorSubsystem<UEditorActorSubsystem>()
        ->GetSelectedLevelActors();
```

## 资产导入

在 Unreal Editor 中，资产的导入由 Import Subsystem 完成。我们可以使用该系统触发导入操作。

```cpp
GEditor->GetEditorSubsystem<UImportSubsystem>()->ImportNextTick(Files, Path);
```

Import Subsystem 同时开放了一组可以干预资产导入过程的代理：

```cpp
DECLARE_MULTICAST_DELEGATE_FiveParams(FOnAssetPreImport,
        UFactory*,UClass*, UObject*, const FName&, const TCHAR*);
DECLARE_MULTICAST_DELEGATE_TwoParams(FOnAssetPostImport, UFactory*, UObject*);
DECLARE_MULTICAST_DELEGATE_OneParam(FOnAssetReimport, UObject*);
DECLARE_MULTICAST_DELEGATE_TwoParams(FOnAssetPostLODImport, UObject*, int32);

FOnAssetPreImport OnAssetPreImport;
FOnAssetPostImport OnAssetPostImport;
FOnAssetReimport OnAssetReimport;
FOnAssetPostLODImport OnAssetPostLODImport;
```

我们可以通过为以上代理绑定自定义函数的方式干预资产导入过程。

```cpp
GEditor->GetEditorSubsystem<UImportSubsystem>()
       ->OnAssetReimport.AddLambda([](UObject* Object) {...});
```

也可以广播以上代理调用导入模块。

```cpp
GEditor->GetEditorSubsystem<UImportSubsystem>()->BroadcastAssetReimport(Object);
```
