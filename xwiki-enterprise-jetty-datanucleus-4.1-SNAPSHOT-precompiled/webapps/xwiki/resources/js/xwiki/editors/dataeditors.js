var XWiki=(function(c){var a=c.editors=c.editors||{};
a.XDataEditors=Class.create({initialize:function(){this.classDocument=$$("meta[name=document]")[0].content;
this.classDocumentName=$$("meta[name=page]")[0].content;
this.classDocumentSpace=$$("meta[name=space]")[0].content;
this.urlEditTemplate="$xwiki.getURL('__space__.__page__', 'edit')".replace("__space__",this.classDocumentSpace).replace("__page__",this.classDocumentName);
this.urlAddPropertyTemplate="$xwiki.getURL('__space__.__page__', 'propadd')".replace("__space__",this.classDocumentSpace).replace("__page__",this.classDocumentName);
$$(".xclass").each(function(d){this.enhanceClassUX(d)
}.bind(this));
this.ajaxObjectAdd($("add_xobject"));
this.ajaxPropertyAdd();
this.makeSortable($("xwikiclassproperties"));
this.classSwitcherBehavior();
this.ajaxRemoveDeprecatedProperties($("body"),".syncAllProperties")
},enhanceClassUX:function(d){this.expandCollapseClass(d);
d.select(".xobject").each(function(e){this.enhanceObjectUX(e)
}.bind(this));
d.select(".xproperty").each(function(e){this.expandCollapseMetaProperty(e);
this.ajaxPropertyDeletion(e);
this.makeDisableVisible(e)
}.bind(this));
this.ajaxObjectAdd(d)
},enhanceObjectUX:function(d){this.ajaxObjectDeletion(d);
this.editButtonBehavior(d);
this.expandCollapseObject(d);
this.ajaxRemoveDeprecatedProperties(d,".syncProperties")
},ajaxObjectAdd:function(d){if(!d){return
}d.select(".xobject-add-control").each(function(e){e.observe("click",function(j){e.blur();
j.stop();
var g,h,i;
if(e.href){g=e.href.replace(/[?&]xredirect=[^&]*/,"");
h=true
}else{var f=d.down("select");
if(f&&f.selectedIndex>=0){i=f.options[f.selectedIndex].value
}h=i&&i!="-";
g=this.urlEditTemplate+"?xpage=editobject&xaction=addObject&className="+i
}if(!e.disabled&&h){new Ajax.Request(g,{onCreate:function(){e.disabled=true;
e.notification=new c.widgets.Notification("$msg.get('core.editors.object.add.inProgress')","inprogress")
},onSuccess:function(k){var l=e.up(".add_xobject");
if(l){var n;
if(l.up(".xclass")){l.insert({before:k.responseText});
n=l.previous()
}else{l.insert({after:k.responseText});
n=l.next()
}if(n){var p;
if(n.hasClassName("xclass")){this.enhanceClassUX(n);
p=n.down(".xobject")
}else{if(n.hasClassName("xobject")){this.enhanceObjectUX(n);
var m=n.id.replace(/^xobject_/,"xclass_").replace(/_\d+$/,"");
var o=$(m);
if(o){o.down(".add_xobject").insert({before:n});
this.updateXObjectCount(o)
}p=n
}}p.removeClassName("collapsed");
p.up(".xclass").removeClassName("collapsed")
}}e.notification.replace(new c.widgets.Notification("$msg.get('core.editors.object.add.done')","done"))
}.bind(this),onFailure:function(k){var l=k.statusText;
if(k.statusText==""||k.status==12031){l="Server not responding"
}e.notification.replace(new c.widgets.Notification("$msg.get('core.editors.object.add.failed')"+l,"error"))
},onComplete:function(){e.disabled=false
},on1223:function(k){k.request.options.onSuccess(k)
},on0:function(k){k.request.options.onFailure(k)
}})
}}.bindAsEventListener(this))
}.bind(this))
},ajaxObjectDeletion:function(d){var e=d.down("a.delete");
e.observe("click",function(f){e.blur();
f.stop();
if(!e.disabled){new c.widgets.ConfirmedAjaxRequest(e.href,{onCreate:function(){e.disabled=true
},onSuccess:function(){var g=e.up(".xobject");
var h=g.up(".xclass");
g.remove();
this.updateXObjectCount(h)
}.bind(this),onComplete:function(){e.disabled=false
}},{confirmationText:"$msg.get('core.editors.object.delete.confirm')",progressMessageText:"$msg.get('core.editors.object.delete.inProgress')",successMessageText:"$msg.get('core.editors.object.delete.done')",failureMessageText:"$msg.get('core.editors.object.delete.failed')"})
}}.bindAsEventListener(this))
},ajaxRemoveDeprecatedProperties:function(d,e){d.select(e).each(function(f){f.observe("click",function(g){f.blur();
g.stop();
if(!f.disabled){new Ajax.Request(f.href,{onCreate:function(){f.disabled=true;
f.notification=new c.widgets.Notification("$msg.get('core.editors.object.removeDeprecatedProperties.inProgress')","inprogress")
},onSuccess:function(h){d.select(".deprecatedProperties").invoke("remove");
f.notification.replace(new c.widgets.Notification("$msg.get('core.editors.object.removeDeprecatedProperties.done')","done"))
},onFailure:function(h){var i=h.statusText;
if(h.statusText==""||h.status==12031){i="Server not responding"
}f.notification.replace(new c.widgets.Notification("$msg.get('core.editors.object.removeDeprecatedProperties.failed')"+i,"error"))
},onComplete:function(){f.disabled=false
},on1223:function(h){h.request.options.onSuccess(h)
},on0:function(h){h.request.options.onFailure(h)
}})
}})
})
},ajaxPropertyAdd:function(){$$("input[name=action_propadd]").each(function(e){e._x_propnameElt=$("propname");
e._x_proptypeElt=$("proptype");
e._x_form_tokenElt=$("form_token");
var d=e._x_form_tokenElt?e._x_form_tokenElt.value:"";
e.observe("click",function(g){e.blur();
g.stop();
if(!e.disabled&&e._x_propnameElt.value!=""&&e._x_proptypeElt.selectedIndex>=0){var f=this.urlAddPropertyTemplate+"?propname="+e._x_propnameElt.value+"&proptype="+e._x_proptypeElt.options[e._x_proptypeElt.selectedIndex].value+"&xredirect="+encodeURIComponent(this.urlEditTemplate+"?xpage=editclass&xaction=displayProperty&propName="+e._x_propnameElt.value)+"&form_token="+e._x_form_tokenElt.value;
new Ajax.Request(f,{onCreate:function(){e.disabled=true;
e.notification=new c.widgets.Notification("$msg.get('core.editors.class.addProperty.inProgress')","inprogress")
},onSuccess:function(h){$("xclassContent").insert({bottom:h.responseText});
var i=$("xclassContent").lastChild;
this.expandCollapseMetaProperty(i);
this.makeSortable(i);
this.ajaxPropertyDeletion(i);
this.makeDisableVisible(i);
e.notification.replace(new c.widgets.Notification("$msg.get('core.editors.class.addProperty.done')","done"))
}.bind(this),onFailure:function(h){var i=h.statusText;
if(h.statusText==""||h.status==12031){i="Server not responding"
}e.notification.replace(new c.widgets.Notification("$msg.get('core.editors.class.addProperty.failed')"+i,"error"))
},onComplete:function(){e.disabled=false
},on1223:function(h){h.request.options.onSuccess(h)
},on0:function(h){h.request.options.onFailure(h)
}})
}}.bindAsEventListener(this))
}.bind(this))
},ajaxPropertyDeletion:function(e){var d=e.down("a.delete");
d.observe("click",function(f){d.blur();
f.stop();
if(!d.disabled){new c.widgets.ConfirmedAjaxRequest(d.href,{onCreate:function(){d.disabled=true
},onSuccess:function(){e.remove()
},onComplete:function(){d.disabled=false
}},{confirmationText:"$msg.get('core.editors.class.deleteProperty.confirm')",progressMessageText:"$msg.get('core.editors.class.deleteProperty.inProgress')",successMessageText:"$msg.get('core.editors.class.deleteProperty.done')",failureMessageText:"$msg.get('core.editors.class.deleteProperty.failed')"})
}})
},makeDisableVisible:function(d){d.down(".disabletool input").observe("click",function(e){d.toggleClassName("disabled")
})
},editButtonBehavior:function(d){var e=d.down("a.edit");
if(!e){return
}e.observe("click",function(f){e.blur();
f.stop();
window.location=e.href
}.bindAsEventListener())
},updateXObjectCount:function(f){var e=f.select(".xobject").size();
if(e==0){f.remove()
}else{var d=f.down(".xclass_xobject_nb");
if(typeof(d)!="undefined"){d.update("("+e+")")
}}},expandCollapseObject:function(e){totalItems=$$("#xwikiobjects .xobject").size();
e.addClassName("collapsable");
if(totalItems>1){e.toggleClassName("collapsed")
}var d=e.down(".xobject-title");
d.observe("click",function(f){d.up().toggleClassName("collapsed")
}.bindAsEventListener());
e.select(".xobject-content dt").each(function(g){if(!g.down("input[type=checkbox]")){g.addClassName("collapsable");
var f=new Element("span",{"class":"collapser"});
f.observe("click",function(h){this.up("dt").next("dd").toggle();
this.toggleClassName("collapsed")
}.bindAsEventListener(f));
g.insert({top:f})
}else{g.addClassName("uncollapsable")
}});
e.select(".xobject-content dt label").each(function(f){f.observe("click",function(g){if(f.up("dt").down("span").hasClassName("collapsed")){f.up("dt").next("dd").toggle();
f.up("dt").down("span").toggleClassName("collapsed")
}}.bindAsEventListener())
})
},expandCollapseClass:function(e){e.addClassName("collapsable");
var d=e.down(".xclass-title");
d.observe("click",function(f){d.up().toggleClassName("collapsed")
}.bindAsEventListener())
},expandCollapseMetaProperty:function(e){e.addClassName("collapsable");
e.addClassName("collapsed");
var d=e.down(".xproperty-title");
d.observe("click",function(f){d.up().toggleClassName("collapsed")
}.bindAsEventListener());
e.select(".xproperty-content dt").each(function(g){if(!g.down("input[type=checkbox]")){g.addClassName("collapsable");
var f=new Element("span",{"class":"collapser"});
f.observe("click",function(h){this.up("dt").next("dd").toggle();
this.toggleClassName("collapsed")
}.bindAsEventListener(f));
g.insert({top:f})
}else{g.addClassName("uncollapsable")
}});
e.select(".xproperty-content dt label").each(function(f){f.observe("click",function(g){if(f.up("dt").down("span").hasClassName("collapsed")){f.up("dt").next("dd").toggle();
f.up("dt").down("span").toggleClassName("collapsed")
}}.bindAsEventListener())
})
},classSwitcherBehavior:function(){var d=$$("#switch-xclass #classname");
if(d.size()>0){d=d[0];
d.observe("change",function(){var e=this.options[this.selectedIndex].value;
if(e!="-"){new c.widgets.ConfirmationBox({onYes:function(){document.fire("xwiki:actions:save",{"continue":true,form:$("propupdate")});
document.observe("xwiki:document:saved",function(){window.self.location=e
})
},onNo:function(){window.self.location=e
}},{confirmationText:"$msg.get('core.editors.class.switchClass.confirm')"})
}}.bindAsEventListener(d));
d.up("form").down("input[type='submit']").hide();
d.up("form").down(".warningmessage").hide()
}},makeSortable:function(d){if(!d){return
}d.select(".xproperty-content").each(function(e){e.select("input").each(function(f){if(f.id.endsWith("_number")){e.numberProperty=f;
f.up().hide();
if(f.up().previous("dt")){f.up().previous("dt").hide()
}}})
});
d.select(".xproperty-title .tools").each(function(f){var e=new Element("span",{"class":"tool move",title:"Drag and drop to change the order"}).update("move");
f.makePositioned();
f.appendChild(e);
e.observe("click",function(g){g.stop()
}.bindAsEventListener())
});
Sortable.create("xclassContent",{tag:"div",only:"xproperty",handle:"move",starteffect:this.startDrag.bind(this),endeffect:this.endDrag.bind(this),onUpdate:this.updateOrder.bind(this)})
},updateOrder:function(d){var f=d.childElements();
for(var e=0;
e<f.size();
++e){var g=f[e].down(".xproperty-content");
g.numberProperty.value=e+1
}},startDrag:function(d){d.addClassName("dragged");
$("xclassContent").childElements().each(function(e){e._expandedBeforeDrag=!e.hasClassName("collapsed");
e.addClassName("collapsed")
})
},endDrag:function(d){d.removeClassName("dragged");
$("xclassContent").childElements().each(function(e){if(e._expandedBeforeDrag){e.removeClassName("collapsed")
}})
}});
function b(){return new a.XDataEditors()
}(c.domIsLoaded&&b())||document.observe("xwiki:dom:loaded",b);
return c
}(XWiki||{}));