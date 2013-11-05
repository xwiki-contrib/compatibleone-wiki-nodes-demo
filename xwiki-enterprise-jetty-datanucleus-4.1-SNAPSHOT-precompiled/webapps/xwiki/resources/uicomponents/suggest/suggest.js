var XWiki=(function(b){var a=b.widgets=b.widgets||{};
if(typeof a.XList=="undefined"){if(typeof console!="undefined"&&typeof console.warn=="function"){console.warn("[Suggest widget] Required class missing: XWiki.widgets.XList")
}}else{a.Suggest=Class.create({options:{minchars:1,method:"get",varname:"input",className:"ajaxsuggest",timeout:2500,delay:500,offsety:0,shownoresults:true,noresults:"No results!",maxheight:250,cache:false,seps:"",icon:null,resultsParameter:"results",resultId:"id",resultValue:"value",resultInfo:"info",resultIcon:"icon",resultHint:"hint",parentContainer:"body",highlight:true,fadeOnClear:true,insertBeforeSuggestions:null,displayValue:false,displayValueText:"Value :",align:"left",unifiedLoader:false,loaderNode:null},sInput:"",nInputChars:0,aSuggestions:[],iHighlighted:null,isActive:false,initialize:function(c,d){if(!c){return false
}this.setInputField(c);
this.options=Object.extend(Object.clone(this.options),d||{});
if(typeof this.options.sources=="object"&&this.options.sources.length>1){this.sources=this.options.sources
}else{this.sources=this.options
}this.sources=[this.sources].flatten().compact();
if(!$(this.options.parentContainer)){this.options.parentContainer=$(document.body)
}if(this.options.seps){this.seps=this.options.seps
}else{this.seps=""
}this.latestRequest=0
},setInputField:function(c){this.detach();
this.fld=$(c);
if(this.fld.__x_suggest){this.fld.__x_suggest.detach()
}this.fld.__x_suggest=this;
this.onKeyUp=this.onKeyUp.bindAsEventListener(this);
this.fld.observe("keyup",this.onKeyUp);
this.onKeyPress=this.onKeyPress.bindAsEventListener(this);
if(Prototype.Browser.IE||Prototype.Browser.WebKit){this.fld.observe("keydown",this.onKeyPress)
}else{this.fld.observe("keypress",this.onKeyPress)
}this.fld.setAttribute("autocomplete","off");
this.fld.observe("blur",function(d){this.latestRequest++
}.bind(this))
},onKeyUp:function(f){var d=f.keyCode;
switch(d){case Event.KEY_RETURN:case Event.KEY_ESC:case Event.KEY_UP:case Event.KEY_DOWN:break;
default:if(this.seps){var e=-1;
for(var c=0;
c<this.seps.length;
c++){if(this.fld.value.lastIndexOf(this.seps.charAt(c))>e){e=this.fld.value.lastIndexOf(this.seps.charAt(c))
}}if(e==-1){this.getSuggestions(this.fld.value)
}else{this.getSuggestions(this.fld.value.substring(e+1))
}}else{this.getSuggestions(this.fld.value)
}}},onKeyPress:function(d){if(!$(this.isActive)){return
}var c=d.keyCode;
switch(c){case Event.KEY_RETURN:if(this.aSuggestions.length==1){this.highlightFirst()
}this.setHighlightedValue();
Event.stop(d);
break;
case Event.KEY_ESC:this.clearSuggestions();
Event.stop(d);
break;
case Event.KEY_UP:this.changeHighlight(c);
Event.stop(d);
break;
case Event.KEY_DOWN:this.changeHighlight(c);
Event.stop(d);
break;
default:break
}},getSuggestions:function(g){g=g.strip();
if(g==this.sInput){return false
}if(g.length<this.options.minchars){this.sInput="";
return false
}if(g.length>this.nInputChars&&this.aSuggestions.length&&this.options.cache){var c=[];
for(var d=0;
d<this.aSuggestions.length;
d++){if(this.aSuggestions[d].value.substr(0,g.length).toLowerCase()==g.toLowerCase()){c.push(this.aSuggestions[d])
}}this.sInput=g;
this.nInputChars=g.length;
this.aSuggestions=c;
this.createList(this.aSuggestions);
return false
}else{this.sInput=g;
this.nInputChars=g.length;
this.prepareContainer();
this.latestRequest++;
var f=this;
var e=this.latestRequest;
clearTimeout(this.ajID);
this.ajID=setTimeout(function(){f.doAjaxRequests(e)
},this.options.delay)
}return false
},doAjaxRequests:function(g){if(this.fld.value.length<this.options.minchars){return
}for(var e=0;
e<this.sources.length;
e++){var f=this.sources[e];
var d=f.script+f.varname+"="+encodeURIComponent(this.fld.value.strip());
var j=f.method||"get";
var h={};
if(f.json){h.Accept="application/json"
}else{h.Accept="application/xml"
}var c=new Ajax.Request(d,{method:j,requestHeaders:h,onSuccess:this.setSuggestions.bindAsEventListener(this,f,g),onFailure:function(i){new b.widgets.Notification("Failed to retrieve suggestions : ')"+i.statusText,"error",{timeout:5})
}})
}},setSuggestions:function(f,g,j){if(j<this.latestRequest){return
}this.aSuggestions=[];
if(g.json){var h=f.responseJSON;
if(!h){return false
}var e=h[g.resultsParameter||this.options.resultsParameter];
for(var d=0;
d<e.length;
d++){this.aSuggestions.push({id:e[d][g.resultId||this.options.resultId],value:e[d][g.resultValue||this.options.resultValue],info:e[d][g.resultInfo||this.options.resultInfo],icon:e[d][g.resultIcon||this.options.resultIcon],hint:e[d][g.resultHint||this.options.resultHint]})
}}else{var c=f.responseXML;
var e=c.getElementsByTagName(g.resultsParameter||this.options.resultsParameter)[0].childNodes;
for(var d=0;
d<e.length;
d++){if(e[d].hasChildNodes()){this.aSuggestions.push({id:e[d].getAttribute("id"),value:e[d].childNodes[0].nodeValue,info:e[d].getAttribute("info"),icon:e[d].getAttribute("icon"),hint:e[d].getAttribute("hint")})
}}}this.createList(this.aSuggestions,g)
},prepareContainer:function(){if(!$(this.options.parentContainer).down(".suggestItems")){var e=new Element("div",{"class":"suggestItems "+this.options.className});
var k=this.fld.cumulativeOffset();
var l=this.options.width?this.options.width:(this.fld.offsetWidth-2);
if(this.options.align=="left"){e.style.left=k.left+"px"
}else{if(this.options.align=="center"){e.style.left=k.left+(this.fld.getWidth()-l-2)/2+"px"
}else{e.style.left=(k.left-l+this.fld.offsetWidth-2)+"px"
}}e.style.top=(k.top+this.fld.offsetHeight+this.options.offsety)+"px";
e.style.width=l+"px";
var c=this;
e.onmouseover=function(){c.killTimeout()
};
e.onmouseout=function(){c.resetTimeout()
};
this.resultContainer=new Element("div",{"class":"resultContainer"});
e.appendChild(this.resultContainer);
$(this.options.parentContainer).insert(e);
this.container=e;
if(this.options.insertBeforeSuggestions){this.resultContainer.insert(this.options.insertBeforeSuggestions)
}document.fire("xwiki:suggest:containerCreated",{container:this.container,suggest:this})
}if(this.sources.length>1){for(var g=0;
g<this.sources.length;
g++){var d=this.sources[g];
d.id=g;
if(this.resultContainer.down(".results"+d.id)){if(this.resultContainer.down(".results"+d.id).down("ul")){this.resultContainer.down(".results"+d.id).down("ul").remove()
}if(!this.options.unifiedLoader){this.resultContainer.down(".results"+d.id).down(".sourceContent").addClassName("loading")
}else{(this.options.loaderNode||this.fld).addClassName("loading");
this.resultContainer.down(".results"+d.id).addClassName("hidden loading")
}}else{var n=new Element("div",{"class":"results results"+d.id}),m=new Element("div",{"class":"sourceName"});
if(this.options.unifiedLoader){n.addClassName("hidden loading")
}if(typeof d.icon!="undefined"){var j=new Image();
j.onload=function(){this.sourceHeader.setStyle({backgroundImage:"url("+this.iconImage.src+")"});
this.sourceHeader.setStyle({textIndent:(this.iconImage.width+6)+"px"})
}.bind({sourceHeader:m,iconImage:j});
j.src=d.icon
}m.insert(d.name);
n.insert(m);
var f="sourceContent "+(this.options.unifiedLoader?"":"loading");
n.insert(new Element("div",{"class":f}));
if(typeof d.before!=="undefined"){this.resultContainer.insert(d.before)
}this.resultContainer.insert(n);
if(typeof d.after!=="undefined"){this.resultContainer.insert(d.after)
}}}}else{if(this.resultContainer.down("ul")){this.resultContainer.down("ul").remove()
}}var h=this.container.fire("xwiki:suggest:containerPrepared",{container:this.container,suggest:this});
return this.container
},createList:function(h,d){this.isActive=true;
var c=this;
this.killTimeout();
if(this.sources.length>1){var e=this.resultContainer.down(".results"+d.id);
if(h.length>0||this.options.shownoresults){e.down(".sourceContent").removeClassName("loading");
this.resultContainer.down(".results"+d.id).removeClassName("hidden loading")
}if(this.options.unifiedLoader&&!this.resultContainer.down("loading")){(this.options.loaderNode||this.fld).removeClassName("loading")
}}else{var e=this.resultContainer
}if(h.length==0&&!this.options.shownoresults){return false
}if(e.down("ul")){e.down("ul").remove()
}var k=new b.widgets.XList([],{icon:this.options.icon,classes:"suggestList",eventListeners:{click:function(){c.setHighlightedValue();
return false
},mouseover:function(){c.setHighlight(this.getElement())
}}});
for(var g=0,j=h.length;
g<j;
g++){var f=d.highlight?this.emphasizeMatches(this.sInput,h[g].value):h[g].value;
if(h[g].hint){f+="<span class='hint'>"+h[g].hint+"</span>"
}if(!this.options.displayValue){var o=new Element("span",{"class":"info"}).update(f)
}else{var o=new Element("div").insert(new Element("div",{"class":"value"}).update(f)).insert(new Element("div",{"class":"info"}).update("<span class='legend'>"+this.options.displayValueText+"</span>"+h[g].info))
}if(h[g].icon){var l=new Element("img",{src:h[g].icon,"class":"icon"});
o.insert({top:l})
}var m=new Element("div").insert(new Element("span",{"class":"suggestId"}).update(h[g].id)).insert(new Element("span",{"class":"suggestValue"}).update(h[g].value)).insert(new Element("span",{"class":"suggestInfo"}).update(h[g].info));
var n=new b.widgets.XListItem(o,{containerClasses:"suggestItem",value:m,noHighlight:true});
k.addItem(n)
}if(h.length==0){k.addItem(new b.widgets.XListItem(this.options.noresults,{classes:"noSuggestion",noHighlight:true}))
}e.appendChild(k.getElement());
this.suggest=e;
var c=this;
if(this.options.timeout>0){this.toID=setTimeout(function(){c.clearSuggestions()
},this.options.timeout)
}},emphasizeMatches:function(k,m){if(!k){return m
}var c=m,i=k.split(" ").uniq().compact(),d=0,g={};
for(var e=0,n=i.length;
e<n;
e++){var h=c.toLowerCase().indexOf(i[e].toLowerCase());
while(h>=0){var f=c.substring(h,h+i[e].length),l="";
i[e].length.times(function(){l+=" "
});
g[h]=f;
c=c.substring(0,h)+l+c.substring(h+i[e].length);
h=c.toLowerCase().indexOf(i[e].toLowerCase())
}}Object.keys(g).sortBy(function(j){return parseInt(j)
}).each(function(j){var o=c.substring(0,parseInt(j)+d);
var p=c.substring(parseInt(j)+g[j].length+d);
c=o+"<em>"+g[j]+"</em>"+p;
d+=9
});
return c
},changeHighlight:function(c){var f=this.resultContainer;
if(!f){return false
}var g,d;
if(this.iHighlighted){if(c==Event.KEY_DOWN){d=this.iHighlighted.next();
if(!d&&this.iHighlighted.up("div.results")){var e=this.iHighlighted.up("div.results").next();
while(e&&!d){d=e.down("li");
e=e.next()
}}if(!d){d=f.down("li")
}}else{if(c==Event.KEY_UP){d=this.iHighlighted.previous();
if(!d&&this.iHighlighted.up("div.results")){var e=this.iHighlighted.up("div.results").previous();
while(e&&!d){d=e.down("li:last-child");
e=e.previous()
}}if(!d){d=f.select("ul")[f.select("ul").length-1].down("li:last-child")
}}}}else{if(c==Event.KEY_DOWN){if(f.down("div.results")){d=f.down("div.results").down("li")
}else{d=f.down("li")
}}else{if(c==Event.KEY_UP){if(f.select("li")>0){d=f.select("li")[f.select("li").length-1]
}}}}if(d){this.setHighlight(d)
}},setHighlight:function(c){if(this.iHighlighted){this.clearHighlight()
}c.addClassName("xhighlight");
this.iHighlighted=c;
this.killTimeout()
},clearHighlight:function(){if(this.iHighlighted){this.iHighlighted.removeClassName("xhighlight");
delete this.iHighlighted
}},highlightFirst:function(){if(this.suggest&&this.suggest.down("ul")){var c=this.suggest.down("ul").down("li");
if(c){this.setHighlight(c)
}}},hasActiveSelection:function(){return this.iHighlighted
},setHighlightedValue:function(){if(this.iHighlighted&&!this.iHighlighted.hasClassName("noSuggestion")){var g,e;
if(this.sInput==""&&this.fld.value==""){g=e=this.iHighlighted.down(".suggestValue").innerHTML
}else{if(this.seps){var j=-1;
for(var f=0;
f<this.seps.length;
f++){if(this.fld.value.lastIndexOf(this.seps.charAt(f))>j){j=this.fld.value.lastIndexOf(this.seps.charAt(f))
}}if(j==-1){g=e=this.iHighlighted.down(".suggestValue").innerHTML
}else{e=this.fld.value.substring(0,j+1)+this.iHighlighted.down(".suggestValue").innerHTML;
g=e.substring(j+1)
}}else{g=e=this.iHighlighted.down(".suggestValue").innerHTML
}}var h=Event.fire(this.fld,"xwiki:suggest:selected",{suggest:this,id:this.iHighlighted.down(".suggestId").innerHTML,value:this.iHighlighted.down(".suggestValue").innerHTML,info:this.iHighlighted.down(".suggestInfo").innerHTML,icon:this.iHighlighted.down("img.icon")?this.iHighlighted.down("img.icon").src:""});
if(!h.stopped){this.sInput=g;
this.fld.value=e;
this.fld.focus();
this.clearSuggestions();
if(typeof(this.options.callback)=="function"){this.options.callback({id:this.iHighlighted.down(".suggestId").innerHTML,value:this.iHighlighted.down(".suggestValue").innerHTML,info:this.iHighlighted.down(".suggestInfo").innerHTML})
}if(this.fld.id.indexOf("_suggest")>0){var d=this.fld.id.substring(0,this.fld.id.indexOf("_suggest"));
var c=$(d);
if(c){c.value=this.iHighlighted.down(".suggestInfo").innerHTML
}}}}},killTimeout:function(){clearTimeout(this.toID)
},resetTimeout:function(){clearTimeout(this.toID);
var c=this;
this.toID=setTimeout(function(){c.clearSuggestions()
},1000)
},clearSuggestions:function(){this.killTimeout();
this.isActive=false;
var c=$(this.container);
var e=this;
if(c&&c.parentNode){if(this.options.fadeOnClear){var d=new Effect.Fade(c,{duration:"0.25",afterFinish:function(){if($(e.container)){$(e.container).remove()
}}})
}else{$(this.container).remove()
}document.fire("xwiki:suggest:clearSuggestions",{suggest:this})
}},detach:function(){if(this.fld){Event.stopObserving(this.fld,"keyup",this.onKeyUp);
if(Prototype.Browser.IE||Prototype.Browser.WebKit){Event.stopObserving(this.fld,"keydown",this.onKeyPress)
}else{Event.stopObserving(this.fld,"keypress",this.onKeyPress)
}this.clearSuggestions();
this.fld.__x_suggest=null;
this.fld.setAttribute("autocomplete","on")
}}})
}return b
})(XWiki||{});