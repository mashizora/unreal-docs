# Commands 系统

Commands 系统是 Unreal Editor 的一个重要组成部分，该系统将视图层命令（如复制粘贴、开始暂停、窗口切换等）进行封装，实现了命令全局管理、热键绑定、拖拽支持等特性，同时使得这些命令易于跨组件访问和复用。

Commands 系统主要涉及以下几个类：

- `TCommands<>` ：若干条视图层命令的集合，负责命令的基本信息注册与生命周期维护。
- `FUICommandInfo` ：描述视图层命令的基本信息。
- `FUIAction` ：描述视图层命令的动作信息。
- `FUICommandList` ：记录视图层命令基本信息与动作信息间的绑定关系。

此外，Commands 系统还涉及 `FUICommandDragDropOp` `FInputChord` 等与拖拽和热键相关的类。

在本节中，为了表述的简洁性，做出以下命名约定：

- 将特定 `TCommands<>` 派生类称作 Commands 。
- 将特定 `FUICommandInfo` 实例称作 Command 。
- 将特定 `FUIAction` 实例称作 Action 。
- 将特定 `FUICommandList` 实例称作 CommandList 。

下面演示如何向 Unreal Editor 添加自定义视图层命令。

## 声明 Commands

声明一个 Commands 并实现构造函数。每个 Commands 可包含任意个 Command 。

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

至少还需为该 Commands 实现 `RegisterCommands()` 方法，用于注册 Command 。可在该方法中使用 `UI_COMMAND()` 宏声明 Command 的信息。

```cpp
void FMyCommands::RegisterCommands() {
  UI_COMMAND(
    PluginAction,                         // Command
    "toolbar",                            // Name
    "Execute toolbar action",             // Description
    EUserInterfaceActionType::Button,     // Command Type
    FInputChord()                         // Input Chord
  );
}
```

## 注册 Commands

在使用 Command 之前，需要将其注册到 Unreal Editor 。注册操作分为两个部分：

- 向 Unreal Editor 的全局绑定管理系统注册 Commands 。
- 为 Command 绑定 Action 。

首先，在模块中创建一个 CommandList ，用于记录 Command 与 Action 的绑定关系：

```cpp
class FTestModule : public IModuleInterface {
public:
  virtual void StartupModule() override;
  virtual void ShutdownModule() override;

private:
  TSharedPtr<FUICommandList> PluginCommands;
};
```

然后在模块的 `StartupModule()` 钩子中注册 Command ：

```cpp
void FTestModule::StartupModule() {
  FMyCommands::Register();

  PluginCommands = MakeShared<FUICommandList>();
  PluginCommands->MapAction(
    FMyCommands::Get().PluginAction,   // Command
    FExecuteAction(),                  // Delegate: () -> void
  );
}
```

- `Register()` 方法会调用上文实现的 `RegisterCommands()` 方法，注册 Command 。
- `MapAction()` 方法将 Command 与 Action 绑定。该方法有多种重载形式。
