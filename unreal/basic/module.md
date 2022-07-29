# Unreal Module

`IMPLEMENT_MODULE(<My Module Class>, <Module name string>)` 声明 Unreal Module

## 模块接口 | Module Interface

```cpp
class IModuleInterface {
public:
	virtual ~IModuleInterface() {}

	// Called after the module has been loaded and the module object has been created
	virtual void StartupModule() {}

	// Called before the module has been unloaded
	virtual void PreUnloadCallback() {}

	// Called after the module has been reloaded
	virtual void PostLoadCallback() {}

	// Called before the module is unloaded, right before the module object is destroyed.
	virtual void ShutdownModule() {}

	// Whether the module supports shutdown separate from the rest of the engine.
	virtual bool SupportsDynamicReloading() { return true; }

	// Whether the module supports shutdown on application exit
	virtual bool SupportsAutomaticShutdown() { return true; }

	// True for "gameplay modules", or false for engine code modules, plugins, etc.
	virtual bool IsGameModule() const { return false; }
};
```
