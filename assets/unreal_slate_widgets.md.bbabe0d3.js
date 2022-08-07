import{_ as e,c as a,o as t,d}from"./app.8a3cfc1d.js";const u=JSON.parse('{"title":"Slate \u63A7\u4EF6","description":"","frontmatter":{},"headers":[{"level":2,"title":"Slate \u63A7\u4EF6","slug":"slate-\u63A7\u4EF6-1"},{"level":2,"title":"\u63A7\u4EF6\u5C5E\u6027","slug":"\u63A7\u4EF6\u5C5E\u6027"},{"level":2,"title":"\u63A7\u4EF6\u57FA\u672C\u7C7B\u578B","slug":"\u63A7\u4EF6\u57FA\u672C\u7C7B\u578B"},{"level":2,"title":"~~\u57FA\u672C\u63A7\u4EF6 | Basic Widgets~~","slug":"\u57FA\u672C\u63A7\u4EF6-basic-widgets"},{"level":3,"title":"SDockTab","slug":"sdocktab"}],"relativePath":"unreal/slate/widgets.md","lastUpdated":1659874437000}'),l={name:"unreal/slate/widgets.md"},i=d('<h1 id="slate-\u63A7\u4EF6" tabindex="-1">Slate \u63A7\u4EF6 <a class="header-anchor" href="#slate-\u63A7\u4EF6" aria-hidden="true">#</a></h1><h2 id="slate-\u63A7\u4EF6-1" tabindex="-1">Slate \u63A7\u4EF6 <a class="header-anchor" href="#slate-\u63A7\u4EF6-1" aria-hidden="true">#</a></h2><p>Slate \u63A7\u4EF6\u662F\u6240\u6709\u57FA\u4E8E Slate UI \u6784\u5EFA\u7684 GUI \u7684\u57FA\u672C\u5355\u4F4D\u3002\u6709 GUI \u5F00\u53D1\u7ECF\u9A8C\u7684\u8BFB\u8005\u5E94\u8BE5\u90FD\u80FD\u7406\u89E3\u63A7\u4EF6\u7684\u6982\u5FF5\uFF0C\u5728\u8FD9\u91CC\u4E0D\u8FC7\u591A\u8D58\u8FF0\u3002</p><p>\u5728 Unreal \u4E2D\uFF0C\u6240\u6709 Slate \u63A7\u4EF6\u7684\u57FA\u7C7B\u662F <code>SWidget</code>\uFF0C\u5176\u6240\u6709\u6D3E\u751F\u7C7B\u547D\u540D\u5747\u5E26\u6709 <code>S</code> \u524D\u7F00\u3002</p><h2 id="\u63A7\u4EF6\u5C5E\u6027" tabindex="-1">\u63A7\u4EF6\u5C5E\u6027 <a class="header-anchor" href="#\u63A7\u4EF6\u5C5E\u6027" aria-hidden="true">#</a></h2><p>Slate \u63A7\u4EF6\u5C5E\u6027\u4E3B\u8981\u5206\u4E3A 4 \u7C7B\uFF0C\u5206\u522B\u662F\uFF1A</p><ul><li>Attribute\uFF1A\u4E00\u822C\u5C5E\u6027\uFF0C\u652F\u6301\u7ED1\u5B9A\u5C5E\u6027\u503C\u6216\u7ED1\u5B9A\u8FD4\u56DE\u5C5E\u6027\u503C\u7684\u51FD\u6570\u3002</li><li>Argument\uFF1A\u4E00\u822C\u5C5E\u6027\uFF0C\u4EC5\u652F\u6301\u7ED1\u5B9A\u5C5E\u6027\u503C\u3002</li><li>Event\uFF1A\u4E8B\u4EF6\uFF0C\u652F\u6301\u7ED1\u5B9A Delegate \u56DE\u8C03\u51FD\u6570\u3002</li><li>Slot\uFF1A\u5B50\u63A7\u4EF6\u69FD\uFF0C\u652F\u6301\u4F7F\u7528 Slate \u8868\u8FBE\u5F0F\u7ED1\u5B9A Slate \u63A7\u4EF6\u3002</li></ul><p>\u63A7\u4EF6\u5C5E\u6027\u7684\u7ED1\u5B9A\u9700\u8981\u7528\u5230 Slate \u8868\u8FBE\u5F0F\uFF0C\u76F8\u5173\u8BED\u6CD5\u5C06\u5728\u4E0B\u4E00\u7AE0\u8282\u4E2D\u8BE6\u7EC6\u4ECB\u7ECD\u3002</p><h2 id="\u63A7\u4EF6\u57FA\u672C\u7C7B\u578B" tabindex="-1">\u63A7\u4EF6\u57FA\u672C\u7C7B\u578B <a class="header-anchor" href="#\u63A7\u4EF6\u57FA\u672C\u7C7B\u578B" aria-hidden="true">#</a></h2><p>Slate \u6838\u5FC3\u5E93\u4F9D\u636E\u53EF\u5BB9\u7EB3\u5B50\u63A7\u4EF6\u7684\u6570\u91CF\u8BBE\u8BA1\u4E86\u4E09\u79CD\u63A7\u4EF6\u57FA\u672C\u7C7B\u578B\uFF1A</p><ul><li><code>SLeafWidget</code> : \u6D3E\u751F\u7C7B\u65E0 Slot \u5C5E\u6027\uFF0C\u4E0D\u5305\u542B\u5B50\u63A7\u4EF6\u3002\u591A\u7528\u4E8E\u57FA\u672C\u63A7\u4EF6\u3002</li><li><code>SCompoundWidget</code> : \u6D3E\u751F\u7C7B\u6709 Slot \u5C5E\u6027\uFF0C\u53EF\u5305\u542B\u6570\u91CF\u56FA\u5B9A\u7684\u5B50\u63A7\u4EF6\u3002\u591A\u7528\u4E8E\u529F\u80FD\u6027\u63A7\u4EF6\u3002</li><li><code>SPanel</code> : \u6D3E\u751F\u7C7B\u5B9E\u73B0 <code>Slot()</code> \u65B9\u6CD5\uFF0C\u53EF\u5305\u542B\u591A\u4E2A\u5E76\u5217\u7ED3\u6784\u7684\u5B50\u63A7\u4EF6\u3002\u591A\u7528\u4E8E\u5E03\u5C40\u7C7B\u63A7\u4EF6\u3002</li></ul><p>\u5728\u63D2\u4EF6\u5F00\u53D1\u8FC7\u7A0B\u4E2D\uFF0C\u4E00\u822C\u9009\u62E9\u7EE7\u627F <code>SCompoundWidget</code> \u8BBE\u8BA1\u81EA\u5B9A\u4E49\u63A7\u4EF6\u3002</p><hr><hr><p>WIP...</p><h2 id="\u57FA\u672C\u63A7\u4EF6-basic-widgets" tabindex="-1"><s>\u57FA\u672C\u63A7\u4EF6 | Basic Widgets</s> <a class="header-anchor" href="#\u57FA\u672C\u63A7\u4EF6-basic-widgets" aria-hidden="true">#</a></h2><h3 id="sdocktab" tabindex="-1"><code>SDockTab</code> <a class="header-anchor" href="#sdocktab" aria-hidden="true">#</a></h3><p>\u5728\u62D3\u5C55\u7A97\u53E3\u7AE0\u8282\u4E2D\uFF0C\u6211\u4EEC\u63D0\u5230\u4E86\u4F7F\u7528 <code>FTabManager</code> \u6CE8\u518C\u81EA\u5B9A\u4E49\u7A97\u53E3\uFF0C\u5176\u4E2D <code>FOnSpawnTab</code> \u4EE3\u7406\u9700\u8981\u8FD4\u56DE\u7684\u63A7\u4EF6\u5C31\u662F\u8BE5\u63A7\u4EF6\u3002</p><p><code>SDockTab</code> \u63A7\u4EF6\u63CF\u8FF0\u4E86\u4E00\u4E2A Tab \u7684\u6807\u7B7E\u4FE1\u606F\u548C\u5185\u5BB9\uFF0C\u662F\u6784\u5EFA Unreal \u5185\u72EC\u7ACB\u7A97\u53E3\u5E94\u7528\u7684\u5165\u53E3\u3002</p>',19),c=[i];function o(s,r,n,h,p,S){return t(),a("div",null,c)}var g=e(l,[["render",o]]);export{u as __pageData,g as default};