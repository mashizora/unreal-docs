# Commands

## 关于 Commands

Commands 是 Unreal Editor 中的一个重要概念，可以将其理解为对编辑器中 “UI 行为” 的抽象和封装。编辑器中 UI 控件的名称、描述、触发动作等信息均由 Commands 系统管理。Commands 系统主要由如下几个类实现：

- `FUICommandInfo` ：描述 Command 的基本信息
- `TCommands<>` ：保存一组 `FUICommandInfo`，完成 Command 的注册与生命周期维护
- `FUICommandList` ：记录 Command 和 Action 的绑定关系

初看有些复杂，可以将 `TCommands<>` 理解为若干个 Command 的封装，每一个 Command 由一个 `FUICommandInfo` 定义，这两者共同实现 Command 基本信息的注册与生命周期维护，但未定义相关动作信息。`FUICommandList` 将 Command 基本信息与 Action 绑定，进而实现一个有效的 Command 。

下面演示如何向 Unreal Editor 添加有效的自定义 Commands 。

## 创建 Commands

创建并初始化 `TCommands<>` 对象，一个 `TCommands<>` 对象可包含多个 `FUICommandInfo` ，记录多个 Command 基本信息。

```cpp
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

## 配置 Commands

`RegisterCommands()` 是 `TCommands<>` 中的一个虚函数，在 `Register()` 函数中被调用，提供给开发者用于设置 Command 的基本信息。我们可以使用 `UI_COMMAND()` 宏来为 Command 指定初始化信息。

```cpp
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
