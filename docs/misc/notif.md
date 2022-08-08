# 消息通知

`FSlateNotificationManager` 管理着 Unreal Editor 中的大多数通知弹窗，可以通过向其全局实例添加通知的方式便捷的实现通知推送。

- `FNotificationInfo`：记录一个通知信息的结构体

- `AddNotification(Info)`：通过 `FSlateNotificationManager` 推送通知，需传入一个 `FNotificationInfo` 作为信息

下面给出一个通过全局 `FSlateNotificationManager` 实例在 Unreal Editor 中推送通知的例子：

```cpp
FNotificationInfo Info(FText::FromString("Test Notification..."));
FSlateNotificationManager::Get().AddNotification(Info);
```
