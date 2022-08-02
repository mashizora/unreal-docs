# 细节面板

## 关于细节面板

细节面板（Details Panel）是 Unreal Editor 中很常用的一个控件。编辑器主界面中细节窗口、设置窗口中的选项列表、各种资源编辑器中的属性列表等都是使用细节面板系统构建的。

细节面板可以绑定一个 UObject 对象，获取其属性并创建属性列表。我们可以使用它方便地查看和修改 Unreal Engine 内任一有效 `UObject` 实例的属性；也可在插件中构建自定义的细节面板，查看和修改自定义表单。

与之前介绍的 Slate 基础控件不同，细节面板不能使用 `SNew()` 直接实例化，而是通过 `PropertyEditorModule` 提供的构建方法创建。

本章节将以在插件中嵌入自定义 `UObject` 的属性为例，讲解细节面板控件的使用。

## 使用细节面板

下例展示一个可以显示当前选中 `Actor` 属性的细节面板。

```cpp
auto SelectedActors = GEditor
        ->GetEditorSubsystem<UEditorActorSubsystem>()->GetSelectedLevelActors();
if (SelectedActors.Num() > 0) {
    TArray<UObject*> SelectedObjects;
    for (const auto Actor : SelectedActors) {
        auto Object = Cast<UObject>(Actor);
        SelectedObjects.Add(Object);
    }
    ConfigPanel->SetObjects(SelectedObjects, true);
}
```

## 准备属性容器

细节面板可以绑定任一有效的 `UObject` 实例。在插件开发场景下，我们使用它来可视化编辑自定义表单。以下代码定义了一个简单的 `UClass`，我们将使用其 `ClassDefaultObject` 作为数据对象绑定到细节面板。

```cpp
UCLASS()
class UTestClass : public UObject {
	GENERATED_BODY()
public:
	UPROPERTY(EditAnywhere, Category="TestCate_0")
	int32 TestInt;

	UPROPERTY(EditAnywhere, Category="TestCate_0")
	UTexture2D* TestTexture;

	UPROPERTY(EditAnywhere, Category="TestCate_1")
	UMaterial* TestMaterial;
};
```

## 创建 Slate 控件

创建细节面板 Slate 控件，并将准备好的属性容器绑定到细节面板。

```cpp
const FDetailsViewArgs DetailsViewArgs(true);
Details = FModuleManager::GetModuleChecked<FPropertyEditorModule>("PropertyEditor")
        .CreateDetailView(DetailsViewArgs);
Details->SetObject(UTestClass::StaticClass()->GetDefaultObject(true), true);
```

## 使用细节面板控件

通过上述方法创建的细节面板控件将返回其智能指针。之前的章节中提到过，Slate 组合式表达式中的 `SNew()` 宏本质上是使用智能引用实例化控件，所以要将细节面板嵌入到 Slate 的表达式中，仅需将其转换为智能指针。

```cpp
SNew(SVerticalBox)
+ SVerticalBox::Slot()
[
    Details.ToSharedRef()
]
```

## 总结

得益于 `UObject` 完善的反射机制和细节面板系统相对易用的 API 设计，我们可以很容易地实现对象属性的可视化编辑。

至于为何不提供与其他 Slate 控件一致的 API ，个人认为可能有以下几个原因：

- 细节面板涉及过多子组件，较为复杂，设计成 Slate 组合式表达式不会提高易用性。
- 大多情况下，细节面板与一个 `UObject` 实例数据绑定，手动构建控件会使表达式冗长。
- 细节面板是 Unreal Editor 的一个核心组件，重构并不现实。
