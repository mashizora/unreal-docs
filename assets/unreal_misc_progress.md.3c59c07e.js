import{_ as s,c as a,o as n,d as o}from"./app.7523815b.js";const A=JSON.parse('{"title":"\u8FDB\u5EA6\u6761\u7A97\u53E3","description":"","frontmatter":{},"headers":[],"relativePath":"unreal/misc/progress.md","lastUpdated":1659885609000}'),l={name:"unreal/misc/progress.md"},p=o(`<h1 id="\u8FDB\u5EA6\u6761\u7A97\u53E3" tabindex="-1">\u8FDB\u5EA6\u6761\u7A97\u53E3 <a class="header-anchor" href="#\u8FDB\u5EA6\u6761\u7A97\u53E3" aria-hidden="true">#</a></h1><p><code>FScopedSlowTask</code> \u7C7B\u5C01\u88C5\u4E86\u4EFB\u52A1\u8FDB\u5EA6\u6761\u7A97\u53E3\uFF0C\u53EF\u4EE5\u65B9\u4FBF\u5730\u4F7F\u7528\u5B83\u5728\u6267\u884C\u590D\u6742\u591A\u4EFB\u52A1\u65F6\u7ED9\u7528\u6237\u63D0\u4F9B\u5B9E\u65F6\u7684\u89C6\u89C9\u53CD\u9988\u3002</p><ul><li><code>FScopedSlowTask(Amount, Message)</code>\uFF1A\u6784\u9020\u51FD\u6570\uFF0C\u6307\u5B9A\u603B\u4EFB\u52A1\u6570\u91CF\u548C\u7A97\u53E3\u6587\u5B57\u4FE1\u606F</li><li><code>MakeDialog(bShowCancelButton)</code>\uFF1A\u6210\u5458\u51FD\u6570\uFF0C\u521B\u5EFA\u8FDB\u5EA6\u6761\u7A97\u53E3\uFF0C\u6307\u5B9A\u8BE5\u4EFB\u52A1\u662F\u5426\u53EF\u53D6\u6D88</li><li><code>ShouldCancel()</code>\uFF1A\u6210\u5458\u51FD\u6570\uFF0C\u8FD4\u56DE\u8FDB\u5EA6\u6761\u7A97\u53E3\u7684\u53D6\u6D88\u6309\u94AE\u662F\u5426\u88AB\u6309\u4E0B</li><li><code>EnterProgressFrame(n)</code>\uFF1A\u4EFB\u52A1\u8FDB\u5EA6\u524D\u8FDB n \u4E2A\uFF0C\u4E0D\u4F20\u5165\u53C2\u6570\u65F6\u9ED8\u8BA4\u524D\u8FDB 1 \u4E2A</li></ul><p>\u4E0B\u9762\u7ED9\u51FA\u4E00\u4E2A\u6267\u884C\u5FAA\u73AF\u4EFB\u52A1\u65F6\uFF0C\u521B\u5EFA\u5E76\u7EF4\u62A4\u8FDB\u5EA6\u6761\u7A97\u53E3\u7684\u4F8B\u5B50\uFF1A</p><div class="language-cpp"><span class="copy"></span><pre><code><span class="line"><span style="color:#FFCB6B;">FScopedSlowTask</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Task</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Objects</span><span style="color:#A6ACCD;">.</span><span style="color:#82AAFF;">Num</span><span style="color:#89DDFF;">(),</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">FText</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">FromString</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">TEXT</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Task</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)));</span></span>
<span class="line"><span style="color:#A6ACCD;">Task</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">MakeDialog</span><span style="color:#89DDFF;">(true);</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">auto</span><span style="color:#A6ACCD;"> Object </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Objects</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">Task</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ShouldCancel</span><span style="color:#89DDFF;">())</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">break</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // ...Do Something.</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">Task</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">EnterProgressFrame</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div>`,5),e=[p];function c(t,r,F,D,y,i){return n(),a("div",null,e)}var C=s(l,[["render",c]]);export{A as __pageData,C as default};
