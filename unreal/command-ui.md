# Unreal Command UI

Commands 涉及如下几个概念:

`FUICommandInfo` 用于描述一个 Command 的信息

`TCommands<>` 记录一组 Commands 信息的类，负责 Commands 的注册和生命周期维护

`FUICommandList` 拥有一组记录 Command 和 Action 绑定关系的 Map

Commands 初始化步骤为:

- 创建 `TCommands<>` 对象

- 实现 `RegisterCommands()` 方法（即初始化 `FUICommandInfo` 属性）

- 在插件加载 Hook 中调用 `TCommands<>::Register()` 方法注册 Commands

- 实例化 `FUICommandList` 并为 `FUICommandInfo` 绑定 `ExecuteAction`

在完成 `FUICommandList` 初始化后，可通过 `UToolMenus` 将 Command 添加到 Unreal Editor 的工具栏中

## 创建 Commands

创建并初始化 Commands 对象，一个 Commands 可包含多个 Command（`FUICommandInfo`）

```cpp
// MyCommand.h
class FMyCommands : public TCommands<FMyCommands> {
public:
    // TCommand<>(): inherit from FBindingContext()
	FtoolbarCommands() : TCommands<FMyCommands>(
        TEXT("MyCommand"),                                 // Name
        NSLOCTEXT("Contexts", "MyCommand", "My Command"),  // Description
        NAME_None,                                         // Parent Name
        FMyStyle::GetStyleSetName()                        // Style Set Name
    ) {}

    // Implement TCommands<>::RegisterCommands()
	virtual void RegisterCommands() override;

public:
    // Commands List: A FUICommandInfo is a command action
	TSharedPtr<FUICommandInfo> PluginAction;
};
```

```cpp
// MyCommand.cpp
void FMyCommands::RegisterCommands()
{
	UI_COMMAND(
        PluginAction,                      // Command: FUICommandInfo
        "toolbar",                         // Name
        "Execute toolbar action",          // Description
        EUserInterfaceActionType::Button,  // Command Type
        FInputChord()                      // Input Chord: default
    );
}
```

## 注册 Commands

为已经创建好的 Command 绑定 Action

- `FExecuteAction` 事件处理此 Command 需要绑定的操作

- `FCanExecuteAction` 事件处理此 Command 是否有效

关于 Action 的更多可选项可参考：

`Runtime\Slate\Public\Framework\Commands\UIAction.h`

```cpp
FMyCommands::Register();    // RegisterCommands() will be called in Register()
PluginCommands = MakeShared<FUICommandList>();
PluginCommands->MapAction(
    FMyCommands::Get().PluginAction,      // Command: FUICommandInfo
    FExecuteAction::CreateLambda([] {     // Action
        // Do Something ...
    }),
    FCanExecuteAction::CreateLambda([] {  // Is Action Valid: default is true
        return true;
    }),
);
```
