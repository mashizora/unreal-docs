# Unreal Command UI

## 创建 Commands

创建并初始化 Commands 对象，可包含多个 Command

```cpp
// MyCommand.h
class FMyCommands : public TCommands<FMyCommands> {
public:
    // TCommand<>() inherit from FBindingContext()
	FtoolbarCommands() : TCommands<FMyCommands>(
        TEXT("MyCommand"),                                 // ContextName
        NSLOCTEXT("Contexts", "MyCommand", "My Command"),  // ContextDesc
        NAME_None,                                         // ContextParent
        FtoolbarStyle::GetStyleSetName()                   // StyleSetName
    ) {}

    // Implement TCommands<>::RegisterCommands()
	virtual void RegisterCommands() override;

public:
    // Commands list, A FUICommandInfo is ONE command action
	TSharedPtr<FUICommandInfo> PluginAction;
};
```

```cpp
// MyCommand.cpp
void FMyCommands::RegisterCommands()
{
	UI_COMMAND(
        PluginAction,                      // CommandId: TSharedPtr<FUICommandInfo>
        "toolbar",                         // FriendlyName:
        "Execute toolbar action",          // InDescription
        EUserInterfaceActionType::Button,  // CommandType
        FInputChord()                      // InDefaultChord
    );
}
```

## 注册 Commands

为已经创建好的 Commands 绑定 Actions

```cpp
// Inherit from TCommands<>, RegisterCommands() will be called
FMyCommands::Register();
PluginCommands = MakeShareable(new FUICommandList);
PluginCommands->MapAction(
    FMyCommands::Get().PluginAction,  // CommandId: TSharedPtr<FUICommandInfo>
    FExecuteAction(),                 // ExecuteAction: Delegate -> bool
    FCanExecuteAction()               // CanExecuteAction: Delegate -> bool
);
```
