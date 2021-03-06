var TinyMCE_NonEditablePlugin={getInfo:function(){return{longname:"Non editable elements",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_noneditable.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},initInstance:function(a){tinyMCE.importCSS(a.getDoc(),tinyMCE.baseURL+"/plugins/noneditable/css/noneditable.css");
if(tinyMCE.isMSIE5_0){tinyMCE.settings.plugins=tinyMCE.settings.plugins.replace(/noneditable/gi,"Noneditable")
}if(tinyMCE.isGecko){tinyMCE.addEvent(a.getDoc(),"keyup",TinyMCE_NonEditablePlugin._fixKeyUp)
}},cleanup:function(j,f,d){switch(j){case"insert_to_editor_dom":var a=tinyMCE.getNodeTree(f,new Array(),1);
var e=tinyMCE.getParam("noneditable_editable_class","mceEditable");
var k=tinyMCE.getParam("noneditable_noneditable_class","mceNonEditable");
for(var c=0;
c<a.length;
c++){var h=a[c];
var b=tinyMCE.getAttrib(h,"contenteditable");
if(new RegExp("true|false","gi").test(b)){TinyMCE_NonEditablePlugin._setEditable(h,b=="true")
}if(tinyMCE.isMSIE){var g=h.className?h.className:"";
if(g.indexOf(e)!=-1){h.contentEditable=true
}if(g.indexOf(k)!=-1){h.contentEditable=false
}}}break;
case"insert_to_editor":if(tinyMCE.isMSIE){var e=tinyMCE.getParam("noneditable_editable_class","mceEditable");
var k=tinyMCE.getParam("noneditable_noneditable_class","mceNonEditable");
f=f.replace(new RegExp('class="(.*)('+e+')([^"]*)"',"gi"),'class="$1$2$3" contenteditable="true"');
f=f.replace(new RegExp('class="(.*)('+k+')([^"]*)"',"gi"),'class="$1$2$3" contenteditable="false"')
}break;
case"get_from_editor_dom":if(tinyMCE.getParam("noneditable_leave_contenteditable",false)){var a=tinyMCE.getNodeTree(f,new Array(),1);
for(var c=0;
c<a.length;
c++){a[c].removeAttribute("contenteditable")
}}break
}return f
},_fixKeyUp:function(f){var d=tinyMCE.selectedInstance;
var c=d.getSel();
var a=d.getRng();
var b=c.anchorNode;
if((f.keyCode==38||f.keyCode==37||f.keyCode==40||f.keyCode==39)&&(elm=TinyMCE_NonEditablePlugin._isNonEditable(b))!=null){a=d.getDoc().createRange();
a.selectNode(elm);
a.collapse(true);
c.removeAllRanges();
c.addRange(a);
tinyMCE.cancelEvent(f)
}},_isNonEditable:function(d){var b=tinyMCE.getParam("noneditable_editable_class","mceEditable");
var a=tinyMCE.getParam("noneditable_noneditable_class","mceNonEditable");
if(!d){return
}do{var c=d.className?d.className:"";
if(c.indexOf(b)!=-1){return null
}if(c.indexOf(a)!=-1){return d
}}while(d=d.parentNode);
return null
},_setEditable:function(e,d){var b=tinyMCE.getParam("noneditable_editable_class","mceEditable");
var a=tinyMCE.getParam("noneditable_noneditable_class","mceNonEditable");
var c=e.className?e.className:"";
if(c.indexOf(b)!=-1||c.indexOf(a)!=-1){return
}if((c=tinyMCE.getAttrib(e,"class"))!=""){c+=" "
}c+=d?b:a;
e.setAttribute("class",c);
e.className=c
}};
tinyMCE.addPlugin("noneditable",TinyMCE_NonEditablePlugin);