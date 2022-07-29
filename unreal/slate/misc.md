# Unreal Editor Development Misc

## 通知弹窗 | Notification

```cpp
FNotificationInfo Info(FText::FromString(str));
FSlateNotificationManager::Get().AddNotification(Info);
```

## 进度条窗口 | Slow Task Progress Window

```cpp
FScopedSlowTask Task(Objects.Num(), FText::FromString(TEXT("Task")));
Task.MakeDialog(true);
for (auto object : Objects) {
    if (Task.ShouldCancel()) {
        break;
    }
    // ...Do Something. Then
    Task.EnterProgressFrame();
};
```
