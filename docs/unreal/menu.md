# Unreal Editor Menus

Unreal Editor 的菜单结构为：

`UToolMenus -> UToolMenu -> FToolMenuSection -> FToolMenuEntry`

其中 `UToolMenus` 为一个单例全局对象，维护 Unreal Editor 中的所有全局菜单。可以通过此对象实现全局菜单的注册、拓展、获取等操作。

Unreal 还提供了 `FMenuBuilder` `FExtender` 等可用来拓展菜单的 API，相较之下，`UToolMenus` 有如下特点：

- 可享受 `UObject` 带来的资源管理便利性
- 可借助 `.` 操作符，用形如 `LevelEditor.MainMenu` 的表达式定位一个全局菜单对象
- 对不同菜单控件提供了较为统一的 API 设计
- 单例全局对象，可从任一模块调用

考虑到代码的简洁性、一致性和可维护性，本文优先使用最新的 `UToolMenu` 相关 API 。

## 拓展 Unreal Editor 菜单 | Extend Unreal Editor Menus

下面示例为通过 `UToolMenus` 拓展 Unreal Editor 内置的全局菜单

使用 `UToolMenus::RegisterStartupCallback()` 钩子以确保内置菜单完成加载

```cpp
// Delays menu registration until safe and ready
UToolMenus::RegisterStartupCallback(FSimpleMulticastDelegate::FDelegate::CreateLambda([&] {
    FToolMenuOwnerScoped OwnerScoped(this);

    {   // Register to Main Menu Bar -> Window Menu
		UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("LevelEditor.MainMenu.Window");
		FToolMenuSection& Section = Menu->FindOrAddSection("WindowLayout");
		FToolMenuEntry& Entry = Section.AddEntry(FToolMenuEntry::InitMenuEntry(FMyCommands::Get().OpenPluginWindow));
		Entry.SetCommandList(PluginCommands);
	}
	{   // Register to Main Tool Bar -> Button
		UToolMenu* ToolbarMenu = UToolMenus::Get()->ExtendMenu("LevelEditor.LevelEditorToolBar.PlayToolBar");
		FToolMenuSection& Section = ToolbarMenu->FindOrAddSection("PluginTools");
		FToolMenuEntry& Entry = Section.AddEntry(FToolMenuEntry::InitToolBarButton(FMyCommands::Get().PluginAction));
		Entry.SetCommandList(PluginCommands);
	}
}));
```

## 注册 Unreal Editor 菜单 | Register Unreal Editor Menus

可通过 `UToolMenus::Get()->RegisterMenu()` 方法将菜单注册到全局的 `UToolMenus` 中。

```cpp
UToolMenu* Menu = UToolMenus::Get()->RegisterMenu("LevelEditor.LevelEditorToolBar.PluginMenuTool");
Menu->bShouldCloseWindowAfterMenuSelection = true;
FToolMenuSection& Section = Menu->AddSection("Plugin");
Section.AddMenuEntryWithCommandList(FMyCommands::Get().PluginAction, PluginCommands);
```

## 构造菜单控件 | Construct Menu Widget

可通过 `FMenuBuilder` 构建本地菜单，获取其 `SWidget` 对象供其他控件使用

```cpp
FMenuBuilder MenuBuilder(true, PluginCommands);
MenuBuilder.AddMenuEntry(FMyCommands::Get().PluginAction);
TSharedRef<SWidget> MenuWidget = MenuBuilder.MakeWidget();
```

也可从 `UToolMenus` 管理的的全局菜单中获取 `SWidget`

```cpp
TSharedRef<SWidget> MenuWidget = UToolMenus::Get()->GenerateWidget(Menu);
```

## 添加工具栏菜单按钮 | Toolbar Button

在 Unreal Editor 中，使用 `ToolBarButton` 实现工具栏按钮，使用 `ComboButton` 实现带有菜单的工具栏按钮

### 按钮

```cpp
UToolMenu* ToolbarMenu = UToolMenus::Get()->ExtendMenu("LevelEditor.LevelEditorToolBar.PlayToolBar");
FToolMenuSection& Section = ToolbarMenu->FindOrAddSection("PluginTools");
FToolMenuEntry& Entry = Section.AddEntry(FToolMenuEntry::InitToolBarButton(FMyCommands::Get().PluginAction));
Entry.SetCommandList(PluginCommands);
```

### 带菜单栏的按钮

```cpp
UToolMenu* ToolbarMenu = UToolMenus::Get()->ExtendMenu("LevelEditor.LevelEditorToolBar.PlayToolBar");
FToolMenuSection& Section = ToolbarMenu->FindOrAddSection("PluginTools");
Section.AddEntry(FToolMenuEntry::InitComboButton(
    "ComboButton",
    FUIAction(),
    FOnGetContent::CreateLambda([&] {
        FMenuBuilder MenuBuilder(true, PluginCommands);
        MenuBuilder.AddMenuEntry(FMyCommands::Get().PluginAction);
        return MenuBuilder.MakeWidget();
    })
));
```

## 拓展主菜单栏 | Extend Main Menu

拓展 Unreal Editor 主界面顶部的主菜单栏，可以指定插入位置。

- 拓展 `LevelEditor.MainMenu` 添加菜单栏按钮
- 拓展 `LevelEditor.MainMenu.Plugin` 创建自定义菜单

```cpp
{
	UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("LevelEditor.MainMenu");
	FToolMenuSection& Section = Menu->FindOrAddSection(NAME_None);
	FToolMenuEntry& Entry = Section.AddSubMenu(
		"Plugin",                                            // Name
		LOCTEXT("PluginName", "Plugin"),                     // Display Name
		LOCTEXT("PluginDescription", "Plugin Description"),  // Descriptions
		FNewToolMenuChoice()                                 // Contents: empty
	);
	Entry.InsertPosition = FToolMenuInsert("Help", EToolMenuInsertType::Before);
}
{
	UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("LevelEditor.MainMenu.Plugin");
	FToolMenuSection& Section = Menu->FindOrAddSection(NAME_None);
	Section.AddMenuEntryWithCommandList(FMyCommands::Get().PluginAction, PluginCommands);
}
```

## 拓展工具栏 | Extend Toolbar

拓展 Unreal Editor 主界面的工具栏。

### 添加按钮

- 拓展 `LevelEditor.LevelEditorToolBar.PlayToolBar` 添加工具栏按钮

```cpp
{
	UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("LevelEditor.LevelEditorToolBar.PlayToolBar");
	FToolMenuSection& Section = ToolbarMenu->FindOrAddSection(NAME_None);
	FToolMenuEntry& Entry = Section.AddEntry(FToolMenuEntry::InitToolBarButton(FMyCommands::Get().PluginAction));
	Entry.SetCommandList(PluginCommands);
}
```

### 添加菜单按钮

- 拓展 `LevelEditor.LevelEditorToolBar.PlayToolBar` 添加工具栏菜单按钮
- 拓展 `LevelEditor.LevelEditorToolBar.PlayToolBar.Plugin` 创建自定义菜单

```cpp
{
	UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("LevelEditor.LevelEditorToolBar.PlayToolBar");
	FToolMenuSection& Section = ToolbarMenu->FindOrAddSection(NAME_None);
	Section.AddEntry(FToolMenuEntry::InitComboButton(
		"Plugin",
		FUIAction(),
		FNewToolMenuChoice()
	));
}
{
	UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("LevelEditor.LevelEditorToolBar.PlayToolBar.Plugin");
	FToolMenuSection& Section = Menu->FindOrAddSection(NAME_None);
	Section.AddMenuEntryWithCommandList(FMyCommands::Get().PluginAction, PluginCommands);
}
```
