# 细节面板

## 关于细节面板

细节面板（Details Panel）是 Unreal Editor 中的一个控件。主界面的细节窗口、设置界面的选项列表、资产编辑器中的属性列表等都是使用细节面板构建的。细节面板绑定一个或多个 `UObject` 实例作为数据对象，获取其属性并创建属性列表。我们可以使用它方便地查看和修改任何有效 `UObject` 实例的属性。

本章节将讲解细节面板控件的使用。

## 视图层容器

`IDetailsView` 是细节面板视图层的接口类，派生自 `SCompoundWidget` 。该类不能使用 `SNew()` 直接实例化，而是通过 Property Editor 模块构造控件实例。

为便于演示，下面声明一个无 Slate 属性的控件类型，作为细节面板的视图层容器：

```cpp
class SMyDetails : public SCompoundWidget
{
public:
  SLATE_BEGIN_ARGS(SMyDetails) {}
  SLATE_END_ARGS()

  void Construct(const FArguments& InArgs);
private:
  TSharedPtr<IDetailsView> Details;
};
```

该类拥有一个 `TSharedPtr<IDetailsView>` 私有成员，用于存储细节面板控件实例。

## 数据层容器

细节面板可以绑定任一有效的 `UObject` 实例。在开发插件时，可以使用它编辑场景中的对象，也使用它编辑自定义表单。首先定义一个简单的 `UClass`：

```cpp
UCLASS()
class UTestClass : public UObject {
  GENERATED_BODY()
public:
  UPROPERTY(EditAnywhere, Category="Test")
  int32 TestInt;

  UPROPERTY(EditAnywhere, Category="Test")
  UTexture2D* TestTexture;
};
```

然后获取该类的 `ClassDefaultObject` 作为细节面板的数据层容器，便于演示：

```cpp
const auto ClassDefaultObject = UTestClass::StaticClass()->GetDefaultObject(true);
```

## 自定义细节面板

下面定义一个 `IDetailCustomization` 的派生类，用于自定义细节面板。`CustomizeDetails()` 方法会在实例化细节面板时被调用，可以修改细节面板或在细节面板中添加控件。

```cpp
class FMyDetails : public IDetailCustomization {
public:
  static TSharedRef<IDetailCustomization> MakeInstance();
  virtual void CustomizeDetails(IDetailLayoutBuilder& DetailBuilder) override;
};
```

实现：

```cpp
TSharedRef<IDetailCustomization> FMyDetails::MakeInstance() {
  return MakeShared<FMyDetails>();
}

void FMyDetails::CustomizeDetails(IDetailLayoutBuilder& DetailBuilder) {
  IDetailCategoryBuilder& Category = DetailBuilder.EditCategory(TEXT("Test"));

  TArray<TWeakObjectPtr<UObject>> Objects;
  DetailBuilder.GetObjectsBeingCustomized(Objects);
  Category.AddCustomRow(FText::FromString(TEXT("CustomDetails")))
      .WholeRowContent()
      [
        SNew(SButton).Text(FText::FromString(TEXT("CustomDetails")))
      ];
}
```

注册自定义属性到细节面板控件：

```cpp
Details->RegisterInstancedCustomPropertyLayout(
  UMyClass::StaticClass(),
  FOnGetDetailCustomizationInstance::CreateStatic(&FMyDetails::MakeInstance)
);
```

## 自定义根对象

在 Unreal Editor 设置界面中，每个选项大类前都有一个带有分类描述和导入导出按钮的可折叠标题栏。这里的标题栏是通过 `IDetailRootObjectCustomization` 接口实现的。该接口用于自定义细节面板中根对象的属性。该接口定义了如下方法：

- `ShouldDisplayHeader()`：设置标题栏可见性
- `CustomizeObjectHeader()`：自定义标题栏内容
- `AreObjectsVisible()`：设置根对象可见性
- `GetExpansionArrowUsage()`：设置是否启用折叠功能

下面演示声明一个 `IDetailRootObjectCustomization` 的派生类：

```cpp
class FMyDetailsRootObjectCustomization : public IDetailRootObjectCustomization {
public:
  virtual TSharedPtr<SWidget> CustomizeObjectHeader(
    const FDetailsObjectSet& InRootObjectSet,
    const TSharedPtr<ITableRow>& InTableRow
  ) override {
    const auto ObjectName = InRootObjectSet.RootObjects[0]->GetName();
    return SNew(STextBlock).Text(FText::FromString(ObjectName));
  }

  virtual bool ShouldDisplayHeader(const UObject* InRootObject) const override {
    return true;
  }

  virtual EExpansionArrowUsage GetExpansionArrowUsage() const override {
    return EExpansionArrowUsage::Default;
  }
};
```

将该类的实例注册到细节面板控件，实现为细节面板根对象添加可折叠的标题栏：

```cpp
Details->SetRootObjectCustomizationInstance(MakeShared<FMyDetailsRootObjectCustomization>());
```

## 实例化控件

下面是该控件的实现：

```cpp
void SMyDetails::Construct(const FArguments& InArgs) {
  auto& PropertyEditor = FModuleManager::GetModuleChecked<FPropertyEditorModule>("PropertyEditor");
  FDetailsViewArgs DetailsViewArgs;
  Details = PropertyEditor.CreateDetailView(DetailsViewArgs);
  Details->RegisterInstancedCustomPropertyLayout(
    UMyClass::StaticClass(),
    FOnGetDetailCustomizationInstance::CreateStatic(&FMyDetails::MakeInstance)
  );
  Details->SetRootObjectCustomizationInstance(MakeShared<FMyDetailsRootObjectCustomization>());
  Details->SetObject(UTestClass::StaticClass()->GetDefaultObject(), true);

  ChildSlot
  [
    Details.ToSharedRef()
  ];
}
```

以上代码实现了在该控件构造时实例化一个细节面板控件，并为其绑定当前选中的 Actor 对象。该过程主要分为以下几个部分：

- 使用 Property Editor 模块的 `CreateDetailView()` 方法构造细节面板控件实例。
- 为细节面板控件注册派生自 `IDetailCustomization` 的细节面板自定义属性实例。
- 为细节面板控件注册派生自 `IDetailRootObjectCustomization` 的根对象自定义属性实例。
- 使用 `IDetailsView` 的 `SetObject()` 或 `SetObjects()` 方法为细节面板控件绑定数据对象。
- 将细节面板控件实例的智能指针转换为智能引用，作为该控件的 Slate 表达式。

## 总结

得益于 `UObject` 完善的反射机制和细节面板系统相对易用的 API 设计，我们可以很容易地实现对象属性的可视化编辑。

至于为何不提供与其他 Slate 控件一致的 API ，个人认为可能有以下几个原因：

- 细节面板涉及过多子组件，较为复杂，设计成 Slate 组合式表达式不会提高易用性。
- 大多情况下，细节面板与一个 `UObject` 实例数据绑定，手动构建控件会使表达式冗长。
- 细节面板是 Unreal Editor 的一个核心组件，重构并不现实。
