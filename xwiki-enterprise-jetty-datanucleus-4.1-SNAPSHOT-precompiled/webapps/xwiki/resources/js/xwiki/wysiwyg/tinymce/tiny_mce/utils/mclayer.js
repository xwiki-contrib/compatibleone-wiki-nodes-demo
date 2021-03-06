function MCLayer(a){this.id=a;
this.settings=new Array();
this.blockerElement=null;
this.isMSIE=navigator.appName=="Microsoft Internet Explorer";
this.events=false;
this.autoHideCallback=null
}MCLayer.prototype={moveRelativeTo:function(f,i,d){var g=this.getAbsPosition(f);
var c=parseInt(f.offsetWidth);
var e=parseInt(f.offsetHeight);
var b,j;
switch(i){case"tl":break;
case"tr":b=g.absLeft+c;
j=g.absTop;
break;
case"bl":break;
case"br":break
}this.moveTo(b,j)
},moveBy:function(c,b){var d=this.getElement();
var a=parseInt(d.style.left);
var f=parseInt(d.style.top);
d.style.left=(a+c)+"px";
d.style.top=(f+b)+"px";
this.updateBlocker()
},moveTo:function(a,c){var b=this.getElement();
b.style.left=a+"px";
b.style.top=c+"px";
this.updateBlocker()
},show:function(){MCLayer.visibleLayer=this;
this.getElement().style.display="block";
this.updateBlocker()
},hide:function(){this.getElement().style.display="none";
this.updateBlocker()
},setAutoHide:function(b,a){this.autoHideCallback=a;
this.registerEventHandlers()
},getElement:function(){return document.getElementById(this.id)
},updateBlocker:function(){if(!this.isMSIE){return
}var g=this.getElement();
var c=this.getBlocker();
var a=this.parseInt(g.style.left);
var i=this.parseInt(g.style.top);
var d=this.parseInt(g.offsetWidth);
var f=this.parseInt(g.offsetHeight);
c.style.left=a+"px";
c.style.top=i+"px";
c.style.width=d+"px";
c.style.height=f+"px";
c.style.display=g.style.display
},getBlocker:function(){if(!this.blockerElement){var c=document,a=c.createElement("iframe");
a.style.cssText="display: none; left: 0px; position: absolute; top: 0";
a.src="javascript:false;";
a.frameBorder="0";
a.scrolling="no";
c.body.appendChild(a);
this.blockerElement=a
}return this.blockerElement
},getAbsPosition:function(b){var a={absLeft:0,absTop:0};
while(b){a.absLeft+=b.offsetLeft;
a.absTop+=b.offsetTop;
b=b.offsetParent
}return a
},registerEventHandlers:function(){if(!this.events){var a=document;
this.addEvent(a,"mousedown",MCLayer.prototype.onMouseDown);
this.events=true
}},addEvent:function(b,c,a){if(b.attachEvent){b.attachEvent("on"+c,a)
}else{b.addEventListener(c,a,false)
}},onMouseDown:function(f){f=typeof(f)=="undefined"?window.event:f;
var i=document.body;
var c=MCLayer.visibleLayer;
if(c){var n=c.isMSIE?f.clientX+i.scrollLeft:f.pageX;
var m=c.isMSIE?f.clientY+i.scrollTop:f.pageY;
var a=c.getElement();
var j=parseInt(a.style.left);
var g=parseInt(a.style.top);
var k=parseInt(a.offsetWidth);
var d=parseInt(a.offsetHeight);
if(!(n>j&&n<j+k&&m>g&&m<g+d)){MCLayer.visibleLayer=null;
if(c.autoHideCallback&&c.autoHideCallback(c,f,n,m)){return true
}c.hide()
}}},addCSSClass:function(d,f){this.removeCSSClass(d,f);
var b=this.explode(" ",d.className);
b[b.length]=f;
d.className=b.join(" ")
},removeCSSClass:function(f,g){var b=this.explode(" ",f.className),d;
for(d=0;
d<b.length;
d++){if(b[d]==g){b[d]=""
}}f.className=b.join(" ")
},explode:function(f,c){var a=c.split(f);
var e=new Array();
for(var b=0;
b<a.length;
b++){if(a[b]!=""){e[e.length]=a[b]
}}return e
},parseInt:function(a){if(a==null||a==""){return 0
}return parseInt(a)
}};