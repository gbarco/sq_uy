require.config({
        waitSeconds: 50,
        paths:{
                "jquery": "http://code.jquery.com/jquery-1.11.3.min",
                "underscore":"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
		"backbone":"https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.1/backbone-min",
		"marionette":"http://marionettejs.com/downloads/backbone.marionette.min",
		"bootstrap":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min"
        },
        shim:{
		"underscore":{
			exports:'_'
		},
                "backbone":{
			deps:["jquery","underscore"],
			exports:"Backbone"
		},
		"marionette":{
			deps:["underscore","jquery","backbone"],
			exports:"Marionette"
		},
		"bootstrap":{
			deps:["jquery"],
			exports:"Bootstrap"	
		}
        }
});

require(["jquery","underscore","backbone","marionette","bootstrap"],function($,_,Backbone, Marionette,Bootstrap){

	var MyApp = new Marionette.Application();

	var AppLayoutView = Backbone.Marionette.LayoutView.extend({
		el : "#main_layout",
		template : "#layout_view_template",
		initialize : function(){

		},
		regions: {
			head: "#head",
    			menu: "#menu",
    			content: "#content",
			foot: "#foot"
  		},
		events:{
		},
		hola:function(){
			alert('Hola');
		},
		

	});

	var HeadView = Backbone.Marionette.ItemView.extend({
		initialize : function(){
		},
		template:"#head_view_template",
		events:{
		}
	});
	
	var MenuView = Backbone.Marionette.ItemView.extend({
		initialize : function(){
		},
		template:"#menu_view_template",
		events:{			'click li#home': 'goHome',
			'click li#somos': 'goSomos',
			'click li#contacto': 'goContacto',
			'click li#que_ha': 'goQue_ha'
		},
		goHome: function(){
			ctrl.home();
			this._removeMenuSelectedClass();
			$('#home a').addClass("selected").find("span").addClass("selected");

		},
		goSomos: function(){
			ctrl.somos();
			this._removeMenuSelectedClass();
			$('#somos a').addClass("selected").find("span").addClass("selected");

	
		},
		goContacto: function(event){
			event.stopPropagation();
			ctrl.contacto();	
			this._removeMenuSelectedClass();
			$('#contacto a').addClass("selected").find("span").addClass("selected");

	
		},
		goQue_ha: function(){
			ctrl.que_ha();
			this._removeMenuSelectedClass();
			$('#que_ha a').addClass("selected").find("span").addClass("selected");


		},
		_removeMenuSelectedClass:function(){
			$(".nav-justified>li a").removeClass("selected").find("span").removeClass("selected");
			
		}
	});

	var HomeView = Backbone.Marionette.ItemView.extend({
		initialize : function(){
		},
		template:"#home_view_template",
		events:{
		}
	});

	var SomosView = Backbone.Marionette.ItemView.extend({
		template:"#somos_view_template"
	});
	
	var Que_haView = Backbone.Marionette.ItemView.extend({
		template:"#que_ha_view_template"
	});

	var ContactoView = Backbone.Marionette.ItemView.extend({
		template:"#contacto_view_template"
	});


	var FootView = Backbone.Marionette.ItemView.extend({
		initialize : function(){
		},
		template:"#foot_view_template",
		events:{
		}
	});

	layout = new AppLayoutView();
	//Paginas Generales
	hView = new HeadView();
	mView = new MenuView();
	fView = new FootView();
	//Paginas particulares
	homeView = new HomeView();


	var MyController = Marionette.Controller.extend({
		home: function() {
			layout.getRegion("content").show(new HomeView());
		},
		somos: function() {
			layout.getRegion("content").show(new SomosView());
		},
		contacto : function(){
			layout.getRegion("content").show(new ContactoView());
		},
		que_ha : function(){

			layout.getRegion("content").show(new Que_haView());  
		}	
	});
			
		
		//Render inicial
	layout.render()
	layout.getRegion("head").show(hView);
	layout.getRegion("menu").show(mView);
	layout.getRegion("content").show(homeView);
	layout.getRegion("foot").show(fView);
	//var myRouter = new MyRouter({controller: ctrl});
	var ctrl = new MyController(); 
	var myRouter = new Marionette.AppRouter({
		controller: ctrl,
		appRoutes: {
			"": "home"
	  	},
		routes:{
			"somos": "somos",
			"contacto": "contacto",
			"que_ha" : "que_ha"
		},
		que_ha : function(){alert("hola p")}	
	});
	Backbone.history.start();
});


