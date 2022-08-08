# 资产类型 Factory

## 关于 Factory

在 Unreal Editor 的内容浏览器中右键或点击工具栏的 Add 按钮，选择资产类型，Unreal Editor 会在当前目录创建一个该资产类型的实例。这一实例化过程是由 `UFactory` 的派生类完成的。

`UFactory` 主要用于定义资产在 Unreal Editor 中的实例化方法和实例化后的行为。

本章节中，将用于构造特定资产类型的 `UFactory` 派生类称作 Factory 。

## 声明 Factory

我们自定义的资产类型还没有相应的 Factory 为其实现 Unreal Editor 中的实例化方法，所以暂时不能被 Unreal Editor 识别为资产类型。我们需要为自定义资产类型声明一个 Factory 。

以下代码为自定义的资产类型声明一个 Factory ，该 Factory 至少需要指派以下 3 个属性，并重写 `FactoryCreateNew()` 方法：

```cpp
UCLASS()
class UCustomAssetFactory : public UFactory {
	GENERATED_BODY()

public:
	UCustomAssetFactory() {
		bCreateNew = true;
		bEditAfterNew = true;
		SupportedClass = UCustomAsset::StaticClass();
	}
	virtual UObject* FactoryCreateNew(
        UClass* InClass,
        UObject* InParent,
        FName InName,
        EObjectFlags Flags,
        UObject* Context,
        FFeedbackContext* Warn
    ) override;
};
```

## 实现 FactoryCreateNew()

实现该 Factory 的 `FactoryCreateNew()` 方法。该方法即为自定义资产类型在 Unreal Editor 中的实例化方法。

下面给出一种使用 `NewObject<>()` 实例化资产类型的最小实现：

```cpp
UObject* UCustomAssetFactory::FactoryCreateNew(
	UClass* InClass,
	UObject* InParent,
	FName InName,
	EObjectFlags Flags,
	UObject* Context,
	FFeedbackContext* Warn
) {
	return NewObject<UCustomAsset>(InParent, InClass, InName, Flags);
}
```
