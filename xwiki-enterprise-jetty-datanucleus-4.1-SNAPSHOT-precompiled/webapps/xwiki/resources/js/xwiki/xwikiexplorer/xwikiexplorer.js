if(typeof XWiki=="undefined"){alert("ERROR: xwikiexplorer.js depends on xwiki.js")
}XWiki.constants.rest={baseRestURI:XWiki.contextPath+"/rest/",restChildrenRel:"http://www.xwiki.org/rel/children",restParentRel:"http://www.xwiki.org/rel/parent",restAttachmentsRel:"http://www.xwiki.org/rel/attachments",restHomeRel:"http://www.xwiki.org/rel/home"};
isc.ClassFactory.defineClass("XWEResultTree",isc.ResultTree);
isc.XWEResultTree.addClassProperties({constants:{addNodeSuffix:"..new",pageHint:"$msg.get('xwikiexplorer.page.hint')",attachmentsTitle:"$msg.get('xwikiexplorer.attachments.title')",attachmentsHint:"$msg.get('xwikiexplorer.attachments.hint')",attachmentHint:"$msg.get('xwikiexplorer.attachment.hint')",addPageTitle:"$msg.get('xwikiexplorer.addpage.title')",addPageHint:"$msg.get('xwikiexplorer.addpage.hint')",addAttachmentTitle:"$msg.get('xwikiexplorer.addattachment.title')",addAttachmentHint:"$msg.get('xwikiexplorer.addattachment.hint')"}});
isc.XWEResultTree.addClassMethods({formatPath:function(){return Array.prototype.slice.call(arguments,0).join(" \u00BB ")
},formatTitle:function(c,b,a){c=(c||"").escapeHTML();
b=(b||"").escapeHTML();
if(a){return'<a href="'+a+'" title="'+b+'">'+c+"</a>"
}else{return'<span title="'+b+'">'+c+"</span>"
}}});
isc.XWEResultTree.addProperties({multiDSTree:true,callbacks:{dataArrived:new Array()},parentMap:{},displayLinks:true,displayAddPage:false,displayAddPageOnTop:true,displayAttachments:true,displayAttachmentsOnTop:false,displayAttachmentsWhenEmpty:false,displayAddAttachment:false,displayAddAttachmentOnTop:true,displayBlacklistedSpaces:false});
isc.XWEResultTree.addMethods({getChildDataSource:function(e,d){var c=e[this.childTypeProperty];
if(c!=null){return isc.DS.get(c)
}var d=d||this.getNodeDataSource(e);
if(d==null||!this.isMultiDSTree()){return this.getRootDataSource()
}var b=this.treeRelations,a=d.getChildDataSources();
var f=XWiki.resource.get(e.id);
e.resource=f;
if(d.Class=="XWEDataSource"){c=isc.XWEWikiDataSource.getOrCreate(f.wiki).getID()
}else{if(d.Class=="XWEWikiDataSource"){c=isc.XWESpaceDataSource.getOrCreate(f.wiki,f.space).getID()
}else{if(d.Class=="XWESpaceDataSource"){if(e.isXWikiAttachment==null){c=isc.XWESpaceDataSource.getOrCreate(f.wiki,f.space).getID()
}else{c=isc.XWEAttachmentsDataSource.getOrCreate(f.wiki,f.space,f.name).getID()
}}else{if(b){c=b[d.ID]
}}}}if(c!=null){return isc.DS.get(c)
}if(a!=null){return a[0]
}},dataArrived:function(f){var k=this.getNodeDataSource(f);
var d="";
if(k==null){k=this.getDataSource()
}if(k.Class=="XWEWikiDataSource"&&this.displayBlacklistedSpaces==false){this.filterNodesByName(this.getChildren(),XWiki.blacklistedSpaces)
}var b=this.getChildren(f);
for(var e=0;
e<b.length;
e++){var a=this.getNodeDataSource(b[e]);
var h=b[e].title||b[e].name;
var c=a.getHint(b[e]);
var g=true;
if(this.displayLinks==true&&b[e].xwikiRelativeUrl!=null){h=isc.XWEResultTree.formatTitle(h,c,b[e].xwikiRelativeUrl)
}else{h=isc.XWEResultTree.formatTitle(h,c)
}isc.addProperties(b[e],{icon:a.icon,plainTitle:b[e].title,title:h,isNewPage:false,isNewAttachment:false});
if(e==0){d=a.Class
}}if(d=="XWESpaceDataSource"&&k.Class=="XWEWikiDataSource"&&this.displayAddPage==true){this.addAddPageNode(f)
}if(k.Class=="XWESpaceDataSource"&&this.displayAttachments==true&&!f.isXWikiAttachment){this.addAttachmentsNode(f)
}if(f.isXWikiAttachment&&this.displayAddAttachment==true){this.addAddAttachmentsNode(f)
}if(this.callbacks.dataArrived.length>0){var j=this.callbacks.dataArrived.shift();
j.callback()
}},isFolder:function(d){var c=this.getNodeDataSource(d);
if(c!=null){if(c.Class=="XWEDataSource"){return true
}else{if(c.Class=="XWEWikiDataSource"){return true
}else{if(c.Class=="XWESpaceDataSource"){if(d.isXWikiAttachment==true){return true
}var a=(d.link!=null)?d.link:new Array();
for(var b=0;
b<a.length;
b++){if(a[b].rel==XWiki.constants.rest.restChildrenRel||a[b].rel==XWiki.constants.rest.restAttachmentsRel||this.displayAttachmentsWhenEmpty||this.displayAddAttachment){return true
}}return false
}else{if(c.Class=="XWEAttachmentsDataSource"){return false
}}}}}return true
},getChildNodeByName:function(d,a){var c=this.getChildren(d);
if(c!=null){for(var b=0;
b<c.length;
b++){if(c[b].name==a){return c[b]
}}}return null
},filterNodesByName:function(a,c){for(var b=0;
b<a.length;
b++){if(XWiki.blacklistedSpaces.indexOf(a[b].name)!=-1){this.remove(a[b])
}}},addAddPageNode:function(c){var d=isc.XWEResultTree.constants.addPageHint+" "+isc.XWEResultTree.formatPath(c.resource.wiki,c.resource.space);
var b={id:c.id+isc.XWEResultTree.constants.addNodeSuffix,wiki:c.wiki,space:c.space,title:isc.XWEResultTree.formatTitle(isc.XWEResultTree.constants.addPageTitle,d),parentId:c.id,icon:"$xwiki.getSkinFile('icons/silk/bullet_add.png')",resource:c.resource,isNewPage:true,isNewAttachment:false,clickCallback:function(g,e,f){e.resource=XWiki.resource.get(e.resource.prefixedSpace);
g.input.value=""
}};
var a;
if(this.displayAddPageOnTop==true){a=0
}else{a=null
}this.add(b,c,a)
},addAddAttachmentsNode:function(c){var d=isc.XWEResultTree.constants.addAttachmentHint+" "+isc.XWEResultTree.formatPath(c.resource.wiki,c.resource.space,c.resource.name);
var b={id:c.id+isc.XWEResultTree.constants.addNodeSuffix,wiki:c.wiki,space:c.space,title:isc.XWEResultTree.formatTitle(isc.XWEResultTree.constants.addAttachmentTitle,d),parentId:c.id,icon:"$xwiki.getSkinFile('icons/silk/bullet_add.png')",resource:c.resource,isNewPage:false,isNewAttachment:true,clickCallback:function(g,e,f){g.input.value=""
}};
var a;
if(this.displayAddAttachmentsOnTop==true){a=0
}else{a=null
}this.add(b,c,a)
},addAttachmentsNode:function(a){var d=false;
var g=this.getNodeDataSource(a);
if(this.displayAttachmentsWhenEmpty==true||this.displayAddAttachment){d=true
}else{var k=(a.link!=null)?a.link:new Array();
var d=false;
for(var c=0;
c<k.length;
c++){if(k[c].rel==XWiki.constants.rest.restAttachmentsRel){d=true;
break
}}}if(d==true){var b=isc.XWEResultTree.constants.attachmentsHint+" "+isc.XWEResultTree.formatPath(a.resource.wiki,a.resource.space,a.resource.name);
var f=isc.XWEResultTree.constants.attachmentsTitle+" ("+a.plainTitle+")";
if(this.displayLinks==true){var h=isc.XWEResultTree.formatTitle(f,b,a.xwikiRelativeUrl+XWiki.constants.anchorSeparator+XWiki.constants.docextraAttachmentsAnchor)
}else{var h=isc.XWEResultTree.formatTitle(f,b)
}var j={id:a.id+XWiki.constants.anchorSeparator+XWiki.constants.docextraAttachmentsAnchor,fullName:a.fullName+XWiki.constants.anchorSeparator+XWiki.constants.docextraAttachmentsAnchor,wiki:a.wiki,space:a.space,title:h,name:a.name,parentId:a.id,xwikiRelativeURL:a.xwikiRelativeURL+XWiki.constants.anchorSeparator+XWiki.constants.docextraAttachmentsAnchor,icon:"$xwiki.getSkinFile('icons/silk/page_white_zip.png')",resource:XWiki.resource.get(a.id+XWiki.constants.anchorSeparator+XWiki.constants.docextraAttachmentsAnchor),isXWikiAttachment:true,isNewPage:false,isNewAttachment:false};
var e;
if(this.displayAttachmentsOnTop==true){e=0
}else{e=null
}this.add(j,a,e)
}}});
isc.ClassFactory.defineClass("XWEDataSource",isc.DataSource);
isc.XWEDataSource.addClassProperties({sep:"_"});
isc.XWEDataSource.addProperties({dataFormat:"xml",xmlNamespaces:{xwiki:"http://www.xwiki.org"},resultTreeClass:"XWEResultTree",transformResponse:function(b,a,d){if(this.callbacks.transformResponse.length>0){var c=this.callbacks.transformResponse.shift();
c.callback(b,a,d)
}return b
},dataURL:XWiki.constants.rest.baseRestURI+"wikis/",recordXPath:"/xwiki:wikis/xwiki:wiki",fields:[{name:"id",required:true,type:"text",primaryKey:true},{name:"name",type:"text"},{name:"title",type:"text"},{name:"xwikiRelativeUrl",type:"text"}],icon:"$xwiki.getSkinFile('icons/silk/database.png')",requestProperties:{promptStyle:"cursor",willHandleError:true},callbacks:{transformResponse:new Array()}});
isc.XWEDataSource.addMethods({transformRequest:function(a){a.httpHeaders={Accept:"application/xml"};
if(a.originalData){a.originalData.r=""+Math.floor(Math.random()*1000000)
}return a.data
},getHint:function(a){return""
}});
isc.ClassFactory.defineClass("XWEWikiDataSource",isc.XWEDataSource);
isc.XWEWikiDataSource.addClassMethods({getOrCreate:function(a){var c="XWEWikiDataSource_"+a;
var b=this.get(c);
if(b==null){b=this.create({ID:c,wiki:a})
}return b
}});
isc.XWEWikiDataSource.addProperties({wiki:XWiki.currentWiki,recordXPath:"/xwiki:spaces/xwiki:space",fields:[{name:"id",required:true,type:"text",primaryKey:true},{name:"name",required:true,type:"text"},{name:"title",type:"text"},{name:"xwikiRelativeUrl",type:"text"}],icon:"$xwiki.getSkinFile('icons/silk/folder.png')"});
isc.XWEWikiDataSource.addMethods({init:function(){this.dataURL=XWiki.constants.rest.baseRestURI+"wikis/"+this.wiki+"/spaces";
this.Super("init",arguments)
},getHint:function(a){return isc.XWEResultTree.constants.pageHint+" "+isc.XWEResultTree.formatPath(a.resource.wiki,a.name)
}});
isc.ClassFactory.defineClass("XWESpaceDataSource",isc.XWEDataSource);
isc.XWESpaceDataSource.addClassMethods({getOrCreate:function(a,c){var d="XWESpaceDataSource_"+a+isc.XWEDataSource.sep+c;
var b=this.get(d);
if(b==null){b=this.create({ID:d,wiki:a,space:c})
}return b
}});
isc.XWESpaceDataSource.addProperties({wiki:"xwiki",space:"Main",recordXPath:"/xwiki:pages/xwiki:pageSummary",fields:[{name:"id",required:true,type:"text",primaryKey:true},{name:"fullName",required:true,type:"text"},{name:"wiki",required:true,type:"text"},{name:"space",required:true,type:"text"},{name:"name",required:true,type:"text"},{name:"title",required:true,type:"text"},{name:"parentId",required:true,type:"text",foreignKey:"id"},{name:"parent",required:true,type:"text"},{name:"xwikiRelativeUrl",type:"text"},{name:"link",propertiesOnly:true}],icon:"$xwiki.getSkinFile('icons/silk/page_white_text.png')"});
isc.XWESpaceDataSource.addMethods({init:function(){this.dataURL=XWiki.constants.rest.baseRestURI+"wikis/"+this.wiki+"/spaces/"+this.space+"/pages";
this.transformRequest=function(a){var b=this.wiki+XWiki.constants.wikiSpaceSeparator+this.space;
if(a.originalData.parentId==b||a.originalData.parentId==null){a.originalData.parentId="^(?!"+b+".).*$"
}return this.Super("transformRequest",arguments)
};
this.Super("init",arguments)
},getHint:function(a){return isc.XWEResultTree.constants.pageHint+" "+isc.XWEResultTree.formatPath(a.wiki,a.space,a.name)
}});
isc.ClassFactory.defineClass("XWEPageDataSource",isc.XWEDataSource);
isc.XWEPageDataSource.addClassMethods({getOrCreate:function(a,d,c){var e="XWEPageDataSource_"+a+isc.XWEDataSource.sep+d+isc.XWEDataSource.sep+c;
var b=this.get(e);
if(b==null){b=this.create({ID:e,wiki:a,space:d,page:c})
}return b
}});
isc.XWEPageDataSource.addProperties({wiki:"xwiki",space:"Main",page:"WebHome",recordXPath:"/xwiki:page",fields:[{name:"id",required:true,type:"text",primaryKey:true},{name:"wiki",required:true,type:"text"},{name:"space",required:true,type:"text"},{name:"name",required:true,type:"text"},{name:"parentId",required:true,type:"text"},{name:"parent",required:true,type:"text"},{name:"link",propertiesOnly:true}],icon:"$xwiki.getSkinFile('icons/silk/page_white_text.png')"});
isc.XWEPageDataSource.addMethods({init:function(){this.dataURL=XWiki.constants.rest.baseRestURI+"wikis/"+this.wiki+"/spaces/"+this.space+"/pages/"+this.page;
this.Super("init",arguments)
}});
isc.ClassFactory.defineClass("XWEAttachmentsDataSource",isc.XWEDataSource);
isc.XWEAttachmentsDataSource.addClassMethods({getOrCreate:function(a,d,c){var e="XWEAttachmentsDataSource_"+a+isc.XWEDataSource.sep+d+isc.XWEDataSource.sep+c;
var b=this.get(e);
if(b==null){b=this.create({ID:e,wiki:a,space:d,page:c})
}return b
}});
isc.XWEAttachmentsDataSource.addProperties({wiki:"xwiki",space:"Main",page:"WebHome",recordXPath:"/xwiki:attachments/xwiki:attachment",fields:[{name:"id",required:true,type:"text",primaryKey:true},{name:"name",required:true,type:"text"},{name:"title",type:"text"},{name:"xwikiRelativeUrl",type:"text"}],icon:"$xwiki.getSkinFile('icons/silk/attach.png')"});
isc.XWEAttachmentsDataSource.addMethods({init:function(){this.dataURL=XWiki.constants.rest.baseRestURI+"wikis/"+this.wiki+"/spaces/"+this.space+"/pages/"+this.page+"/attachments";
this.Super("init",arguments)
},getHint:function(a){return isc.XWEResultTree.constants.attachmentHint+" "+isc.XWEResultTree.formatPath(a.resource.wiki,a.resource.space,a.resource.name)
}});
isc.ClassFactory.defineClass("XWETreeGrid",isc.TreeGrid);
isc.XWETreeGrid.addProperties({autoDraw:false,autoFetchData:true,nodeClick:function(c,a,b){this.nodeClickCallback(c,a,b)
},showHeader:false,folderIcon:"$xwiki.getSkinFile('icons/silk/database.png')",position:"relative",dropIconSuffix:"",openIconSuffix:"",closedIconSuffix:"",animateFolders:false,wiki:XWiki.currentWiki,space:null,displaySuggest:true,defaultValue:"Main.WebHome",inputValueCache:""});
isc.XWETreeGrid.addMethods({draw:function(){if(this.Super("draw",arguments)!=null){return this
}if(typeof this.input=="undefined"&&this.input==null){this.drawInput()
}for(member in this){if(typeof member!="function"&&member.startsWith("display")){this.data[member]=this[member]
}}var a="div.listGrid td, div.listGrid table {margin:0;padding:0;} div.listGrid td {border:0;color:#333;} #actionmenu {z-index: 999999;}";
var c=document.getElementsByTagName("head")[0];
var b=document.createElement("style");
b.type="text/css";
b.media="screen";
if(b.styleSheet){b.styleSheet.cssText=a
}else{b.appendChild(document.createTextNode(a))
}c.appendChild(b)
},invalidateCache:function(){this.Super("invalidateCache",arguments);
this.inputValueCache=""
},openNode:function(a,e,b){var d={treeId:this.getID(),callback:function(){window[this.treeId].openNodesFromInput()
}};
var c=a.findById(e);
if(c!=null){if(a.isFolder(c)&&!a.isOpen(c)){if(b==true){this.getData().callbacks.dataArrived.push(d)
}a.openFolder(c);
return null
}this.selectNodeAndScroll(c);
return c
}return null
},selectNodeAndScroll:function(a){this.deselectAllRecords();
this.selectRecord(a);
nodeYPos=this.getFocusRow()*this.getRowHeight();
this.body.scrollTo(this.body.getScrollLeft(),nodeYPos)
},openParent:function(b,e,a){a=a||[];
if(e.name!=""&&a.indexOf(e.prefixedFullName)<0){a.push(e.prefixedFullName);
if(b.parentMap[e.prefixedFullName]==null){var f=isc.XWEPageDataSource.getOrCreate(e.wiki,e.space,e.name);
var d=function(j,i,l,h){if(j.httpResponseCode==200){var g=j.data[0].parent?XWiki.resource.get(j.data[0].parent):{prefixedFullName:"",name:""};
b.parentMap[e.prefixedFullName]=g;
if(b.findById(g.prefixedFullName)!=null){this.openNode(b,g.prefixedFullName,true)
}else{this.openParent(b,g,a)
}}else{if(this.displayAddPage==true){var k=this.getData().findById(e.prefixedSpace+isc.XWEResultTree.constants.addNodeSuffix);
k.resource=e;
this.selectNodeAndScroll(k)
}}}.bind(this);
f.transformRequest=function(g){g.httpHeaders={Accept:"application/xml"}
};
f.fetchData(null,d,null)
}else{var c=b.parentMap[e.prefixedFullName];
if(b.findById(c.prefixedFullName)!=null){this.openNode(b,c.prefixedFullName,true)
}else{this.openParent(b,c,a)
}}}},openNodesFromInput:function(){var i=this.getDataSource().Class;
var d=XWiki.resource.get(this.input.value);
var b=XWiki.resource.get("");
var e=this.getData();
if(this.getSelectedRecord()!=null){b=this.getSelectedRecord().resource
}if(i=="XWEDataSource"){var j=this.openNode(e,d.wiki,true);
if(j==null){return
}}if(i=="XWEDataSource"||i=="XWEWikiDataSource"){if(d.space!=b.space){this.deselectRecord(this.getSelectedRecord())
}var f=this.openNode(e,d.prefixedSpace,true);
if(f==null){return
}}var k=this.openNode(e,d.prefixedFullName,true);
if(k==null){this.openParent(e,d)
}if(b.attachment!=d.attachment||(b.anchor!=d.anchor&&d.anchor==XWiki.constants.docextraAttachmentsAnchor)){var c=d.prefixedFullName+XWiki.constants.anchorSeparator+XWiki.constants.docextraAttachmentsAnchor;
var a=this.openNode(e,c,true);
if(a==null){return
}var g=d.prefixedFullName+XWiki.constants.pageAttachmentSeparator+d.attachment;
var h=this.openNode(e,g,false)
}return
},inputObserver:function(){var a=this.input.value;
if(a!=""&&a!=this.inputValueCache){this.openNodesFromInput();
this.inputValueCache=a
}setTimeout(this.inputObserver.bind(this),2000)
},drawInput:function(){var d=(this.displaySuggest==false)?"hidden":"text";
var a=this.width-6;
var b=document.createElement("input");
b.setAttribute("id",this.getID()+"_Input");
b.setAttribute("name",this.getID()+"_Input");
b.setAttribute("style","width:"+a+"px;clear:both");
b.setAttribute("type",d);
if(this.defaultValue){b.setAttribute("value",this.defaultValue)
}this.htmlElement.appendChild(b);
this.input=b;
if(this.displaySuggest){var c=function(){var f=new XWiki.widgets.Suggest(this,{script:"/xwiki/rest/wikis/"+XWiki.currentWiki+"/search?scope=name&",varname:"q"});
f.setSuggestions=function(l){this.aSuggestions=[];
var h=l.responseXML;
var k=h.getElementsByTagName("searchResult");
for(var j=0;
j<k.length;
j++){var n=k[j].getElementsByTagName("id")[0].firstChild.nodeValue;
var m=k[j].getElementsByTagName("space")[0].firstChild.nodeValue;
var g=k[j].getElementsByTagName("pageName")[0].firstChild.nodeValue;
if(k[j].hasChildNodes()){this.aSuggestions.push({id:n,value:m+XWiki.constants.spacePageSeparator+g,info:""})
}}this.idAs="as_"+this.fld.id;
this.createList(this.aSuggestions)
}
};
Event.observe(b,"focus",c);
var e={treeId:this.getID(),callback:function(){window[this.treeId].inputObserver()
}};
this.getData().callbacks.dataArrived.push(e)
}else{var e={treeId:this.getID(),callback:function(){window[this.treeId].openNodesFromInput()
}};
this.getData().callbacks.dataArrived.push(e)
}},nodeClickCallback:function(c,a,b){if(a.clickCallback==null){var d=a.id;
if(!d.include(XWiki.constants.wikiSpaceSeparator)&&this.getData().getNodeDataSource(a).Class=="XWEDataSource"){d=d+XWiki.constants.wikiSpaceSeparator+"Main"+XWiki.constants.spacePageSeparator+"WebHome"
}if(!d.include(XWiki.constants.spacePageSeparator)&&this.getData().getNodeDataSource(a).Class=="XWEWikiDataSource"){d=d+XWiki.constants.spacePageSeparator+"WebHome"
}if(this.getDataSource().Class!="XWEDataSource"){d=d.substring(d.indexOf(XWiki.constants.wikiSpaceSeparator)+1,d.length)
}if(a.resource.space==XWiki.currentSpace){d=d.substring(d.indexOf(XWiki.constants.spacePageSeparator)+1,d.length)
}this.input.value=d;
this.inputValueCache=d
}else{a.clickCallback(c,a,b)
}},setValue:function(a){this.input.value=a
},getValue:function(){return this.input.value
},selectResource:function(a){this.setValue(XWiki.resource.serialize(a))
},getSelectedResourceProperty:function(b){var c=this.getValue();
var a=this.getSelectedRecord();
if(c.length>0){return XWiki.resource.get(c)[b]
}else{if(a!=null){return a.isNewPage&&b=="name"?null:a.resource[b]
}}return null
},isNewPage:function(){var a=this.getSelectedRecord();
return a==null?this.getValue().length>0:a.isNewPage
},isNewAttachment:function(){return this.getSelectedRecord().isNewAttachment
}});