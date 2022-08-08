# Unreal 智能指针

[官方文档](https://docs.unrealengine.com/5.0/zh-CN/smart-pointers-in-unreal-engine/)

Unreal 没有使用 C++ 标准库中的智能指针，而是自定义了一套智能指针库。相较于标准库实现，Unreal 智能指针库有如下特点：

- 语法简洁：使用方法与标准库类似，并且实现了智能引用。
- 可选的线程安全：提供线程安全实现供开发者选择，关闭可获得更快的速度。
- 全平台支持：C++ 标准库不能提供全游戏平台的支持。
- 低内存占用：64-bit 系统下内存占用仅为 16 字节，两倍原生指针大小。
- 无外部依赖：完全由 Unreal 核心库和 C++ 原生语法实现。

## 基本模板类

`TSharedRef<>`

- 智能引用，拥有与 C++ 引用相似的特性，但实现方式仍为对原生指针的拓展
- 非空，构造时需传入有效对象
- 参与引用计数，拥有所有权

`TSharedPtr<>`

- 智能指针，拥有与 C++ 指针相似的特性，实现方式为对原生指针的拓展。
- 参与引用计数，拥有所有权

`TWeakPtr<>`

- 弱指针，拥有与 C++ 指针相似的特性，实现方式为对原生指针的拓展。
- 不参与引用计数，不拥有所有权

从性能和安全性的角度考虑，在可使用智能引用的场景下，应优先选择使用智能引用。

## 引用计数控制器

Unreal 智能指针的引用计数表由 `ReferenceController` 维护，大小仅 16 字节。每个控制器拥有 `SharedReferenceCount` 和 `WeakReferenceCount` 两个计数器，分别记录智能指针（或引用）与弱指针的数量。

一个智能指针控制器的生命周期如下：

- 实例化：在 `ReferenceController` 对象被构造时，两个计数器的值均初始化为 `1`
- 增加计数：
  - 在智能指针（或引用）的拷贝构造函数中增加计数器 `SharedReferenceCount` 计数
  - 在弱指针的拷贝构造函数中增加计数器 `WeakReferenceCount` 计数
- 减少计数：
  - 在智能指针（或引用）的析构函数中减少计数器 `SharedReferenceCount` 计数
  - 在弱指针的析构函数中减少计数器 `WeakReferenceCount` 计数
- 释放：当计数器 `SharedReferenceCount` 减少至 `0` 时，意味着当前引用对象已经没有有效的智能指针（或引用）存在。控制器将调用 `DestroyObject()` 方法释放引用对象，同时释放指向该对象的所有弱指针与控制器本身。`DestroyObject()` 方法默认使用 `delete` 操作符释放对象，也可在智能指针构造时传入自定义的 Deleter 。

## 工具函数

`MakeShared<>()` 注册智能指针，将控制器和引用对象初始化在连续的内存上

`MakeSharable()` 转换原生指针为智能指针

`TSharedPtr::Reset()` 强制释放引用对象和控制器

`StaticCastSharedRef()` `ConstCastSharedRef()` 智能引用类型转换

`StaticCastSharedPtr()` `ConstCastSharedPtr()` 智能指针类型转换
