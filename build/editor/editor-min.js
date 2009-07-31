/*
Copyright (c) 2009, Kissy UI Library. All rights reserved.
http://kissy.googlecode.com/

Date: 2009-07-31 10:42:21
Revision: 92
*/
var KISSY=window.KISSY||{};KISSY.Editor=function(a,b){var c=KISSY.Editor;if(!(this instanceof c)){return new c(a,b)}else{if(!c._isReady){c._setup()}return new c.Instance(a,b)}};(function(b){var a=YAHOO.lang;a.augmentObject(b,{version:"0.1",lang:{},mods:{},plugins:{},add:function(c,e,d){this.mods[c]={name:c,fn:e,details:d||{}};return this},addPlugin:function(f,j){var d=typeof f=="string"?[f]:f,e=this.plugins,h,g,c;for(g=0,c=d.length;g<c;++g){h=d[g];if(!e[h]){e[h]=a.merge(j,{name:h})}}},_isReady:false,_setup:function(){this._loadModules();this._isReady=true},_attached:{},_loadModules:function(){var f=this.mods,e=this._attached,d,c;for(d in f){c=f[d];if(!e[d]&&c){e[d]=c;if(c.fn){c.fn(this)}}}}})})(KISSY.Editor);KISSY.Editor.add("config",function(a){a.config={base:"",language:"en",theme:"default",toolbar:["undo","redo","fontName","fontSize","bold","italic","underline","strikeThrough","foreColor","backColor","","link","","insertOrderedList","insertUnorderedList","outdent","indent","justifyLeft","justifyCenter","justifyRight"]}});KISSY.Editor.add("lang~en",function(a){a.lang.en={undo:{text:"Undo",title:"Undo (Ctrl+Z)"},redo:{text:"Redo",title:"Redo (Ctrl+Y)"},fontName:{text:"Font Name",title:"Font",options:{Default:"Arial",Arial:"Arial","Times New Roman":"Times New Roman","Arial Black":"Arial Black","Arial Narrow":"Arial Narrow","Comic Sans MS":"Comic Sans MS","Courier New":"Courier New",Garamond:"Garamond",Georgia:"Georgia",Tahoma:"Tahoma","Trebuchet MS":"Trebuchet MS",Verdana:"Verdana"}},fontSize:{text:"Font Size",title:"Font size",options:{Default:"10pt","8":"8pt","10":"10pt","12":"12pt","14":"14pt","18":"18pt","24":"24pt","36":"36pt"}},bold:{text:"Bold",title:"Bold (Ctrl+B)"},italic:{text:"Italic",title:"Italick (Ctrl+I)"},underline:{text:"Underline",title:"Underline (Ctrl+U)"},strikeThrough:{text:"Strikeout",title:"Strikeout"},link:{text:"Link",title:"Add or remove link (Ctrl+K)",dialogMessage:"Enter the URL"},insertOrderedList:{text:"Numbered List",title:"Numbered List (Ctrl+7)"},insertUnorderedList:{text:"Bullet List",title:"Bullet List (Ctrl+8)"},outdent:{text:"Decrease Indent",title:"Decrease Indent"},indent:{text:"Increase Indent",title:"Increase Indent"},justifyLeft:{text:"Left Justify",title:"Left Justify (Ctrl+L)"},justifyCenter:{text:"Center Justify",title:"Center Justify (Ctrl+E)"},justifyRight:{text:"Right Justify",title:"Right Justify (Ctrl+R)"},foreColor:{text:"Text Color",title:"Text Color"},backColor:{text:"Text Background Color",title:"Text Background Color"},common:{ok:"OK",cancel:"Cancel"}}});KISSY.Editor.add("core~plugin",function(a){a.PLUGIN_TYPE={CUSTOM:0,TOOLBAR_SEPARATOR:1,TOOLBAR_BUTTON:2,TOOLBAR_MENU_BUTTON:4,TOOLBAR_SELECT:8}});KISSY.Editor.add("core~dom",function(a){a.Dom={getText:(document.documentElement.textContent!==undefined)?function(b){return b?(b.textContent||""):""}:function(b){return b?(b.innerText||""):""}}});KISSY.Editor.add("core~color",function(d){var c="toString",a=parseInt,b=RegExp;d.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(e){if(!this.re_RGB.test(e)){e=this.toHex(e)}if(this.re_hex.exec(e)){e="rgb("+[a(b.$1,16),a(b.$2,16),a(b.$3,16)].join(", ")+")"}return e},toHex:function(i){i=this.KEYWORDS[i]||i;if(this.re_RGB.exec(i)){var h=(b.$1>>0)[c](16),f=(b.$2>>0)[c](16),e=(b.$3>>0)[c](16);i=[h.length==1?"0"+h:h,f.length==1?"0"+f:f,e.length==1?"0"+e:e].join("")}if(i.length<6){i=i.replace(this.re_hex3,"$1$1")}if(i!=="transparent"&&i.indexOf("#")<0){i="#"+i}return i.toLowerCase()}}});KISSY.Editor.add("core~command",function(e){var c=YAHOO.env.ua,b={backColor:c.gecko?"hiliteColor":"backColor"},f="bold,italic,underline,strike,strikeThrough",a="styleWithCSS",d="execCommand";e.Command={exec:function(h,g,i){g=b[g]||g;this._preExec(h,g);h[d](g,false,i)},_preExec:function(h,g){if(c.gecko&&f.indexOf(g)>-1){h[d](a,false,false)}else{h[d](a,false,true)}}}});KISSY.Editor.add("core~instance",function(h){var a=YAHOO.util,d=a.Dom,e=YAHOO.lang,c="kissy-editor",f='<div class="kissy-editor-toolbar"></div><iframe frameborder="0"></iframe><div class="kissy-editor-statusbar"></div>',b='<!DOCTYPE html><html><head><title>Rich Text Area</title><meta http-equiv="Content-Type" content="text/html; charset=GBK18030" /><link type="text/css" href="{CONTENT_CSS}" rel="stylesheet" /></head><body>{CONTENT}</body></html>',i="themes",g="content.css";h.Instance=function(j,k){this.textarea=d.get(j);this.config=e.merge(h.config,k||{});this._init()};h.Instance.prototype={_init:function(){this._renderUI();this._initPlugins()},_renderUI:function(){this._renderContainer();this._setupContentPanel()},_initPlugins:function(){var k,l,j=h.plugins;h.Toolbar.init(this);for(k in j){l=j[k];if(l.inited){continue}if(l.init){l.init(this)}l.inited=true}},_renderContainer:function(){var l=this.textarea,o=d.getRegion(l),n=(o.right-o.left)+"px",j=(o.bottom-o.top)+"px",k=document.createElement("div"),m;k.className=c;k.style.width=n;k.innerHTML=f;m=k.childNodes[1];m.style.width=n;m.style.height=j;m.setAttribute("frameBorder",0);l.style.display="none";d.insertBefore(k,l);this.container=k;this.toolbar=k.childNodes[0];this.contentWin=m.contentWindow;this.contentDoc=m.contentWindow.document;this.statusbar=k.childNodes[2]},_setupContentPanel:function(){var l=this.contentDoc,k=this.config,j=k.base+i+"/"+k.theme+"/"+g;l.open();l.write(b.replace("{CONTENT_CSS}",j).replace("{CONTENT}",this.textarea.value));l.close();l.designMode="on"},execCommand:function(j,k){this.contentWin.focus();h.Command.exec(this.contentDoc,j,k)},getData:function(){var k=this.contentDoc.body,j="",l=h.plugins.save;if(h.Dom.getText(k)){j=k.innerHTML;if(l&&l.filterData){j=l.filterData(j)}}return j}}});KISSY.Editor.add("core~toolbar",function(h){var b=YAHOO.util,a=b.Dom,q=b.Event,n=YAHOO.env.ua.ie,f=h.PLUGIN_TYPE,d='<div class="kissy-toolbar-separator kissy-inline-block"></div>',l='<div class="kissy-toolbar-button kissy-inline-block" title="{TITLE}"><div class="kissy-toolbar-button-outer-box"><div class="kissy-toolbar-button-inner-box"><span class="kissy-toolbar-item kissy-toolbar-{NAME}">{TEXT}</span></div></div></div>',j='<div class="kissy-toolbar-menu-button-caption kissy-inline-block"><span class="kissy-toolbar-item kissy-toolbar-{NAME}">{TEXT}</span></div><div class="kissy-toolbar-menu-button-dropdown kissy-inline-block"></div>',o="kissy-toolbar-menu-button",g="kissy-toolbar-select",e="kissy-toolbar-button-active",c,p,r,k,m,i=document.createElement("div");h.Toolbar={init:function(t){var v,s,u;c=t;p=c.config;r=h.lang[p.language];k=p.toolbar;m=h.plugins;for(v=0,s=k.length;v<s;++v){u=k[v];if(u){if(!(u in m)){continue}this._addItem(m[u])}else{this._addSeparator()}}},_addItem:function(u){var t,s=u.type;if(!u.lang){u.lang=r[u.name]||{}}i.innerHTML=l.replace("{TITLE}",u.lang.title||"").replace("{NAME}",u.name).replace("{TEXT}",u.lang.text||"");u.domEl=t=i.firstChild;if(s==f.TOOLBAR_MENU_BUTTON||s==f.TOOLBAR_SELECT){this._renderMenuButton(u);if(s==f.TOOLBAR_SELECT){this._renderSelect(u)}}this._bindItemUI(u);this._addToToolbar(t);if(u.init){u.init(c)}u.inited=true},_renderMenuButton:function(u){var t=u.domEl,s=t.getElementsByTagName("span")[0].parentNode;a.addClass(t,o);s.innerHTML=j.replace("{NAME}",u.name).replace("{TEXT}",u.lang.text||"")},_renderSelect:function(s){a.addClass(s.domEl,g)},_bindItemUI:function(t){var s=t.domEl;if(t.fn){q.on(s,"click",function(){t.fn(c)})}q.on(s,"mousedown",function(){a.addClass(s,e)});q.on(s,"mouseup",function(){a.removeClass(s,e)});q.on(s,"mouseout",function(w){var v=q.getRelatedTarget(w),u;if(s.contains){u=s.contains(v)}else{if(s.compareDocumentPosition){u=s.compareDocumentPosition(v)&8}}if(u){return}a.removeClass(s,e)})},_addSeparator:function(){i.innerHTML=d;this._addToToolbar(i.firstChild)},_addToToolbar:function(s){if(n){s=this.setItemUnselectable(s)}c.toolbar.appendChild(s)},setItemUnselectable:function(w){var t,v,s,x,u;t=w.getElementsByTagName("*");for(v=-1,s=t.length;v<s;++v){u=(v==-1)?w:t[v];x=u.nodeName;if(x&&x!="INPUT"){u.setAttribute("unselectable","on")}}return w}}});KISSY.Editor.add("core~menu",function(e){var f=YAHOO.util,c=f.Dom,b=f.Event,d="visibility",a="kissy-drop-menu";e.Menu={generateDropMenu:function(i,h,k){var j=document.createElement("div"),g=this;j.className=a;j.style[d]="hidden";document.body.appendChild(j);b.on(h,"click",function(l){b.stopPropagation(l);g._hide(i.activeDropMenu);if(i.activeDropMenu!=j){g._setDropMenuPosition(h,j,k);g._show(j);i.activeDropMenu=j}else{i.activeDropMenu=null}});b.on([document,i.contentDoc],"click",function(){g._hide(i.activeDropMenu);i.activeDropMenu=null});this._initResizeEvent(h,j,k);return j},_setDropMenuPosition:function(g,i,l){var h=c.getRegion(g),k=h.left,j=h.bottom;if(l){k+=l[0];j+=l[1]}i.style.left=k+"px";i.style.top=j+"px"},_isVisible:function(g){if(!g){return false}return g.style[d]!="hidden"},_hide:function(g){if(g){g.style[d]="hidden"}},_show:function(g){if(g){g.style[d]="visible"}},_initResizeEvent:function(i,j,k){var h=this,g;b.on(window,"resize",function(){if(g){clearTimeout(g)}g=setTimeout(function(){if(h._isVisible(j)){h._setDropMenuPosition(i,j,k)}},50)})}}});KISSY.Editor.add("plugins~base",function(b){var c=b.PLUGIN_TYPE,a="bold,italic,underline,strikeThrough,insertOrderedList,insertUnorderedList,outdent,indent,justifyLeft,justifyCenter,justifyRight";b.addPlugin(a.split(","),{type:c.TOOLBAR_BUTTON,fn:function(d){d.execCommand(this.name)}})});KISSY.Editor.add("plugins~color",function(l){var b=YAHOO.util,h=b.Dom,k=b.Event,e=YAHOO.env.ua.ie,j=l.PLUGIN_TYPE,d='<table class="kissy-palette-table"><tbody>{TR}</tbody></table>',c='<td class="kissy-palette-cell"><div class="kissy-palette-colorswatch" title="{COLOR}" style="background-color:{COLOR}"></div></td>',i=["000","444","666","999","CCC","EEE","F3F3F3","FFF"],g=["F00","F90","FF0","0F0","0FF","00F","90F","F0F"],f=["F4CCCC","FCE5CD","FFF2CC","D9EAD3","D0E0E3","CFE2F3","D9D2E9","EAD1DC","EA9999","F9CB9C","FFE599","B6D7A8","A2C4C9","9FC5E8","B4A7D6","D5A6BD","E06666","F6B26B","FFD966","93C47D","76A5AF","6FA8DC","8E7CC3","C27BAD","CC0000","E69138","F1C232","6AA84F","45818E","3D85C6","674EA7","A64D79","990000","B45F06","BF9000","38761D","134F5C","0B5394","351C75","741B47","660000","783F04","7F6000","274E13","0C343D","073763","20124D","4C1130"],a="kissy-palette-cell-selected";l.addPlugin(["foreColor","backColor"],{type:j.TOOLBAR_MENU_BUTTON,color:"",_indicator:null,dropMenu:null,init:function(o){var n=this.domEl,m=n.getElementsByTagName("span")[0].parentNode;this.color=(this.name=="foreColor")?"#000000":"#FFFFFF";h.addClass(n,"kissy-toolbar-color-button");m.innerHTML='<div class="kissy-toolbar-color-button-indicator" style="border-bottom-color:'+this.color+'">'+m.innerHTML+"</div>";this._indicator=m.firstChild;this._initDropMenu(o,n)},_initDropMenu:function(n,m){this.dropMenu=l.Menu.generateDropMenu(n,m,[1,0]);this._generatePalettes();if(e){l.Toolbar.setItemUnselectable(this.dropMenu)}this._bindPickEvent(n);this._updateSelectedColor(this.color)},_generatePalettes:function(){var m="";m+=this._getPaletteTable(i);m+=this._getPaletteTable(g);m+=this._getPaletteTable(f);this.dropMenu.innerHTML=m},_getPaletteTable:function(o){var q,n=o.length,p,m="<tr>";for(q=0,n=o.length;q<n;++q){if(q!=0&&q%8==0){m+="</tr><tr>"}p=l.Color.toRGB("#"+o[q]).toUpperCase();m+=c.replace(/{COLOR}/g,p)}m+="</tr>";return d.replace("{TR}",m)},_bindPickEvent:function(n){var m=this;k.on(this.dropMenu,"click",function(p){var q=k.getTarget(p),o=q.getAttribute("title");if(o&&o.indexOf("RGB")===0){m.setColor(l.Color.toHex(o));n.execCommand(m.name,m.color)}})},setColor:function(m){this.color=m;this._indicator.style.borderBottomColor=m;this._updateSelectedColor(m)},_updateSelectedColor:function(q){var o,m,p,n=this.dropMenu.getElementsByTagName("div");for(o=0,m=n.length;o<m;++o){p=n[o];if(l.Color.toHex(p.style.backgroundColor)==q){h.addClass(p.parentNode,a)}else{h.removeClass(p.parentNode,a)}}}})});KISSY.Editor.add("plugins~link",function(a){var b=a.PLUGIN_TYPE;a.addPlugin("link",{type:b.TOOLBAR_BUTTON,fn:function(c){var e=this.lang,d;d=window.prompt(e.dialogMessage,"http://");c.execCommand("createLink",d)}})});KISSY.Editor.add("plugins~undo",function(a){var b=a.PLUGIN_TYPE;a.addPlugin(["undo","redo"],{type:b.TOOLBAR_BUTTON,fn:function(c){c.execCommand(this.name)}})});KISSY.Editor.add("plugins~font",function(j){var a=YAHOO.util,c=a.Dom,i=a.Event,b=YAHOO.env.ua.ie,f=j.PLUGIN_TYPE,g='<ul class="kissy-select-list">{LI}</ul>',e='<li class="kissy-option" data-value="{VALUE}"><span class="kissy-option-checkbox"></span><span style="{STYLE}">{KEY}</span></li>',h="kissy-option-selected",d="Default";j.addPlugin(["fontName","fontSize"],{type:f.TOOLBAR_SELECT,selectedValue:"",selectHead:null,selectList:null,options:[],init:function(l){var k=this.domEl;this.options=this.lang.options;this.selectHead=k.getElementsByTagName("span")[0];this._initSelectList(l,k);this._setSelectedOption(this.options[d])},_initSelectList:function(l,k){this.selectList=j.Menu.generateDropMenu(l,k,[1,0]);this._renderSelectList();this._bindPickEvent(l)},_renderSelectList:function(){var m="",k=this.options,l,n;for(l in k){if(l==d){continue}n=k[l];m+=e.replace("{VALUE}",n).replace("{STYLE}",this._getOptionStyle(n)).replace("{KEY}",l)}this.selectList.innerHTML=g.replace("{LI}",m);c.addClass(this.selectList,"kissy-drop-menu-"+this.name);if(b){j.Toolbar.setItemUnselectable(this.selectList)}},_bindPickEvent:function(l){var k=this;i.on(this.selectList,"click",function(m){var n=i.getTarget(m),o;if(n.nodeName!="LI"){n=c.getAncestorByTagName(n,"li")}if(!n){return}o=n.getAttribute("data-value");if(o){k._setSelectedOption(o);l.execCommand(k.name,k.selectedValue)}})},_setSelectedOption:function(k){this.selectedValue=k;this.selectHead.innerHTML=this._getOptionKey(k);this._updateSelectedOption(k)},_getOptionStyle:function(k){if(this.name=="fontName"){return"font-family:"+k}else{return"font-size:"+k}},_getOptionKey:function(m){var k=this.options,l;for(l in k){if(l==d){continue}if(k[l]==m){return l}}},_updateSelectedOption:function(o){var l=this.selectList.getElementsByTagName("li"),m,k=l.length,n;for(m=0;m<k;++m){n=l[m];if(n.getAttribute("data-value")==o){c.addClass(n,h)}else{c.removeClass(n,h)}}}})});KISSY.Editor.add("plugins~save",function(b){var c=YAHOO.util,a=c.Event,d=b.PLUGIN_TYPE;b.addPlugin("save",{type:d.CUSTOM,init:function(f){var e=f.textarea,g=e.form;if(g){a.on(g,"submit",function(){e.value=f.getData()})}},filterData:function(e){e=e.replace(/<\/?[^>]+>/g,function(f){return f.toLowerCase()}).replace(/<strong>/g,"<b>").replace(/<\/strong>/g,"</b>").replace(/<em>/g,"<i>").replace(/<\/em>/g,"</i>");return e}})});