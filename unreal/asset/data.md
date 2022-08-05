# 创建容器

资产对象的数据存储在一个 `UObject` 上。要创建资产类型，首先需要设计一个派生自 `UObject` 的类，记录所有该类资产的内容信息。

```cpp
UCLASS()
class UCustomAsset : public UObject {
	GENERATED_BODY()

public:
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int32 TestInt;
};
```
