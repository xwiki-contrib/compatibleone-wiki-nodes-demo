var action,orgTableWidth,orgTableHeight;
function insertTable(){var g=document.forms[0];
var d=tinyMCE.selectedInstance;
var j=2,i=2,n=0,p=-1,a=-1,o,m,l,b;
var k="";
var e=tinyMCE.tableElm;
var q,r,c;
tinyMCEPopup.restoreSelection();
j=g.elements.cols.value;
i=g.elements.rows.value;
n=g.elements.border.value!=""?g.elements.border.value:0;
p=g.elements.cellpadding.value!=""?g.elements.cellpadding.value:"";
a=g.elements.cellspacing.value!=""?g.elements.cellspacing.value:"";
o=g.elements.align.options[g.elements.align.selectedIndex].value;
m=g.elements.width.value;
l=g.elements.height.value;
bordercolor=g.elements.bordercolor.value;
bgcolor=g.elements.bgcolor.value;
b="wiki-table";
id=g.elements.id.value;
summary=g.elements.summary.value;
style=g.elements.style.value;
dir=g.elements.dir.value;
lang=g.elements.lang.value;
background=g.elements.backgroundimage.value;
q=tinyMCE.getParam("table_cell_limit",false);
r=tinyMCE.getParam("table_row_limit",false);
c=tinyMCE.getParam("table_col_limit",false);
if(c&&j>c){alert(tinyMCE.getLang("lang_table_col_limit","",true,{cols:c}));
return false
}else{if(r&&i>r){alert(tinyMCE.getLang("lang_table_row_limit","",true,{rows:r}));
return false
}else{if(q&&j*i>q){alert(tinyMCE.getLang("lang_table_cell_limit","",true,{cells:q}));
return false
}}}if(action=="update"){d.execCommand("mceBeginUndoLevel");
tinyMCE.setAttrib(e,"cellPadding",p,true);
tinyMCE.setAttrib(e,"cellSpacing",a,true);
tinyMCE.setAttrib(e,"border",n,true);
tinyMCE.setAttrib(e,"align",o);
tinyMCE.setAttrib(e,"class",b);
tinyMCE.setAttrib(e,"style",style);
tinyMCE.setAttrib(e,"id",id);
tinyMCE.setAttrib(e,"summary",summary);
tinyMCE.setAttrib(e,"dir",dir);
tinyMCE.setAttrib(e,"lang",lang);
if(!tinyMCE.getParam("inline_styles")){tinyMCE.setAttrib(e,"width",m,true)
}tinyMCE.setAttrib(e,"borderColor","");
tinyMCE.setAttrib(e,"bgColor","");
tinyMCE.setAttrib(e,"background","");
tinyMCE.setAttrib(e,"height","");
if(background!=""){e.style.backgroundImage="url('"+background+"')"
}else{e.style.backgroundImage=""
}if(tinyMCE.getParam("inline_styles")){e.style.borderWidth=n+"px"
}if(tinyMCE.getParam("inline_styles")){if(m!=""){e.style.width=getCSSSize(m)
}}if(bordercolor!=""){e.style.borderColor=bordercolor;
e.style.borderStyle=e.style.borderStyle==""?"solid":e.style.borderStyle;
e.style.borderWidth=n==""?"1px":n
}else{e.style.borderColor=""
}e.style.backgroundColor=bgcolor;
e.style.height=getCSSSize(l);
tinyMCE.handleVisualAid(tinyMCE.tableElm,false,d.visualAid,d);
tinyMCE.tableElm.outerHTML=tinyMCE.tableElm.outerHTML;
tinyMCE.handleVisualAid(d.getBody(),true,d.visualAid,d);
tinyMCE.triggerNodeChange();
d.execCommand("mceEndUndoLevel");
if(g.width.value!=orgTableWidth||g.height.value!=orgTableHeight){d.repaint()
}tinyMCEPopup.close();
return true
}k+='<table class="wiki-table" cellpadding="0" cellspacing="0" align="center">';
for(var f=0;
f<i;
f++){if(f==0){k+='<tr class="table-head">';
for(var h=0;
h<j;
h++){k+="<td>&nbsp;</td>"
}k+="</tr>"
}else{if((f%2)==1){k+='<tr class="table-odd">'
}else{k+='<tr class="table-even">'
}for(var h=0;
h<j;
h++){k+="<td>&nbsp;</td>"
}k+="</tr>"
}}k+="</table>";
d.execCommand("mceBeginUndoLevel");
d.execCommand("mceInsertContent",false,k);
tinyMCE.handleVisualAid(d.getBody(),true,tinyMCE.settings.visual);
d.execCommand("mceEndUndoLevel");
tinyMCEPopup.close()
}function makeAttrib(d,c){var b=document.forms[0];
var a=b.elements[d];
if(typeof(c)=="undefined"||c==null){c="";
if(a){c=a.value
}}if(c==""){return""
}c=c.replace(/&/g,"&amp;");
c=c.replace(/\"/g,"&quot;");
c=c.replace(/</g,"&lt;");
c=c.replace(/>/g,"&gt;");
return" "+d+'="'+c+'"'
}function init(){tinyMCEPopup.resizeToInnerSize();
document.getElementById("backgroundimagebrowsercontainer").innerHTML=getBrowserHTML("backgroundimagebrowser","backgroundimage","image","table");
document.getElementById("backgroundimagebrowsercontainer").innerHTML=getBrowserHTML("backgroundimagebrowser","backgroundimage","image","table");
document.getElementById("bordercolor_pickcontainer").innerHTML=getColorPickerHTML("bordercolor_pick","bordercolor");
document.getElementById("bgcolor_pickcontainer").innerHTML=getColorPickerHTML("bgcolor_pick","bgcolor");
var j=2,h=2,p=0,v="",b="";
var q="",o="",l="",s="",a="",c="wiki-table";
var m="",f="",t="",n="",w="",u="",a="",s="";
var d=tinyMCE.selectedInstance;
var g=document.forms[0];
var e=tinyMCE.getParentElement(d.getFocusElement(),"table");
tinyMCE.tableElm=e;
action=tinyMCE.getWindowArg("action");
if(action==null){action=tinyMCE.tableElm?"update":"insert"
}if(tinyMCE.tableElm&&action!="insert"){var k=tinyMCE.tableElm.rows;
var j=0;
for(var r=0;
r<k.length;
r++){if(k[r].cells.length>j){j=k[r].cells.length
}}j=j;
h=k.length;
st=tinyMCE.parseStyle(tinyMCE.getAttrib(tinyMCE.tableElm,"style"));
p=trimSize(getStyle(e,"border","borderWidth"));
v=tinyMCE.getAttrib(tinyMCE.tableElm,"cellpadding","");
b=tinyMCE.getAttrib(tinyMCE.tableElm,"cellspacing","");
o=trimSize(getStyle(e,"width","width"));
l=trimSize(getStyle(e,"height","height"));
s=convertRGBToHex(getStyle(e,"bordercolor","borderLeftColor"));
a=convertRGBToHex(getStyle(e,"bgcolor","backgroundColor"));
q=tinyMCE.getAttrib(tinyMCE.tableElm,"align",q);
m=tinyMCE.getAttrib(tinyMCE.tableElm,"id");
f=tinyMCE.getAttrib(tinyMCE.tableElm,"summary");
t=tinyMCE.serializeStyle(st);
n=tinyMCE.getAttrib(tinyMCE.tableElm,"dir");
w=tinyMCE.getAttrib(tinyMCE.tableElm,"lang");
u=getStyle(e,"background","backgroundImage").replace(new RegExp("url\\('?([^']*)'?\\)","gi"),"$1");
orgTableWidth=o;
orgTableHeight=l;
action="update"
}addClassesToList("class","table_styles");
selectByValue(g,"align",q);
selectByValue(g,"class",c);
g.cols.value=j;
g.rows.value=h;
g.border.value=p;
g.cellpadding.value=v;
g.cellspacing.value=b;
g.width.value=o;
g.height.value=l;
g.bordercolor.value=s;
g.bgcolor.value=a;
g.id.value=m;
g.summary.value=f;
g.style.value=t;
g.dir.value=n;
g.lang.value=w;
g.backgroundimage.value=u;
g.insert.value=tinyMCE.getLang("lang_"+action,"Insert",true);
updateColor("bordercolor_pick","bordercolor");
updateColor("bgcolor_pick","bgcolor");
if(isVisible("backgroundimagebrowser")){document.getElementById("backgroundimage").style.width="180px"
}if(action=="update"){g.cols.disabled=true;
g.rows.disabled=true
}}function changedSize(){var b=document.forms[0];
var c=tinyMCE.parseStyle(b.style.value);
var d=b.width.value;
if(d!=""){c.width=tinyMCE.getParam("inline_styles")?getCSSSize(d):""
}else{c.width=""
}var a=b.height.value;
if(a!=""){c.height=getCSSSize(a)
}else{c.height=""
}b.style.value=tinyMCE.serializeStyle(c)
}function changedBackgroundImage(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
b["background-image"]="url('"+a.backgroundimage.value+"')";
a.style.value=tinyMCE.serializeStyle(b)
}function changedBorder(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
if(a.border.value!=""&&a.bordercolor.value!=""){b["border-width"]=a.border.value+"px"
}a.style.value=tinyMCE.serializeStyle(b)
}function changedColor(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
b["background-color"]=a.bgcolor.value;
if(a.bordercolor.value!=""){b["border-color"]=a.bordercolor.value;
if(!b["border-width"]){b["border-width"]=a.border.value==""?"1px":a.border.value+"px"
}}a.style.value=tinyMCE.serializeStyle(b)
}function changedStyle(){var a=document.forms[0];
var b=tinyMCE.parseStyle(a.style.value);
if(b["background-image"]){a.backgroundimage.value=b["background-image"].replace(new RegExp("url\\('?([^']*)'?\\)","gi"),"$1")
}else{a.backgroundimage.value=""
}if(b.width){a.width.value=trimSize(b.width)
}if(b.height){a.height.value=trimSize(b.height)
}if(b["background-color"]){a.bgcolor.value=b["background-color"];
updateColor("bgcolor_pick","bgcolor")
}if(b["border-color"]){a.bordercolor.value=b["border-color"];
updateColor("bordercolor_pick","bordercolor")
}};