tinyMCE.importPluginLanguagePack("emotions","en,tr,sv,zh_cn,cs,fa,fr_ca,fr,de,pl,pt_br,nl,da,he,nb,hu,ru,ru_KOI8-R,ru_UTF-8,nn,es,cy,is,zh_tw,zh_tw_utf8,sk");
var TinyMCE_EmotionsPlugin={getInfo:function(){return{longname:"Emotions",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_emotions.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},getControlHTML:function(a){switch(a){case"emotions":return tinyMCE.getButtonHTML(a,"lang_emotions_desc","{$pluginurl}/images/emotions.gif","mceEmotion")
}return""
},execCommand:function(e,a,d,f,c){switch(d){case"mceEmotion":var b=new Array();
b.file="../../plugins/emotions/emotions.htm";
b.width=160;
b.height=160;
b.width+=tinyMCE.getLang("lang_emotions_delta_width",0);
b.height+=tinyMCE.getLang("lang_emotions_delta_height",0);
tinyMCE.openWindow(b,{editor_id:e,inline:"yes"});
return true
}return false
}};
tinyMCE.addPlugin("emotions",TinyMCE_EmotionsPlugin);