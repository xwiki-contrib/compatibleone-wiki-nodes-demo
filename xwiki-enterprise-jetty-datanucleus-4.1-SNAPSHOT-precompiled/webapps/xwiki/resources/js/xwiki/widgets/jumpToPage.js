var XWiki=(function(c){var a=c.widgets=c.widgets||{};
if(!c.widgets.ModalPopup){if(console&&console.warn){console.warn("[JumpToPage widget] Required class missing: XWiki.widgets.ModalPopup")
}}else{a.JumpToPage=Class.create(a.ModalPopup,{urlTemplate:"$xwiki.getURL('__space__.__document__', '__action__')",initialize:function($super){var e=new Element("div");
this.input=new Element("input",{type:"text",id:"jmp_target",title:"$msg.get('core.viewers.jump.dialog.input.tooltip')"});
e.appendChild(this.input);
this.viewButton=this.createButton("button","$msg.get('core.viewers.jump.dialog.actions.view')","$msg.get('core.viewers.jump.dialog.actions.view.tooltip')","jmp_view");
this.editButton=this.createButton("button","$msg.get('core.viewers.jump.dialog.actions.edit')","$msg.get('core.viewers.jump.dialog.actions.edit.tooltip')","jmp_edit");
var d=new Element("div",{"class":"buttons"});
d.appendChild(this.viewButton);
d.appendChild(this.editButton);
e.appendChild(d);
$super(e,{show:{method:this.showDialog,keys:[$msg.get("core.viewers.jump.shortcuts")]},view:{method:this.openDocument,keys:[$msg.get("core.viewers.jump.dialog.actions.view.shortcuts")]},edit:{method:this.openDocument,keys:[$msg.get("core.viewers.jump.dialog.actions.edit.shortcuts")]}},{title:"$msg.get('core.viewers.jump.dialog.content')",verticalPosition:"top"});
this.addQuickLinksEntry()
},createDialog:function($super,d){Event.observe(this.viewButton,"click",this.openDocument.bindAsEventListener(this,"view"));
Event.observe(this.editButton,"click",this.openDocument.bindAsEventListener(this,"edit"));
$super(d);
if(typeof(c.widgets.Suggest)!="undefined"){new c.widgets.Suggest(this.input,{script:"${request.contextPath}/rest/wikis/${context.database}/search?scope=name&number=10&",varname:"q",noresults:"$msg.get('core.viewers.jump.suggest.noResults')",icon:"${xwiki.getSkinFile('icons/silk/page_white_text.png')}",json:true,resultsParameter:"searchResults",resultId:"id",resultValue:"pageFullName",resultInfo:"pageFullName",timeout:30000,parentContainer:this.dialog})
}},showDialog:function($super){$super();
this.input.value="";
this.input.focus()
},openDocument:function(d,e){if(!$("as_jmp_target")&&this.input.value!=""){Event.stop(d);
window.self.location=this.urlTemplate.replace("__space__/__document__",this.input.value.replace(".","/")).replace("__action__",e)
}},addQuickLinksEntry:function(){$$(".panel.QuickLinks .xwikipanelcontents").each(function(e){var d=new Element("span",{"class":"jmp-activator"});
d.update("$msg.get('core.viewers.jump.quickLinksText')");
Event.observe(d,"click",function(f){this.showDialog(f)
}.bindAsEventListener(this));
e.appendChild(d)
}.bind(this))
}});
function b(){return new a.JumpToPage()
}(c.domIsLoaded&&b())||document.observe("xwiki:dom:loaded",b)
}return c
}(XWiki||{}));