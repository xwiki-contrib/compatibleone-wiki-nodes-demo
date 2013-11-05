var XWiki=(function(e){var d=e.importer=e.importer||{};
var b={availableDocuments:"$msg.get('core.importer.availableDocuments')",importHistoryLabel:"$msg.get('core.importer.importHistory')",selectionEmpty:"$msg.get('core.importer.selectionEmptyWarning')","import":"$msg.get('core.importer.import')","package":"$msg.get('core.importer.package')",description:"$msg.get('core.importer.package.description')",version:"$msg.get('core.importer.package.version')",licence:"$msg.get('core.importer.package.licence')",author:"$msg.get('core.importer.package.author')",documentSelected:"$msg.get('core.importer.documentSelected')",whenDocumentAlreadyExists:"$msg.get('core.importer.whenDocumentAlreadyExists')",addNewVersion:"$msg.get('core.importer.addNewVersion')",replaceDocumentHistory:"$msg.get('core.importer.replaceDocumentHistory')",resetHistory:"$msg.get('core.importer.resetHistory')",importAsBackup:"$msg.get('core.importer.importAsBackup')",select:"$msg.get('core.importer.select')",all:"$msg.get('core.importer.selectAll')",none:"$msg.get('core.importer.selectNone')"};
var a="$xwiki.getSkinFile('js/smartclient/skins/Enterprise/images/TreeGrid/opener_closed.png')";
var c="$xwiki.getSkinFile('js/smartclient/skins/Enterprise/images/TreeGrid/opener_opened.png')";
if(!browser.isIE6x){document.observe("dom:loaded",function(){$$("#packagelistcontainer ul.xlist li.xitem a.package").invoke("observe","click",function(h){var f=h.element(),g=f.href.substring(f.href.indexOf("&file=")+6);
h.stop();
$$("div#packagelistcontainer div.active").invoke("removeClassName","active");
h.element().up("div.package").addClassName("active");
new d.PackageExplorer("packagecontainer",decodeURIComponent(g))
})
})
}Element.addMethods("input",{uncheck:function(f){f=$(f);
f.checked=false;
return f
},check:function(f){f=$(f);
f.checked=true;
return f
}});
d.PackageInformationRequest=Class.create({initialize:function(i,h){this.name=i;
this.successCallback=h.onSuccess||function(){};
this.failureCallback=h.onFailure||function(){};
var g=window.docgeturl+"?xpage=packageinfo&package="+encodeURIComponent(i);
var f=new Ajax.Request(g,{onSuccess:this.onSuccess.bindAsEventListener(this),on1223:this.on1223.bindAsEventListener(this),on0:this.on0.bindAsEventListener(this),onFailure:this.onFailure.bind(this)})
},on1223:function(f){f.request.options.onSuccess(f)
},on0:function(f){f.request.options.onFailure(f)
},onSuccess:function(f){this.successCallback(f)
},onFailure:function(f){this.failureCallback(f)
}});
d.PackageExplorer=Class.create({initialize:function(h,g){this.node=$(h);
this.name=g;
this.ignore={};
this.documentCount={};
this.node.addClassName("loading");
var f=new d.PackageInformationRequest(g,{onSuccess:this.onPackageInfosAvailable.bind(this),onFailure:this.onPackageInfosRequestFailed.bind(this)})
},onPackageInfosAvailable:function(i){this.node.removeClassName("loading");
this.node.update();
if(this.node.empty()){this.node.insert(new Element("h4",{"class":"legend"}).update(b.availableDocuments))
}var g=i.responseText.evalJSON();
this.infos=g.infos;
this.packageDocuments=g.files;
this.container=new Element("div",{id:"packageDescription"});
this.node.insert(this.container);
this.container.insert(this.createPackageHeader(g.infos));
var f=new Element("span").update(b.none);
f.observe("click",this.onIgnoreAllDocuments.bind(this));
var h=new Element("span").update(b.all);
h.observe("click",this.onRestoreAllDocuments.bind(this));
this.container.insert(new Element("div",{"class":"selectLinks"}).insert(b.select).insert(f).insert(", ").insert(h));
this.list=new Element("ul",{"class":"xlist package"});
this.container.insert(new Element("div",{id:"package"}).update(this.list));
Object.keys(this.packageDocuments).sort().each(this.addSpaceToPackage.bind(this));
this.container.insert(this.createPackageFormSubmit(g.infos));
this.container.down("div.packagesubmit input[type=radio]").checked=true
},onIgnoreAllDocuments:function(){this.container.select("input[type=checkbox][class=space]").invoke("uncheck");
this.container.select("input[type=checkbox][class=space]").invoke("fire","custom:click")
},onRestoreAllDocuments:function(){this.container.select("input[type=checkbox][class=space]").invoke("check");
this.container.select("input[type=checkbox][class=space]").invoke("fire","custom:click")
},onPackageInfosRequestFailed:function(g){this.node.update();
var f="Failed to retrieve package information. Reason: ";
if(g.statusText==""||response.status==12031){f+="Server not responding"
}else{f+=g.statusText
}this.node.removeClassName("loading");
this.node.update(new Element("div",{"class":"errormessage"}).update(f))
},createPackageFormSubmit:function(k){var j=new Element("div",{"class":"packagesubmit"});
j.insert(new Element("em").update(b.whenDocumentAlreadyExists));
var h=new Element("input",{type:"radio",name:"historyStrategy",checked:"checked",value:"add"});
j.insert(new Element("div",{"class":"historyStrategyOption"}).insert(h).insert(b.addNewVersion));
j.insert(new Element("div",{"class":"historyStrategyOption"}).insert(new Element("input",{type:"radio",name:"historyStrategy",value:"replace"})).insert(b.replaceDocumentHistory));
j.insert(new Element("div",{"class":"historyStrategyOption"}).insert(new Element("input",{type:"radio",name:"historyStrategy",value:"reset"})).insert(b.resetHistory));
if(e.hasBackupPackImportRights){var f=new Element("input",{type:"checkbox",name:"importAsBackup",value:"true"});
if(k.backup){f.checked=true
}j.insert(new Element("div",{"class":"importOption"}).insert(f).insert(b.importAsBackup))
}var i=new Element("span",{"class":"buttonwrapper"});
var g=new Element("input",{type:"submit",value:b["import"],"class":"button"});
g.observe("click",this.onPackageSubmit.bind(this));
i.insert(g);
j.insert(i);
return j
},onPackageSubmit:function(){if(this.countSelectedDocuments()==0){var n=new Element("span",{"class":"warningmessage"}).update(b.selectionEmpty);
if(!$("packagecontainer").down("div.packagesubmit span.warningmessage")){$("packagecontainer").select("div.packagesubmit input").last().insert({after:n});
Element.remove.delay(5,n)
}return
}var p={};
p.action="import";
p.name=this.name;
p.historyStrategy=$("packageDescription").down("input[type=radio][value='add']").checked?"add":($("packageDescription").down("input[type=radio][value='replace']").checked?"replace":"reset");
if(e.hasBackupPackImportRights){p.importAsBackup=$("packageDescription").down("input[type=checkbox][name='importAsBackup']").checked?"true":"false"
}p.ajax="1";
var g=[];
var l=Object.keys(this.packageDocuments);
for(var k=0;
k<l.length;
k++){var f=this.packageDocuments[l[k]];
var m=Object.keys(f);
for(var h=0;
h<m.length;
h++){var o=f[m[h]];
o.each(function(j){if(!this.isIgnored(l[k],m[h],j.language)){var i=j.fullName+":"+j.language;
g.push(i);
p["language_"+i]=j.language
}}.bind(this))
}}p.pages=g;
this.node.update();
this.node.addClassName("loading");
this.node.setStyle("min-height:200px");
new Ajax.Request(window.location,{method:"post",parameters:p,onSuccess:function(i){$("packagecontainer").removeClassName("loading");
$("packagecontainer").update(i.responseText)
},onFailure:function(j){var i="Failed to import documents. Reason: ";
if(j.statusText==""||response.status==12031){i+="Server not responding"
}else{i+=j.statusText
}$("packagecontainer").removeClassName("loading");
$("packagecontainer").update(new Element("div",{"class":"errormessage"}).update(i))
}})
},createPackageHeader:function(g){var f=new Element("div",{"class":"packageinfos"});
f.insert(new Element("div").insert(new Element("span",{"class":"label"}).update(b["package"])).insert(new Element("span",{"class":"filename"}).update(this.name)));
if(g.name!==""){f.insert(new Element("div").insert(new Element("span",{"class":"label"}).update(b.description)).insert(new Element("span",{"class":"name"}).update(g.name)))
}if(g.version!==""){f.insert(new Element("div").insert(new Element("span",{"class":"label"}).update(b.version)).insert(new Element("span",{"class":"version"}).update(g.version)))
}if(g.author!==""){f.insert(new Element("div").insert(new Element("span",{"class":"label"}).update(b.author)).insert(new Element("span",{"class":"author"}).update(g.author)))
}if(g.licence!==""){f.insert(new Element("div").insert(new Element("span",{"class":"label"}).update(b.licence)).insert(new Element("span",{"class":"licence"}).update(g.licence)))
}return f
},addSpaceToPackage:function(f){var n=this.countDocumentsInSpace(f);
var p=n+" / "+n+" "+b.documentSelected;
var h=new Element("li",{"class":"xitem xunderline"});
var i=new Element("div",{"class":"xitemcontainer"});
var l=new Element("input",{type:"checkbox",checked:"checked","class":"space"});
l.observe("click",function(r){l.fire("custom:click",r.memo)
}.bind(this));
l.observe("custom:click",this.spaceCheckboxClicked.bind(this));
i.insert(l);
var j=new Element("img",{src:a});
i.insert(j);
var k=new Element("div",{"class":"spacename"}).update(f);
i.insert(k);
var m=function(r){r.element().up("li").down("div.pages").toggleClassName("hidden");
r.element().up("li").down("img").src=r.element().up("li").down("div.pages").hasClassName("hidden")?a:c
};
j.observe("click",m);
k.observe("click",m);
i.insert(new Element("div",{"class":"selection"}).update(p));
i.insert(new Element("div",{"class":"clearfloats"}));
var g=new Element("div",{"class":"pages hidden"});
var o=new Element("ul",{"class":"xlist pages"});
var q=this;
Object.keys(this.packageDocuments[f]).sort().each(function(r){q.addDocumentToSpace(o,f,r)
});
g.update(o);
i.insert(g);
h.insert(i);
this.list.insert(h);
l.checked=true
},addDocumentToSpace:function(j,i,h){var g=this.packageDocuments[i][h],f=this;
g.sortBy(function(k){return k.language
}).each(function(n){var l=new Element("li",{"class":"xitem xhighlight"});
var k=new Element("div",{"class":"xitemcontainer xpagecontainer"});
var m=new Element("input",{type:"checkbox",checked:"checked"});
m.observe("click",f.documentCheckboxClicked.bind(f));
k.insert(new Element("span",{"class":"checkbox"}).update(m));
k.insert(new Element("span",{"class":"documentName"}).update(h));
if(n.language!=""){k.insert(new Element("span",{"class":"documentLanguage"}).update(" - "+n.language))
}k.insert(new Element("div",{"class":"clearfloats"}));
l.insert(new Element("div",{"class":"fullName hidden"}).update(n.fullName));
l.insert(new Element("div",{"class":"language hidden"}).update(n.language));
l.insert(k);
j.insert(l);
m.checked=true
})
},countDocumentsInSpace:function(g){var f=this;
if(typeof this.documentCount[g]=="undefined"){this.documentCount[g]=Object.keys(this.packageDocuments[g]).inject(0,function(i,h){return i+f.packageDocuments[g][h].length
})
}delete f;
return this.documentCount[g]
},countSelectedDocumentsInSpace:function(g){var h;
if(typeof this.ignore[g]=="undefined"){return this.countDocumentsInSpace(g)
}else{var f=this;
return(this.countDocumentsInSpace(g)-Object.keys(this.ignore[g]).inject(0,function(j,i){return j+f.ignore[g][i].length
}))
}},countSelectedDocuments:function(){var f=this;
return Object.keys(this.packageDocuments).inject(0,function(h,g){return h+f.countSelectedDocumentsInSpace(g)
})
},updateSelection:function(f,g){var i=this.countDocumentsInSpace(g);
var h=this.countSelectedDocumentsInSpace(g);
f.down(".selection").update(h+" / "+i+" "+b.documentSelected);
if(h==0){f.down("input.space").uncheck()
}else{f.down("input.space").check()
}},spaceCheckboxClicked:function(i){var h=i.element().checked;
var g=i.element().up(".xitemcontainer").down(".spacename").innerHTML;
var f=i.element().up(".xitemcontainer").down("div.pages");
if(!h){this.ignoreSpace(g);
f.select("input[type='checkbox']").invoke("uncheck")
}else{this.restoreSpace(g);
f.select("input[type='checkbox']").invoke("check")
}this.updateSelection(i.element().up(".xitemcontainer"),g)
},documentCheckboxClicked:function(g){var i=g.element().up("div").down("span.documentName").innerHTML.stripTags().strip();
var h=g.element().up("li").up("div.xitemcontainer").down(".spacename").innerHTML;
var j=g.element().up("li").down(".language").innerHTML;
var f=g.element().checked;
if(!f){this.ignoreDocument(h,i,j)
}else{this.restoreDocument(h,i,j)
}this.updateSelection(g.element().up("li").up("div.xitemcontainer"),h)
},isIgnored:function(g,h,j){if(typeof this.ignore[g]=="undefined"){return false
}if(typeof this.ignore[g][h]=="undefined"){return false
}for(var f=0;
f<this.ignore[g][h].length;
f++){if(this.ignore[g][h][f].language==j){return true
}}return false
},ignoreSpace:function(f){this.ignore[f]=Object.toJSON(this.packageDocuments[f]).evalJSON()
},restoreSpace:function(f){if(typeof this.ignore[f]!="undefined"){delete this.ignore[f]
}},ignoreDocument:function(f,g,h){if(typeof this.ignore[f]=="undefined"){this.ignore[f]=new Object()
}if(typeof this.ignore[f][g]=="undefined"){this.ignore[f][g]=[]
}this.ignore[f][g][this.ignore[f][g].length]={language:h}
},restoreDocument:function(f,h,j){if(typeof this.ignore[f]!="undefined"&&typeof this.ignore[f][h]!="undefined"){for(var g=0;
g<this.ignore[f][h].length;
g++){if(this.ignore[f][h][g].language===j){delete this.ignore[f][h][g];
this.ignore[f][h]=this.ignore[f][h].compact()
}}}}});
return e
})(XWiki||{});