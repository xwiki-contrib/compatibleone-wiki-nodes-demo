tinyMCE.importPluginLanguagePack("paste","en,tr,sv,cs,zh_cn,fr_ca,da,he,nb,de,hu,ru,ru_KOI8-R,ru_UTF-8,nn,fi,es,cy,is,pl,nl,fr,pt_br");
var TinyMCE_PastePlugin={getInfo:function(){return{longname:"Paste text/word",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_paste.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},initInstance:function(a){if(tinyMCE.isMSIE&&tinyMCE.getParam("paste_auto_cleanup_on_paste",false)){tinyMCE.addEvent(a.getBody(),"paste",TinyMCE_PastePlugin._handlePasteEvent)
}},getControlHTML:function(a){switch(a){case"pastetext":return tinyMCE.getButtonHTML(a,"lang_paste_text_desc","{$pluginurl}/images/pastetext.gif","mcePasteText",true);
case"pasteword":return tinyMCE.getButtonHTML(a,"lang_paste_word_desc","{$pluginurl}/images/pasteword.gif","mcePasteWord",true);
case"selectall":return tinyMCE.getButtonHTML(a,"lang_selectall_desc","{$pluginurl}/images/selectall.gif","mceSelectAll",true)
}return""
},execCommand:function(g,c,f,h,e){switch(f){case"mcePasteText":if(h){if((tinyMCE.isMSIE&&!tinyMCE.isOpera)&&!tinyMCE.getParam("paste_use_dialog",false)){TinyMCE_PastePlugin._insertText(clipboardData.getData("Text"),true)
}else{var d=new Array();
d.file="../../plugins/paste/pastetext.htm";
d.width=450;
d.height=400;
var a="";
tinyMCE.openWindow(d,{editor_id:g,plain_text:a,resizable:"yes",scrollbars:"no",inline:"yes",mceDo:"insert"})
}}else{TinyMCE_PastePlugin._insertText(e.html,e.linebreaks)
}return true;
case"mcePasteWord":if(h){if((tinyMCE.isMSIE&&!tinyMCE.isOpera)&&!tinyMCE.getParam("paste_use_dialog",false)){var b=TinyMCE_PastePlugin._clipboardHTML();
if(b&&b.length>0){TinyMCE_PastePlugin._insertWordContent(b)
}}else{var d=new Array();
d.file="../../plugins/paste/pasteword.htm";
d.width=450;
d.height=400;
var a="";
tinyMCE.openWindow(d,{editor_id:g,plain_text:a,resizable:"yes",scrollbars:"no",inline:"yes",mceDo:"insert"})
}}else{TinyMCE_PastePlugin._insertWordContent(e)
}return true;
case"mceSelectAll":tinyMCE.execInstanceCommand(g,"selectall");
return true
}return false
},_handlePasteEvent:function(d){switch(d.type){case"paste":var a=TinyMCE_PastePlugin._clipboardHTML();
var b,c=tinyMCE.selectedInstance;
if(c&&(b=c.getRng())&&b.text.length>0){tinyMCE.execCommand("delete")
}if(a&&a.length>0){tinyMCE.execCommand("mcePasteWord",false,a)
}tinyMCE.cancelEvent(d);
return false
}return true
},_insertText:function(d,c){if(d&&d.length>0){if(c){if(tinyMCE.getParam("paste_create_paragraphs",true)){var g=tinyMCE.getParam("paste_replace_list","\u2122,<sup>TM</sup>,\u2026,...,\u201c|\u201d,\",\u2019,',\u2013|\u2014|\u2015|\u2212,-").split(",");
for(var a=0;
a<g.length;
a+=2){d=d.replace(new RegExp(g[a],"gi"),g[a+1])
}d=tinyMCE.regexpReplace(d,"\r\n\r\n","</p><p>","gi");
d=tinyMCE.regexpReplace(d,"\r\r","</p><p>","gi");
d=tinyMCE.regexpReplace(d,"\n\n","</p><p>","gi");
if((pos=d.indexOf("</p><p>"))!=-1){tinyMCE.execCommand("Delete");
var b=tinyMCE.selectedInstance.getFocusElement();
var h=new Array();
do{if(b.nodeType==1){if(b.nodeName=="TD"||b.nodeName=="BODY"){break
}h[h.length]=b
}}while(b=b.parentNode);
var e="",f="</p>";
e+=d.substring(0,pos);
for(var a=0;
a<h.length;
a++){e+="</"+h[a].nodeName+">";
f+="<"+h[(h.length-1)-a].nodeName+">"
}e+="<p>";
d=e+d.substring(pos+7)+f
}}if(tinyMCE.getParam("paste_create_linebreaks",true)){d=tinyMCE.regexpReplace(d,"\r\n","<br />","gi");
d=tinyMCE.regexpReplace(d,"\r","<br />","gi");
d=tinyMCE.regexpReplace(d,"\n","<br />","gi")
}}tinyMCE.execCommand("mceInsertRawHTML",false,d)
}},_insertWordContent:function(content){if(content&&content.length>0){var bull=String.fromCharCode(8226);
var middot=String.fromCharCode(183);
var cb;
if((cb=tinyMCE.getParam("paste_insert_word_content_callback",""))!=""){content=eval(cb+"('before', content)")
}var rl=tinyMCE.getParam("paste_replace_list","\u2122,<sup>TM</sup>,\u2026,...,\u201c|\u201d,\",\u2019,',\u2013|\u2014|\u2015|\u2212,-").split(",");
for(var i=0;
i<rl.length;
i+=2){content=content.replace(new RegExp(rl[i],"gi"),rl[i+1])
}if(tinyMCE.getParam("paste_convert_headers_to_strong",false)){content=content.replace(new RegExp("<p class=MsoHeading.*?>(.*?)</p>","gi"),"<p><b>$1</b></p>")
}content=content.replace(new RegExp('tab-stops: list [0-9]+.0pt">',"gi"),'">--list--');
content=content.replace(new RegExp(bull+"(.*?)<BR>","gi"),"<p>"+middot+"$1</p>");
content=content.replace(new RegExp('<SPAN style="mso-list: Ignore">',"gi"),"<span>"+bull);
content=content.replace(/<o:p><\/o:p>/gi,"");
content=content.replace(new RegExp('<br style="page-break-before: always;.*>',"gi"),"-- page break --");
content=content.replace(new RegExp("<(!--)([^>]*)(--)>","g"),"");
if(tinyMCE.getParam("paste_remove_spans",true)){content=content.replace(/<\/?span[^>]*>/gi,"")
}if(tinyMCE.getParam("paste_remove_styles",true)){content=content.replace(new RegExp('<(\\w[^>]*) style="([^"]*)"([^>]*)',"gi"),"<$1$3")
}content=content.replace(/<\/?font[^>]*>/gi,"");
switch(tinyMCE.getParam("paste_strip_class_attributes","all")){case"all":content=content.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi,"<$1$3");
break;
case"mso":content=content.replace(new RegExp('<(\\w[^>]*) class="?mso([^ |>]*)([^>]*)',"gi"),"<$1$3");
break
}content=content.replace(new RegExp('href="?'+TinyMCE_PastePlugin._reEscape(""+document.location)+"","gi"),'href="'+tinyMCE.settings.document_base_url);
content=content.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi,"<$1$3");
content=content.replace(/<\\?\?xml[^>]*>/gi,"");
content=content.replace(/<\/?\w+:[^>]*>/gi,"");
content=content.replace(/-- page break --\s*<p>&nbsp;<\/p>/gi,"");
content=content.replace(/-- page break --/gi,"");
if(!tinyMCE.settings.force_p_newlines){content=content.replace("","","gi");
content=content.replace("</p>","<br /><br />","gi")
}if(!tinyMCE.isMSIE&&!tinyMCE.settings.force_p_newlines){content=content.replace(/<\/?p[^>]*>/gi,"")
}content=content.replace(/<\/?div[^>]*>/gi,"");
if(tinyMCE.getParam("paste_convert_middot_lists",true)){var div=document.createElement("div");
div.innerHTML=content;
var className=tinyMCE.getParam("paste_unindented_list_class","unIndentedList");
while(TinyMCE_PastePlugin._convertMiddots(div,"--list--")){}while(TinyMCE_PastePlugin._convertMiddots(div,middot,className)){}while(TinyMCE_PastePlugin._convertMiddots(div,bull)){}content=div.innerHTML
}if(tinyMCE.getParam("paste_convert_headers_to_strong",false)){content=content.replace(/<h[1-6]>&nbsp;<\/h[1-6]>/gi,"<p>&nbsp;&nbsp;</p>");
content=content.replace(/<h[1-6]>/gi,"<p><b>");
content=content.replace(/<\/h[1-6]>/gi,"</b></p>");
content=content.replace(/<b>&nbsp;<\/b>/gi,"<b>&nbsp;&nbsp;</b>");
content=content.replace(/^(&nbsp;)*/gi,"")
}content=content.replace(/--list--/gi,"");
if((cb=tinyMCE.getParam("paste_insert_word_content_callback",""))!=""){content=eval(cb+"('after', content)")
}tinyMCE.execCommand("mceInsertContent",false,content);
window.setTimeout('tinyMCE.execCommand("mceCleanup");',1)
}},_reEscape:function(d){var a="?.\\*[](){}+^$:";
var e="";
for(var b=0;
b<d.length;
b++){var f=d.charAt(b);
if(a.indexOf(f)!=-1){e+="\\"+f
}else{e+=f
}}return e
},_convertMiddots:function(a,n,e){var j=String.fromCharCode(183);
var h=String.fromCharCode(8226);
var b=a.getElementsByTagName("p");
var d;
for(var f=0;
f<b.length;
f++){var c=b[f];
if(c.innerHTML.indexOf(n)==0){var g=document.createElement("ul");
if(e){g.className=e
}var m=document.createElement("li");
m.innerHTML=c.innerHTML.replace(new RegExp(""+j+"|"+h+"|--list--|&nbsp;","gi"),"");
g.appendChild(m);
var l=c.nextSibling;
while(l){if(l.nodeType==3&&new RegExp("^\\s$","m").test(l.nodeValue)){l=l.nextSibling;
continue
}if(n==j){if(l.nodeType==1&&new RegExp("^o(\\s+|&nbsp;)").test(l.innerHTML)){if(!d){d=g;
g=document.createElement("ul");
d.appendChild(g)
}l.innerHTML=l.innerHTML.replace(/^o/,"")
}else{if(d){g=d;
d=null
}if(l.nodeType!=1||l.innerHTML.indexOf(n)!=0){break
}}}else{if(l.nodeType!=1||l.innerHTML.indexOf(n)!=0){break
}}var k=l.nextSibling;
var m=document.createElement("li");
m.innerHTML=l.innerHTML.replace(new RegExp(""+j+"|"+h+"|--list--|&nbsp;","gi"),"");
l.parentNode.removeChild(l);
g.appendChild(m);
l=k
}c.parentNode.replaceChild(g,c);
return true
}}return false
},_clipboardHTML:function(){var div=document.getElementById("_TinyMCE_clipboardHTML");
if(!div){var div=document.createElement("DIV");
div.id="_TinyMCE_clipboardHTML";
with(div.style){visibility="hidden";
overflow="hidden";
position="absolute";
width=1;
height=1
}document.body.appendChild(div)
}div.innerHTML="";
var rng=document.body.createTextRange();
rng.moveToElementText(div);
rng.execCommand("Paste");
var html=div.innerHTML;
div.innerHTML="";
return html
}};
tinyMCE.addPlugin("paste",TinyMCE_PastePlugin);