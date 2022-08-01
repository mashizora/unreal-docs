import{_ as s,c as a,o as n,d as l}from"./app.08d9c68c.js";const C=JSON.parse('{"title":"\u5E03\u5C40 | Layout","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5E03\u5C40 | Layout","slug":"\u5E03\u5C40-layout"}],"relativePath":"unreal/slate/layout.md","lastUpdated":1659336146000}'),p={name:"unreal/slate/layout.md"},o=l(`<h2 id="\u5E03\u5C40-layout" tabindex="-1">\u5E03\u5C40 | Layout <a class="header-anchor" href="#\u5E03\u5C40-layout" aria-hidden="true">#</a></h2><p>\u6C34\u5E73\u548C\u5782\u76F4\u5E03\u5C40 <code>SScrollBox</code> <code>SVerticalBox</code> <code>SHorizontalBox</code></p><div class="language-cpp"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">SNew</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">SScrollBox</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SScrollBox</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">Slot</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">SNew</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">SVerticalBox</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SVerticalBox</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">Slot</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">SNew</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">SHorizontalBox</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SHorizontalBox</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">Slot</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><p>\u6805\u683C\u5E03\u5C40 <code>SUniformGridPanel</code></p><div class="language-cpp"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">SNew</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">SUniformGridPanel</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SUniformGridPanel</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">Slot</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SUniformGridPanel</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">Slot</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><p>\u5C42\u53E0\u5E03\u5C40 <code>SOverlay</code></p><div class="language-cpp"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">SNew</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">SOverlay</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SOverlay</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">Slot</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><p>\u56FA\u5B9A\u5C3A\u5BF8 <code>SBox</code></p><div class="language-cpp"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">SNew</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">SBox</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">.</span><span style="color:#82AAFF;">HeightOverride</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">128</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">.</span><span style="color:#82AAFF;">WidthOverride</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">128</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><p>\u6D41\u5E03\u5C40 <code>SWrapBox</code></p><div class="language-cpp"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">SNew</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">SWrapBox</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#FFCB6B;">SWrapBox</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">Slot</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div>`,11),e=[o];function c(r,t,F,D,y,i){return n(),a("div",null,e)}var d=s(p,[["render",c]]);export{C as __pageData,d as default};
