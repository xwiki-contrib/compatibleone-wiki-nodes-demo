var TinyMCE_wikipluginPlugin={getInfo:function(){return{longname:"Wiki Plugin"}
},initInstance:function(a){},execCommand:function(d,a,c,e,b){return false
},handleNodeChange:function(f,d,e,c,a,b){return true
},setupContent:function(c,a,b){},onChange:function(a){},handleEvent:function(a){top.status="wiki plugin event: "+a.type;
return true
},cleanup:function(b,c,d){switch(b){case"get_from_editor":var e=d.editorId+"_content";
var a=document.getElementById(e);
if(a&&a.style.display!="none"){return a.value
}else{c=wikiEditor.convertInternal(c)
}break;
case"insert_to_editor":c=wikiEditor.convertExternal(c);
break;
case"get_from_editor_dom":c=wikiEditor.encodeNode(c);
c=wikiEditor.tagListInternal(c);
break;
case"insert_to_editor_dom":break
}return c
}};
tinyMCE.addPlugin("wikiplugin",TinyMCE_wikipluginPlugin);