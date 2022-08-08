# 拓展 Tab

## 认识 Tab

在 Unreal Editor 的 UI 框架下，所有窗口都是以 Tab 或 Tab 组合的形式呈现的，每个 Tab 均可任意组合和停靠。这一设计使得 Unreal Editor 在自定义布局上有着极高的自由度。

在 Unreal Editor 中，单例对象 `FGlobalTabmanager` 管理着所有编辑器中的全局 Tab，可以通过该对象方便地添加自定义 Tab 。

## 注册 Tab

`FTabManager` 拥有两个记录 Tab 信息的成员：

```cpp
FTabSpawner TabSpawner;
TSharedRef<FTabSpawner> NomadTabSpawner;
```

相应的，也拥有两个将 Tab 注册到 `FTabManager` 的方法：

```cpp
FGlobalTabmanager::Get()->RegisterTabSpawner(
    TabName,           // Name
    FOnSpawnTab(),     // Delegate: (const FSpawnTabArgs&) -> TSharedRef<SDockTab>
    FCanSpawnTab()     // Delegate: (const FSpawnTabArgs&) -> bool
);

FGlobalTabmanager::Get()->RegisterNomadTabSpawner(
    TabName,           // Name
    FOnSpawnTab(),     // Delegate: (const FSpawnTabArgs&) -> TSharedRef<SDockTab>
    FCanSpawnTab()     // Delegate: (const FSpawnTabArgs&) -> bool
);
```

二者的注册行为基本相同，主要差异体现在：

- `TabSpawner` 使用原生指针，重复注册同一 TabId 时会抛出异常并直接返回
- `NomadTabSpawner` 使用智能指针，重复注册同一 TabId 时会自动注销旧实例并创建新实例

更多细节可参考：`Runtime\Slate\Private\Framework\Docking\TabManager.cpp`

对于一般插件开发，我们往往需要构建一个独立 Tab 。此时可优先考虑将插件的 Tab 注册到 `FGlobalTabmanager` 的 `NomadTabSpawner` 中。实际上，Unreal 提供的官方插件工程模板也是这样做的。

## Tab 属性

在完成 Tab 的注册后，注册函数会返回一个 `FTabSpawnerEntry&` ，我们可以通过此 Entry 设置 Tab 的属性。例如：

```cpp
FTabSpawnerEntry& Entry = FGlobalTabmanager::Get()->RegisterNomadTabSpawner(...);
Entry.SetDisplayName(LOCTEXT("TabTitle", "WindowPlugin"));
Entry.SetMenuType(ETabSpawnerMenuType::Hidden);
```

所有 SetProperty 函数均返回当前 `FTabSpawnerEntry&` ，所以也可使用链式操作：

```cpp
FGlobalTabmanager::Get()->RegisterNomadTabSpawner(...)
    .SetDisplayName(LOCTEXT("TabTitle", "WindowPlugin"))
    .SetMenuType(ETabSpawnerMenuType::Hidden);
```

全部可配置属性参考：`Runtime\Slate\Private\Framework\Docking\TabManager.h`

## 唤起 Tab

我们可以使用如下方法来唤起一个已在 `FGlobalTabmanager` 中注册的全局 Tab ：

```cpp
FGlobalTabmanager::Get()->TryInvokeTab(FName("OutputLog"));
```

通过 `FTabManager::TryInvokeTab()` 方法唤起一个 Tab 的规则如下：

- 若 Tab 已实例化：
  - Window 处于打开状态时：聚焦 Window
  - Window 处于关闭状态时：恢复 Window
- 若 Tab 未实例化：
  - 有已实例化的同类 Tab 时：在同类 Tab 的 Window 中打开
  - 无已实例化的同类 Tab 时：新建 Window 并打开

## 注销 Tab

注销 Tab 时，使用与注册相应的 API 即可：

```cpp
FGlobalTabmanager::Get()->UnregisterTabSpawner(TabName);

FGlobalTabmanager::Get()->UnregisterNomadTabSpawner(TabName);
```
