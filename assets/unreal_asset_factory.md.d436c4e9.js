import{_ as s,c as a,o as n,d as l}from"./app.4279a2ab.js";const i=JSON.parse('{"title":"\u521B\u5EFA Factory","description":"","frontmatter":{},"headers":[],"relativePath":"unreal/asset/factory.md","lastUpdated":1659693878000}'),p={name:"unreal/asset/factory.md"},o=l(`<h1 id="\u521B\u5EFA-factory" tabindex="-1">\u521B\u5EFA Factory <a class="header-anchor" href="#\u521B\u5EFA-factory" aria-hidden="true">#</a></h1><p>\u5728\u521B\u5EFA\u5B8C\u81EA\u5B9A\u4E49\u7C7B\u540E\uFF0CUnreal \u8FD8\u4E0D\u77E5\u9053\u8981\u4EE5\u4F55\u79CD\u65B9\u5F0F\u5728\u7F16\u8F91\u5668\u4E2D\u5B9E\u4F8B\u5316\u8BE5\u7C7B\u3002\u6B64\u5904\u9700\u8981\u521B\u5EFA\u5E76\u7ED1\u5B9A\u4E00\u4E2A Factory \u7C7B\uFF0C\u5728\u5176\u4E2D\u5B9E\u73B0\u7F16\u8F91\u5668\u4E2D\u7684\u6784\u9020\u65B9\u6CD5\u548C\u884C\u4E3A\u7B49\u3002</p><p>\u4E00\u822C\u6765\u8BF4\uFF0C\u81F3\u5C11\u9700\u8981\u6307\u6D3E\u4EE5\u4E0B\u5C5E\u6027\uFF0C\u5E76\u5B9E\u73B0 <code>FactoryCreateNew()</code> \u65B9\u6CD5\uFF1A</p><div class="language-cpp"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">UCLASS</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">UCustomAssetFactory</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">public</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">UFactory</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#82AAFF;">GENERATED_BODY</span><span style="color:#89DDFF;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#82AAFF;">UCustomAssetFactory</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		bCreateNew </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">true;</span></span>
<span class="line"><span style="color:#F07178;">		bEditAfterNew </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">true;</span></span>
<span class="line"><span style="color:#F07178;">		SupportedClass </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">UCustomAsset</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">StaticClass</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#C792EA;">virtual</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">UObject</span><span style="color:#C792EA;">*</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">FactoryCreateNew</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#FFCB6B;">UClass</span><span style="color:#C792EA;">*</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">InClass</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#FFCB6B;">UObject</span><span style="color:#C792EA;">*</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">InParent</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#FFCB6B;">FName</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">InName</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#FFCB6B;">EObjectFlags</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Flags</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#FFCB6B;">UObject</span><span style="color:#C792EA;">*</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Context</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#FFCB6B;">FFeedbackContext</span><span style="color:#C792EA;">*</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Warn</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">override</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><div class="language-cpp"><span class="copy"></span><pre><code><span class="line"><span style="color:#FFCB6B;">UObject</span><span style="color:#C792EA;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UCustomAssetFactory</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">FactoryCreateNew</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">UClass</span><span style="color:#C792EA;">*</span><span style="color:#A6ACCD;"> InClass</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">UObject</span><span style="color:#C792EA;">*</span><span style="color:#A6ACCD;"> InParent</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">FName</span><span style="color:#A6ACCD;"> InName</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">EObjectFlags</span><span style="color:#A6ACCD;"> Flags</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">UObject</span><span style="color:#C792EA;">*</span><span style="color:#A6ACCD;"> Context</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">FFeedbackContext</span><span style="color:#C792EA;">*</span><span style="color:#A6ACCD;"> Warn</span></span>
<span class="line"><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">NewObject</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">UCustomAsset</span><span style="color:#89DDFF;">&gt;(</span><span style="color:#A6ACCD;">InParent</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> InClass</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> InName</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Flags</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,5),e=[o];function t(c,r,F,y,D,C){return n(),a("div",null,e)}var B=s(p,[["render",t]]);export{i as __pageData,B as default};