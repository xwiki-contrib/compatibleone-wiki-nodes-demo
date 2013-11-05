Lightbox=Class.create({initialize:function(d,a,b){this.formUrl=d;
this.saveUrl=a;
this.redirectUrl=b;
this.formData="";
this.loadedForms=new Object();
this.lbinit();
this.lbShow();
this.lbLoadForm(d)
},lbShow:function(){this.lbLoading();
toggleClass($("lb-bg"),"hidden");
toggleClass($("lb-align"),"hidden");
this.resizeBackground();
if(browser.isIE6x){$$("select").each(function(a){if(a.up("#lb")){return
}a._x_originalVisibility=a.style.visibility;
a.setStyle({visibility:"hidden"})
})
}},lbHide:function(){toggleClass($("lb-bg"),"hidden");
toggleClass($("lb-align"),"hidden");
if(browser.isIE6x){$$("select").each(function(a){a.setStyle({visibility:a._x_originalVisibility})
})
}},lbLoading:function(){if(this.currentUrl){this.loadedForms[this.currentUrl]=$("lb-content").firstChild.cloneNode(true)
}$("lb-content").innerHTML=this.getWaiting()
},lbLoadForm:function(a){this.currentUrl=a;
if(this.loadedForms[a]){$("lb-content").innerHTML="";
this.lbPlaceContentInDocument(this.loadedForms[a],$("lb-content"));
this.form=c.getElementsByTagName("form")[0]
}else{new Ajax.Request(a,{onSuccess:this.lbFormDataLoaded.bind(this)})
}},lbFormDataLoaded:function(b){var a=document.createElement("div");
a.innerHTML=b.responseText;
$("lb-content").innerHTML="";
this.lbPlaceContentInDocument(a,$("lb-content"),function(){this.resizeBackground()
}.bind(this));
this.form=$("lb-content").getElementsByTagName("form")[0]
},lbPlaceContentInDocument:function(k,l,b){document.stopObserving("dom:loaded");
var d=Array.from(k.getElementsByTagName("script"));
var o=Array.from(k.getElementsByTagName("link"));
var q=Array.from(k.getElementsByTagName("style"));
var p=o.concat(d,q).flatten();
var n=[];
for(var g=0;
g<p.length;
g++){n[g]=document.createElement(p[g].tagName);
var f=p[g].attributes;
for(var e=0;
e<f.length;
e++){if(f[e].value!=""){n[g].setAttribute(f[e].name,f[e].value)
}}try{var m=p[g].innerHTML;
if(m.startsWith("//<![CDATA[")&&m.endsWith("//]]>")){m=m.substring(11,m.length-5)
}n[g].innerHTML=m;
p[g].parentNode.removeChild(p[g])
}catch(a){if(n[g].tagName.toLowerCase()=="script"){n[g].text=p[g].text;
p[g].parentNode.removeChild(p[g])
}}}l.appendChild(k);
var h=function(t,s,u,j){var r=0;
if(j){r=j
}while(r<t.length){s.appendChild(t[r]);
if(t[r].tagName.toLowerCase()=="script"&&t[r].src!=""){if(browser.isIE==true&&typeof XDomainRequest=="undefined"){Event.observe(t[r],"readystatechange",function(i){if(i.element().readyState=="complete"){h(t,s,u,r+1)
}})
}else{Event.observe(t[r],"load",function(){h(t,s,u,r+1)
})
}return
}r++
}u()
};
h(n,l,function(){if(Object.isFunction(b)){b()
}var i=document.createElement("script");
try{i.innerHTML='document.fire("dom:loaded");'
}catch(j){i.text='document.fire("dom:loaded");'
}l.appendChild(i)
}.bind(this))
},lbSaveForm:function(){this.lbSaveData();
Form.disable(this.form);
this.lbSaveSync(this.saveUrl);
this.lbHide();
window.location=this.redirectUrl
},lbNext:function(a){this.lbSaveData();
this.lbLoading();
this.lbLoadForm(a)
},lbSaveData:function(){this.formData+="&"+Form.serialize(this.form);
this.formData=this.formData.replace("_segmentChief=&","=&");
this.formData=this.formData.replace("_periodicity=&","=&")
},lbSave:function(a){this.lbSaveData();
new Ajax.Request(a+"?ajax=1",{parameters:this.formData,onSuccess:this.lbSaveDone.bind(this)})
},lbSaveSync:function(a){new Ajax.Request(a+"?ajax=1",{parameters:this.formData,asynchronous:false})
},lbSaveDone:function(a){this.lbHide()
},lbClearData:function(){this.formData=""
},lbClose:function(){this.lbHide();
if(this.redirectUrl!==undefined){window.location=this.redirectUrl
}},lbSetNext:function(a){this.nextURL=a
},getWaiting:function(){var a="$xwiki.getSkinFile('icons/xwiki/ajax-loader-large.gif')";
return'<div style="padding: 30px;"><img src="'+a+'"/></div>'
},lbcustominit:function(b,a,f,d){if(!$("lb")){var e=this.insertlbcontent(b,a,f,d);
new Insertion.Top("body",e)
}},lbinit:function(){return this.lbcustominit("#FFF","#FFF","#000","rounded")
},insertlbcontent:function(b,a,f,d){var e='<div id="lb-bg" class="hidden"></div><div id="lb-align" class="hidden"><div id="lb"><div id="lb-top"><div id="close-wrap"><div id="lb-close" onclick="window.lb.lbClose();" title="Cancel and close">&nbsp;</div></div>';
if(d=="lightrounded"){e+=this.roundedlighttop(b,a)
}else{if(d=="rounded"){e+=this.roundedtop(b,a)
}else{e+='<div class="lb-squarred" style="background:'+b+"; border-color:"+a+'"></div></div>'
}}e+='</div><div class="lb-content" style="background:'+b+"; border-color:"+a+"; color:"+f+'" id="lb-content">Lightbox Content</div>';
if(d=="lightrounded"){e+=this.roundedlightbottom(b,a)
}else{if(d=="rounded"){e+=this.roundedbottom(b,a)
}else{e+='<div class="lb-squarred" style="background:'+b+"; border-color:"+a+'"></div></div></div></div>'
}}return e
},resizeBackground:function(){var a=document.body.parentNode.scrollHeight;
if(document.body.scrollHeight>a){a=document.body.scrollHeight
}if(document.body.parentNode.clientHeight>a){a=document.body.parentNode.clientHeight
}$("lb-bg").style.height=a+"px"
},roundedlightbottom:function(a,b){var d='<div class="roundedlight"><b class="top"><b class="b4b" style="background:'+b+';"></b><b class="b3b" style="background:'+a+"; border-color:"+b+';"></b><b class="b3b" style="background:'+a+"; border-color:"+b+';"></b><b class="b1b" style="background:'+a+"; border-color:"+b+';"></b></b> </div>';
return d
},roundedbottom:function(a,b){var d='<div class="rounded"><b class="bottom" style="padding:0px; margin:0px;"><b class="b12b" style="background:'+b+';"></b><b class="b11b" style="background:'+a+"; border-color:"+b+';"></b><b class="b10b" style="background:'+a+"; border-color:"+b+';"></b><b class="b9b" style="background:'+a+"; border-color:"+b+';"></b><b class="b8b" style="background:'+a+"; border-color:"+b+';"></b><b class="b7b" style="background:'+a+"; border-color:"+b+';"></b><b class="b6b" style="background:'+a+"; border-color:"+b+';"></b><b class="b5b" style="background:'+a+"; border-color:"+b+';"></b><b class="b4b" style="background:'+a+"; border-color:"+b+';"></b><b class="b3b" style="background:'+a+"; border-color:"+b+';"></b><b class="b2b" style="background:'+a+"; border-color:"+b+';"></b><b class="b1b" style="background:'+a+"; border-color:"+b+';"></b></b></div>';
return d
},roundedlighttop:function(a,b){var d='<div class="roundedlight"><b class="top"><b class="b1" style="background:'+b+';"></b><b class="b2" style="background:'+a+"; border-color:"+b+';"></b><b class="b3" style="background:'+a+"; border-color:"+b+';"></b><b class="b4" style="background:'+a+"; border-color:"+b+';"></b></b> </div>';
return d
},roundedtop:function(a,b){var d='<div class="rounded"><b class="top"><b class="b1" style="background:'+b+';"></b><b class="b2" style="background:'+a+"; border-color:"+b+';"></b><b class="b3" style="background:'+a+"; border-color:"+b+';"></b><b class="b4" style="background:'+a+"; border-color:"+b+';"></b><b class="b5" style="background:'+a+"; border-color:"+b+';"></b><b class="b6" style="background:'+a+"; border-color:"+b+';"></b><b class="b7" style="background:'+a+"; border-color:"+b+';"></b><b class="b8" style="background:'+a+"; border-color:"+b+';"></b><b class="b9" style="background:'+a+"; border-color:"+b+';"></b><b class="b10" style="background:'+a+"; border-color:"+b+';"></b><b class="b11" style="background:'+a+"; border-color:"+b+';"></b><b class="b12" style="background:'+a+"; border-color:"+b+';"></b></b></div>';
return d
},lightboxlink:function(b,a){var d='<a href="#" onclick="javascript:$(\'lb-content\').innerHTML ='+a+"; toggleClass($('lb-bg'), 'hidden'); toggleClass($('lb-align'), 'hidden');\">"+b+"</a>";
return d
}});