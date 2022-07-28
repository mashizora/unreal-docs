# Unreal Editor Development Misc

## 通知弹窗 | Notification

```cpp
FNotificationInfo Info(FText::FromString(str));
FSlateNotificationManager::Get().AddNotification(Info);
```

## 进度条窗口 | Slow Task Progress Window

```cpp
FScopedSlowTask SlowTask(Objects.Num(), FText::FromString(TEXT("Task")));
SlowTask.MakeDialog(true);
for (auto object : Objects) {
    if (SearchTask.ShouldCancel()) {
        break;
    }
    // ...Do Something
    SlowTask.EnterProgressFrame();
};
```
