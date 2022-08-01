# Unreal Editor Development Misc

## 通知推送 | Notification

`FSlateNotificationManager` 管理着 Unreal Editor 中的大多数通知弹窗，可以通过向其全局实例添加通知的方式便捷的实现通知推送。

- `FNotificationInfo`：记录一个通知信息的结构体

- `AddNotification(Info)`：通过 `FSlateNotificationManager` 推送通知，需传入一个 `FNotificationInfo` 作为信息

下面给出一个通过全局 `FSlateNotificationManager` 实例在 Unreal Editor 中推送通知的例子：

```cpp
FNotificationInfo Info(FText::FromString("Test Notification..."));
FSlateNotificationManager::Get().AddNotification(Info);
```

## 进度条窗口 | Slow Task Progress Window

`FScopedSlowTask` 类封装了任务进度条窗口，可以方便地使用它在执行复杂多任务时给用户提供实时的视觉反馈。

- `FScopedSlowTask(Amount, Message)`：构造函数，指定总任务数量和窗口文字信息
- `MakeDialog(bShowCancelButton)`：成员函数，创建进度条窗口，指定该任务是否可取消
- `ShouldCancel()`：成员函数，返回进度条窗口的取消按钮是否被按下
- `EnterProgressFrame(n)`：任务进度前进 n 个，不传入参数时默认前进 1 个

下面给出一个执行循环任务时，创建并维护进度条窗口的例子：

```cpp
FScopedSlowTask Task(Objects.Num(), FText::FromString(TEXT("Task")));
Task.MakeDialog(true);
for (auto Object : Objects) {
    if (Task.ShouldCancel()) {
        break;
    }
    // ...Do Something.
    Task.EnterProgressFrame();
};
```
