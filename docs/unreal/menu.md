# Unreal Editor Menus

Unreal Editor 的菜单结构为：

`UToolMenus -> UToolMenu -> FToolMenuSection -> FToolMenuEntry`

其中 `UToolMenus` 为一个单例全局对象，维护 Unreal Editor 中的所有全局菜单。可以通过此对象实现全局菜单的注册、拓展、获取等操作。

Unreal 还提供了 `FMenuBuilder` `FExtender` 等可用来拓展菜单的 API，相较之下，`UToolMenus` 有如下特点：

- 可享受 `UObject` 带来的资源管理便利性
- 可借助 `.` 操作符，用形如 `LevelEditor.MainMenu` 的表达式定位任何一个全局菜单对象
- 对不同菜单控件提供了较为统一的 API 设计

考虑到代码的简洁性、一致性和可维护性，本文优先使用 `UToolMenu` 相关 API 。

## 拓展菜单 | Extend Menus

`UToolMenus` 是一个全局对象，Unreal Editor 的所有内置菜单均由其管理，我们在插件中使用 `UToolMenus` 注册自定义菜单时，需要确保 `UToolMenu` 及其相关系统已就绪。可以通过将自定义的菜单拓展函数传入 `UToolMenus::RegisterStartupCallback()` ，来确保自定义菜单注册时 `UToolMenu` 系统已准备就绪

```cpp
// Delays menu registration until safe and ready
UToolMenus::RegisterStartupCallback(FSimpleMulticastDelegate::FDelegate::CreateLambda([&] {
    FToolMenuOwnerScoped OwnerScoped(this);
    // Register Custom Menus Here
    ...
}));
```

## 构造控件 | Construct Widget

在将菜单作为参数传入一些控件的构造函数，或需要使用菜单作为控件等场景下，我们需要获取菜单对象对应的 `SWidget` 。

如果菜单已经在 `UToolMenus` 中完成注册，那么可以使用 `UToolMenus` 中提供的方法直接获取

```cpp
TSharedRef<SWidget> MenuWidget = UToolMenus::Get()->GenerateWidget(Menu);
```

如所需菜单不是一个全局菜单，也不想将其注册到 `UToolMenus` ，则可使用 `FMenuBuilder` 构建本地菜单，获取其 `SWidget` 对象供其他控件使用

```cpp
FMenuBuilder MenuBuilder(true, PluginCommands);
MenuBuilder.AddMenuEntry(FMyCommands::Get().PluginAction);
TSharedRef<SWidget> MenuWidget = MenuBuilder.MakeWidget();
```

## 拓展主菜单栏 | Extend Main Menu

### 拓展内置菜单

拓展 Unreal Editor 顶部菜单栏的内置菜单，以 Window 菜单为例

- 拓展内置菜单 `LevelEditor.MainMenu.Window`

```cpp
{
    UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("LevelEditor.MainMenu.Window");
    FToolMenuSection& Section = Menu->FindOrAddSection("WindowLayout");
    FToolMenuEntry& Entry = Section.AddEntry(FToolMenuEntry::InitMenuEntry(FMyCommands::Get().PluginAction));
    Entry.SetCommandList(PluginCommands);
}
```

### 添加菜单

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

拓展 Unreal Editor 主界面的工具栏。在 Unreal Editor 的工具栏中，使用 `ToolBarButton` 实现按钮，使用 `ComboButton` 实现带有菜单的按钮

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

## 拓展右键菜单 | Extend Context Menu

以资源管理器的右键菜单为例，演示如何拓展右键菜单

- 拓展内置菜单 `ContentBrowser.AssetContextMenu`

```cpp
{
    UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("ContentBrowser.AssetContextMenu");
    FToolMenuSection& Section = Menu->FindOrAddSection(NAME_None);
    FToolMenuEntry& Entry = Section.AddEntry(FToolMenuEntry::InitMenuEntry(FMyCommands::Get().PluginAction));
    Entry.SetCommandList(PluginCommands);
}
```

## 拓展任何菜单 | Extend ANY Menu

已经提到过，Unreal Editor 中的所有菜单均由 `UToolMenus` 对象维护，理论上可以使用这种方法拓展任何一个编辑器内的菜单。

在 Editor Preference 中打开

`General -> Miscellaneous -> Developer Tools -> Display UI Extension Points`

可以查看所有可被拓展的菜单名称
