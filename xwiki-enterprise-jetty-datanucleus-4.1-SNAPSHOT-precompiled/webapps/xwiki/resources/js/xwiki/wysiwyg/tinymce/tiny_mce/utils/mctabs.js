function MCTabs(){this.settings=new Array()
}MCTabs.prototype.init=function(a){this.settings=a
};
MCTabs.prototype.getParam=function(b,a){var c=null;
c=(typeof(this.settings[b])=="undefined")?a:this.settings[b];
if(c=="true"||c=="false"){return(c=="true")
}return c
};
MCTabs.prototype.displayTab=function(e,a){var j=document.getElementById(a);
var d=j?j.parentNode:null;
var c=document.getElementById(e);
var h=c?c.parentNode:null;
var g=this.getParam("selection_class","current");
if(c&&h){var b=h.childNodes;
for(var f=0;
f<b.length;
f++){if(b[f].nodeName=="LI"){b[f].className=""
}}c.className="current"
}if(j&&d){var b=d.childNodes;
for(var f=0;
f<b.length;
f++){if(b[f].nodeName=="DIV"){b[f].className="panel"
}}j.className="current"
}};
MCTabs.prototype.getAnchor=function(){var b,a=document.location.href;
if((b=a.lastIndexOf("#"))!=-1){return a.substring(b+1)
}return""
};
var mcTabs=new MCTabs();