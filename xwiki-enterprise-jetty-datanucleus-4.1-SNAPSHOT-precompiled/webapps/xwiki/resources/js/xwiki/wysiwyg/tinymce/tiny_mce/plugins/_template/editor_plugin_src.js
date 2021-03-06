tinyMCE.importPluginLanguagePack("template","en,tr,he,nb,ru,ru_KOI8-R,ru_UTF-8,nn,fi,cy,es,is,pl");
var TinyMCE_TemplatePlugin={getInfo:function(){return{longname:"Template plugin",author:"Your name",authorurl:"http://www.yoursite.com",infourl:"http://www.yoursite.com/docs/template.html",version:"1.0"}
},initInstance:function(a){alert("Initialization parameter:"+tinyMCE.getParam("template_someparam",false));
a.addShortcut("ctrl","t","lang_template_desc","mceTemplate")
},getControlHTML:function(a){switch(a){case"template":return tinyMCE.getButtonHTML(a,"lang_template_desc","{$pluginurl}/images/template.gif","mceTemplate",true)
}return""
},execCommand:function(e,a,d,f,c){switch(d){case"mceTemplate":if(f){var b=new Array();
b.file="../../plugins/template/popup.htm";
b.width=300;
b.height=200;
tinyMCE.openWindow(b,{editor_id:e,some_custom_arg:"somecustomdata"});
tinyMCE.triggerNodeChange(false)
}else{alert("execCommand: mceTemplate gets called from popup.")
}return true
}return false
},handleNodeChange:function(f,d,e,c,a,b){if(d.parentNode.nodeName=="STRONG"||d.parentNode.nodeName=="B"){tinyMCE.switchClass(f+"_template","mceButtonSelected");
return true
}tinyMCE.switchClass(f+"_template","mceButtonNormal")
},setupContent:function(c,a,b){},onChange:function(a){},handleEvent:function(a){top.status="template plugin event: "+a.type;
return true
},cleanup:function(a,b,c){switch(a){case"get_from_editor":alert("[FROM] Value HTML string: "+b);
break;
case"insert_to_editor":alert("[TO] Value HTML string: "+b);
break;
case"get_from_editor_dom":alert("[FROM] Value DOM Element "+b.innerHTML);
break;
case"insert_to_editor_dom":alert("[TO] Value DOM Element: "+b.innerHTML);
break
}return b
},_someInternalFunction:function(d,c){return 1
}};
tinyMCE.addPlugin("template",TinyMCE_TemplatePlugin);