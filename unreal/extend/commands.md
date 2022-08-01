# 自定义 Commands

## 什么是 Commands

Commands 是 Unreal Editor 中的一个重要概念，可以将其理解为对编辑器中 “UI 行为” 的抽象和封装。编辑器中按钮、复选框、等组件的名称、描述、触发动作等信息均由 Commands 系统管理。Commands 系统主要由如下几个类实现：

- `FUICommandInfo` 用于描述一个 Command 的基本信息
- `TCommands<>` 用于保存一组 `FUICommandInfo`，完成 Command 的注册和生命周期维护
- `FUICommandList` 用于记录 Command 和 Action 的绑定关系

初看有些复杂，可以将 `TCommands<>` 简单的理解为一个（或几个）Command 的管理器，每一个 Command 的信息保存在一个 `FUICommandInfo` 中，这两者共同完成了 Command 的名称、描述、类型、热键等基本信息的注册，但还不涉及 Command 所触发的动作信息。`FUICommandList` 将以上基本信息与一个 Action 联系起来，进而实现一个有效的 Command 。

下面演示如何向 Unreal Editor 添加有效的自定义 Commands 。

## 创建 Commands | Create

创建并初始化 `TCommands<>` 对象，一个 `TCommands<>` 对象可包含多个 `FUICommandInfo` ，记录多个 Command 基本信息。

```cpp
// MyCommand.h
class FMyCommands : public TCommands<FMyCommands> {
public:
    // TCommand<>(): inherit from FBindingContext()
	FMyCommands() : TCommands<FMyCommands>(
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

## 配置 Commands | Configuration

`RegisterCommands()` 是 `TCommands<>` 中的一个虚函数，在 `Register()` 函数中被调用，提供给开发者用于设置 Command 的基本信息。我们可以使用 `UI_COMMAND()` 宏来为 Command 指定初始化信息。

```cpp
// MyCommand.cpp
void FMyCommands::RegisterCommands()
{
	UI_COMMAND(
        PluginAction,                       // Command: FUICommandInfo
        "toolbar",                          // Name
        "Execute toolbar action",           // Description
        EUserInterfaceActionType::Button,   // Command Type
        FInputChord()                       // Input Chord: default
    );
}
```

## 注册 Commands | Register

在使用 Command 之前，需要向 Editor 的全局 Commands 实例注册自定义 Command，一般在模块启动的 `StartupModule()` 钩子中完成。仅需调用 `Register()` 函数即可完成注册。上文实现的 `RegisterCommands()` 会在 `Register()` 内部被调用。

```cpp
FMyCommands::Register();
```

## 绑定 Action | Bind

为已经创建好的 Command 绑定 Action

- `FExecuteAction` 事件处理此 Command 需要绑定的操作

- `FCanExecuteAction` 事件处理此 Command 是否有效

关于 Action 的更多可选项可参考：

`Runtime\Slate\Public\Framework\Commands\UIAction.h`

```cpp
FMyCommands::Register();    // RegisterCommands() will be called in Register()
PluginCommands = MakeShared<FUICommandList>();
PluginCommands->MapAction(
    FMyCommands::Get().PluginAction,   // Command: FUICommandInfo
    FExecuteAction(),                  // Delegate: () -> void
    FCanExecuteAction()                // Delegate: () -> bool
);
```

## 总结

要向 Unreal Editor 添加一个 Command，需要如下几个步骤：

- 创建 `TCommands<>` 对象，添加 `FUICommandInfo` 成员
- 实现 `TCommands<>` 对象的 `RegisterCommands()` 函数（设置 `FUICommandInfo` 注册信息）
- 调用 `TCommands<>` 对象的 `Register()` 函数，注册其管理的 Command
- 实例化 `FUICommandList`，为 `FUICommandInfo` 绑定 `ExecuteAction` 等信息

在完成 `FUICommandList` 初始化后，可通过 `UToolMenus` 将 Command 添加到 Unreal Editor 的任一工具栏或菜单中
