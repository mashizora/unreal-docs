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

`UToolMenus` 是一个全局对象，Unreal Editor 的所有内置菜单均由其管理，我们在插件中使用 `UToolMenus` 注册自定义菜单时，需要确保 `UToolMenus` 及其相关系统已就绪。可以将拓展菜单的函数传入 `UToolMenus::RegisterStartupCallback()` ，来确保自定义菜单注册时 `UToolMenus` 系统已准备就绪

```cpp
// Delays menu registration until safe and ready
UToolMenus::RegisterStartupCallback(
    FSimpleMulticastDelegate::FDelegate::CreateLambda([&] {
        FToolMenuOwnerScoped OwnerScoped(this);
        // Register Custom Menus Here
        // ...
}));
```

## 构造控件 | Construct Widget

在一些使用场景下，我们需要获取菜单对象对应的 `SWidget` ，例如：

- 将菜单作为参数传入一些控件的构造函数
- 使用菜单作为控件进行 UI 设计

本文提供两种方法实现获取一个菜单对应的 `SWidget`

1. 如果菜单已经在 `UToolMenus` 中完成注册，那么可以使用 `UToolMenus` 提供的方法直接获取

   ```cpp
   TSharedRef<SWidget> MenuWidget = UToolMenus::Get()->GenerateWidget(Menu);
   ```

2. 如菜单未注册到 `UToolMenus` ，也不想将其注册为全局菜单，可使用 `FMenuBuilder` 构建本地菜单，然后获取其 `SWidget` 对象供其他控件使用
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
    FToolMenuEntry& Entry = Section.AddEntry(
        FToolMenuEntry::InitMenuEntry(FMyCommands::Get().PluginAction)
    );
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
        FNewToolMenuChoice()                                 // Contents: default
    );
    Entry.InsertPosition = FToolMenuInsert("Help", EToolMenuInsertType::Before);
}
{
    UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("LevelEditor.MainMenu.Plugin");
    FToolMenuSection& Section = Menu->FindOrAddSection(NAME_None);
    Section.AddMenuEntryWithCommandList(
        FMyCommands::Get().PluginAction,     // Command
        PluginCommands                       // CommandList
    );
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
    FToolMenuEntry& Entry = Section.AddEntry(
        FToolMenuEntry::InitToolBarButton(FMyCommands::Get().PluginAction)
    );
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
        "Plugin",              // Name
        FUIAction(),           // Action: default
        FNewToolMenuChoice()   // Contents: default
    ));
}
{
    UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("LevelEditor.LevelEditorToolBar.PlayToolBar.Plugin");
    FToolMenuSection& Section = Menu->FindOrAddSection(NAME_None);
    Section.AddMenuEntryWithCommandList(
        FMyCommands::Get().PluginAction,     // Command
        PluginCommands                       // CommandList
    );
}
```

## 拓展右键菜单 | Extend Context Menu

以资源管理器的右键菜单为例，演示如何拓展右键菜单

- 拓展内置菜单 `ContentBrowser.AssetContextMenu`

```cpp
{
    UToolMenu* Menu = UToolMenus::Get()->ExtendMenu("ContentBrowser.AssetContextMenu");
    FToolMenuSection& Section = Menu->FindOrAddSection(NAME_None);
    FToolMenuEntry& Entry = Section.AddEntry(
        FToolMenuEntry::InitMenuEntry(FMyCommands::Get().PluginAction)
    );
    Entry.SetCommandList(PluginCommands);
}
```

## 拓展任何菜单 | Extend ANY Menu

不难发现，通过 `UToolMenus` 进行 Unreal Editor 菜单拓展在用法上具有很高的一致性。前文也提到过，Unreal Editor 中的所有菜单均由 `UToolMenus` 对象维护，理论上可以使用这种方法拓展编辑器内的任何菜单。

此外，Unreal Editor 还提供了相应的开发者工具，便于我们快速查找编辑器 UI 中注入点的名称。

在 Editor Preference 中打开

`General -> Miscellaneous -> Developer Tools -> Display UI Extension Points`

即可查看所有可被拓展的菜单名称
