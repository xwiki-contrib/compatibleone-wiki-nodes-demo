var XWiki=(function(b){b.EditLock={lock:function(){if(!this._locked){this._locked=true;
new Ajax.Request(this._getURL("lock"),{method:"get"})
}},unlock:function(){if(this._locked){this._locked=false;
new Ajax.Request(this._getURL("cancel"),{method:"get",asynchronous:false})
}},setLocked:function(c){this._locked=!!c
},isLocked:function(){return this._locked
},_getURL:function(c){return b.currentDocument.getURL(c,"ajax=1&action="+b.contextaction+"&"+(b.docvariant||""))
}};
function a(){b.EditLock.lock();
var d=b.EditLock.unlock.bind(b.EditLock);
Event.observe(window,"unload",d);
Event.observe(window,"pagehide",d);
$("tmLogout").down("a").observe("click",d);
var c=b.EditLock.setLocked.bind(b.EditLock,false);
$$(".withLock").each(function(e){e.observe("submit",c)
});
return true
}(b.domIsLoaded&&a())||document.observe("xwiki:dom:loaded",a);
return b
}(XWiki||{}));