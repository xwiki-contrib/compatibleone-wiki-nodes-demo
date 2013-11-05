if(typeof(XWiki)=="undefined"||typeof(XWiki.widgets)=="undefined"||typeof(XWiki.widgets.ModalPopup)=="undefined"){if(typeof console!="undefined"&&typeof console.warn=="function"){console.warn("[MessageBox widget] Required class missing: XWiki.widgets.ModalPopup")
}}else{XWiki.widgets.ConfirmationBox=Class.create(XWiki.widgets.ModalPopup,{defaultInteractionParameters:{confirmationText:"$msg.get('core.widgets.confirmationBox.defaultQuestion')",yesButtonText:"$msg.get('core.widgets.confirmationBox.button.yes')",noButtonText:"$msg.get('core.widgets.confirmationBox.button.no')"},initialize:function($super,a,b){this.interactionParameters=Object.extend(Object.clone(this.defaultInteractionParameters),b||{});
$super(this.createContent(this.interactionParameters),{show:{method:this.showDialog,keys:[]},yes:{method:this.onYes,keys:["Enter","Space"]},no:{method:this.onNo,keys:["Esc"]},close:{method:this.closeDialog,keys:[]}},{displayCloseButton:false,removeOnClose:true});
this.showDialog();
this.setClass("confirmation");
this.behavior=a||{}
},createContent:function(e){var b=new Element("div",{"class":"question"}).update(e.confirmationText);
var d=new Element("div",{"class":"buttons"});
var f=this.createButton("button",e.yesButtonText,"(Enter)","");
var a=this.createButton("button",e.noButtonText,"(Esc)","");
d.insert(f);
d.insert(a);
var c=new Element("div");
c.insert(b).insert(d);
Event.observe(f,"click",this.onYes.bindAsEventListener(this));
Event.observe(a,"click",this.onNo.bindAsEventListener(this));
return c
},onYes:function(){this.closeDialog();
if(typeof(this.behavior.onYes)=="function"){this.behavior.onYes()
}},onNo:function(){this.closeDialog();
if(typeof(this.behavior.onNo)=="function"){this.behavior.onNo()
}}})
};