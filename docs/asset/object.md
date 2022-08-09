# 资产类型 Object

## 资产对象

在 Unreal Engine 中，资产对象是派生自 `UObject` 的类的实例。一个资产对象的数据存储在一个 `UObject` 实例上。相较于其他 Unreal 对象，资产对象只是通过相关接口实现了编辑器和资产管理等功能，并无本质上的区别。

## 创建资产类型容器

要创建资产类型，首先需要声明一个派生自 `UObject` 的类作为该资产对象的容器，并在其中定义该资产类型的成员属性。

声明用作资产类型容器的 `UObject` 类与声明普通 `UObject` 类无任何区别：

```cpp
UCLASS()
class UCustomAsset : public UObject {
  GENERATED_BODY()

public:
  UPROPERTY(EditAnywhere, BlueprintReadWrite)
  bool TestBool;
};
```

与其他 Unreal C++ Class 相同，对希望在 Unreal Editor 的资产编辑器中显示的成员属性使用 `UPROPERTY()` 宏声明可见性和其他编辑器相关属性。
