# Commands

## 关于 Commands

Commands 是 Unreal Editor 中的一个重要概念，可以将其理解为对 “UI 行为” 的抽象和封装。Unreal Editor 中 UI 控件的名称、描述、触发动作等均由 Commands 系统管理。

Commands 系统主要由如下几个类实现：

- `FUICommandInfo` ：描述 Command 的基本信息。
- `TCommands<>` ：持有一组 `FUICommandInfo`，负责 Command 的注册与生命周期维护。
- `FUICommandList` ：记录 Command 和 Action 的绑定关系。

初看有些复杂，可以将 `TCommands<>` 理解为对若干个 Command 的封装，其中每个 Command 均由 `FUICommandInfo` 定义，这两者共同实现了 Command 基本信息的注册与生命周期维护，但未定义 UI 动作相关信息。`FUICommandList` 将 `FUICommandInfo` 与 Action 绑定，从而实现一个有效的 Command 。

下面将演示如何向 Unreal Editor 添加有效的自定义 Command 。

在本章节中，将维护一组 `FUICommandList` 的 `TCommands<>` 的派生类称作 Commands

## 声明 Commands

声明一个 Commands ，每个 Commands 可包含多个 `FUICommandInfo` 用于记录多个 Command 基本信息。

```cpp
class FMyCommands : public TCommands<FMyCommands> {
public:
  FMyCommands() : TCommands<FMyCommands>(
    TEXT("MyCommand"),                                   // Name
    NSLOCTEXT("Contexts", "MyCommand", "My Command"),    // Description
    NAME_None,                                           // Parent Name
    FMyStyle::GetStyleSetName()                          // Style Set Name
  ) {}

  virtual void RegisterCommands() override;
  // Commands List
  TSharedPtr<FUICommandInfo> PluginAction;
  TSharedPtr<FUICommandInfo> AnotherAction;
};
```

至少需要为该 Commands 实现 `RegisterCommands()` 方法，该方法在 `Register()` 函数中被调用，用于注册 Command 基本信息。可以在 `RegisterCommands()` 中使用 `UI_COMMAND()` 宏声明 Command 基本信息。

```cpp
void FMyCommands::RegisterCommands() {
  UI_COMMAND(
    PluginAction,                         // Command: FUICommandInfo
    "toolbar",                            // Name
    "Execute toolbar action",             // Description
    EUserInterfaceActionType::Button,     // Command Type
    FInputChord()                         // Input Chord: default
  );
}
```

## 注册 Commands

在使用 Command 之前，需要向 Editor 的全局 Commands 实例注册自定义 Command，一般在模块启动的 `StartupModule()` 钩子中完成。仅需调用 `Register()` 方法即可完成注册。上文实现的 `RegisterCommands()` 会在 `Register()` 内部被调用。

```cpp
FMyCommands::Register();
```

## 绑定 Action

为已经创建好的 Command 绑定 Action ：

```cpp
FMyCommands::Register();    // RegisterCommands() will be called in Register()
PluginCommands = MakeShared<FUICommandList>();
PluginCommands->MapAction(
  FMyCommands::Get().PluginAction,   // Command: FUICommandInfo
  FExecuteAction(),                  // Delegate: () -> void
  FCanExecuteAction()                // Delegate: () -> bool
);
```

- `FExecuteAction` ：为此 Command 绑定操作
- `FCanExecuteAction` ：设置此 Command 是否有效

## 总结

要向 Unreal Editor 添加 Command，需要如下几个步骤：

- 创建 `TCommands<>` 对象，添加 `FUICommandInfo` 成员
- 实现 `TCommands<>` 对象的 `RegisterCommands()` 函数（设置 `FUICommandInfo` 注册信息）
- 调用 `TCommands<>` 对象的 `Register()` 函数，注册其管理的 Command
- 实例化 `FUICommandList`，为 `FUICommandInfo` 绑定 `ExecuteAction` 等信息

在完成 `FUICommandList` 初始化后，可通过 `UToolMenus` 将 Command 添加到 Unreal Editor 的任一工具栏或菜单中
