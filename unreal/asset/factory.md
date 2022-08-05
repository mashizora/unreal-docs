# 创建 Factory

在创建完自定义类后，Unreal 还不知道要以何种方式在编辑器中实例化该类。此处需要创建并绑定一个 Factory 类，在其中实现编辑器中的构造方法和行为等。

一般来说，至少需要指派以下属性，并实现 `FactoryCreateNew()` 方法：

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
