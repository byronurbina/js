Ext.setup({
	/*tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,*/
	
	onReady: function() {
	
	//modelo de los datos de refri
	Ext.regModel('refri', {
    fields: ['nombre', 'id']
});
	//datos de la refri
var listadorefri = new Ext.data.Store({
    model: 'refri',
    sorters: 'nombre',
    proxy: {
                type: 'ajax', //saber xq.. como me toy basando con el que lee los RSS solo lo copie
                url: 'getrefri.php', //de donde vienen los datos, y como es local solo el nombre seria
                reader: {
                    type: 'tree', //saber que es... como que es la forma de leer
                    root: 'items' //donde inicia.. y el jason es un vector que se llama items
                }
            }
});
 listadorefri.load(); //carga inicialmente los datos, si ya estubiera la variable de session funcionara :)
	//modelo de los datos de los ingredientes
	Ext.regModel('ingredientes', {
            fields: [
                { name: 'id', type: 'string' },
				{ name: 'text', type: 'string' }
            ]
        });
	//es un text field cuando uno quiere agregar un ingrediente
	var txtFld = new Ext.form.Text({
    label: 'Nombre',
	value: 'valor1'
});
	//es el text fiel del correo y de el password
	var mail = new Ext.form.Text({
    label: 'Correo',
	placeHolder: 'you@mail.com',
	useClearIcon: true,
});
var pass = new Ext.form.Password({
    label: 'PassWord',
	type: 'password',
	useClearIcon: true,
});
	//funcion que trae en HTML las recetas resultantes, este no manda parametros, funciona con la base de datos y la variable de session
	var cargarrecetas = function() { // "+"
            Ext.getBody().mask('Cargando...', 'x-mask-loading', false);
            Ext.Ajax.request({
                url: 'consultas.php', //consultas.php
                success: function(response, opts) {
                   recetas.update(response.responseText);
                    //Ext.getCmp('status').setTitle('Static test.json file loaded');
                    Ext.getBody().unmask();
                }
            });
        };
	//esta funcion manda de parametros a un php el mail y el password
	var funcionlogin = function() {
	Ext.getBody().mask('Conectando...', 'x-mask-loading', false);
	 Ext.Ajax.request({
                url: 'login.php?mail='+mail.getValue()+'&pass='+pass.getValue(),
                success: function(response, opts) {
				//recetas.update(response.responseText);
				listadorefri.load();
				cargarrecetas();
                    Ext.getBody().unmask();
                }
            });
	}
	//elimina la variable de sesion
	var funcionlogout = function() {
	Ext.getBody().mask('Conectando...', 'x-mask-loading', false);
	 Ext.Ajax.request({
                url: 'logout.php',
                success: function(response, opts) {
				//recetas.update(response.responseText);
                    Ext.getBody().unmask();
                }
            });
	}
	//elimina un ingrediente de la refri
	var elimina = function(id) {
	Ext.getBody().mask('Conectando...', 'x-mask-loading', false);
	 Ext.Ajax.request({
                url: 'elimina.php?ingrediente='+id,
                success: function(response, opts) {
				//recetas.update(response.responseText);
                    Ext.getBody().unmask();
					listadorefri.load();
					cargarrecetas();
				}
            });
	}
	//agrega un ingrediente ala refri de quien este logeado agregaingrediente
	var agregaingrediente = function(id) {
	Ext.getBody().mask('Conectando...', 'x-mask-loading', false);
	 Ext.Ajax.request({
                url: 'agregaingrediente.php?ingrediente='+id,
                success: function(response, opts) {
				//recetas.update(response.responseText);
                    Ext.getBody().unmask();
					listadorefri.load();
					cargarrecetas();
				}
            });
	}
	//boton verde, este haria lo mismo que cargarecetas....
	var getrecetas = function() {
                        var panel = recetas;
                        
                        panel.update('');
                        panel.setLoading(true, true);
                        
                        Ext.Ajax.request({
                            url: 'getelements.php',
                            success: function(response, opts) {
                                panel.update(response.responseText);
                                panel.scroller.scrollTo({x: 0, y: 0});
                                panel.setLoading(false);
                            }
                        });
                    }	
	//datos de los ingredientes
 var datos = new Ext.data.TreeStore({
            model: 'ingredientes', //le digo como son los datos.. con el modelo anterior
            proxy: {
                type: 'ajax', //saber xq.. como me toy basando con el que lee los RSS solo lo copie
                url: 'getelements.php', //de donde vienen los datos, y como es local solo el nombre seria
                reader: {
                    type: 'tree', //saber que es... como que es la forma de leer
                    root: 'items' //donde inicia.. y el jason es un vector que se llama items
                }
            }
        });
	//dis que cambia el size de un par de cosas
	var calculateDesiredWidth = function() {
    var viewWidth = Ext.Element.getViewportWidth(),
        desiredWidth = Math.min(viewWidth, 400) - 10;

    return desiredWidth;
};
	//este boton crea un link a un php con un parametro, el link es "dinamico"
var ultimoboton = new Ext.Button({
ui: 'confirm-round',
text : 'first',
});
	//en este panel se le informa las calorias que tiene el ingrediente y se activa el link que agrega ingrediente
var editPnl = new Ext.Panel({
    floating: true,
    centered: true,
    modal: true,
    width: calculateDesiredWidth(),
	dockedItems: [
	{	dock: 'top',
		xtype: 'toolbar',
		title: 'Creciendo tu refri'
	},
	
	{	dock : 'bottom',
		xtype: 'toolbar',
		title: '..::..'
	},
	
	{
		xtype: 'spacer'
	},
	/*{
		xtype: 'button',
		ui: 'action',
		//text: 'un btoton'
		//var url = "http://www.google.com/",
		text : Ext.util.Format.format('<a href="{0}">agregar</a>', "http://127.0.0.1/pruebas/tabs-0.2/"+txtFld.getValue()),
		
	}*/
	ultimoboton,
	txtFld
	]
	
	});
	//panel donde van los campos para hacer login
var loginpanel = new Ext.Panel({
    title : 'login',
	floating: false,
    //centered: true,
    //modal: true,
	height: 385,
    width: 480,
	dockedItems: [
	{	dock: 'top',
		xtype: 'toolbar',
		title: 'Ingresa tus Datos'
	},
	
	{	dock : 'bottom',
		xtype: 'toolbar',
		ui: 'light',
			 layout: {
                    pack: 'center'
                },
		items:[
			{text: 'login',
			ui  : 'confirm-round',
			handler: funcionlogin},
			{text: 'logout',
			ui  : 'decline-round',
			handler: funcionlogout}
		
		]
	},
	
	{
		xtype: 'spacer'
	}
	],
	items:[
	mail, pass//los .Text que necesito para que el usuario haga Log In
	]
	
	});
	//panel donde el contenito se interpreta como HTML, aqui paran las recetas cuando se llaman
var recetas = new Ext.Panel({
    scroll: 'vertical',
    cls: 'card1 demo-data',
    styleHtmlContent: true,
    title: 'Recepies',
    dockedItems: [
        {
            dock : 'top',
            xtype: 'toolbar',
            items: [
                {
                    text: 'Actualizar Recetas',
					 ui  : 'confirm',
                    handler: cargarrecetas,
                }
            ]
        }
    ]
});
	//es el boton que se habilita cuando se llega al final de la nestedlist-> activa un actionSheet ->activa el panel de agregar	
var agregar = new Ext.Button({
text: 'Agregar',
disabled : true,
handler: function() {
            if (!this.actions) {
                this.actions = new Ext.ActionSheet({
                    items: [
					{
                        text : 'Agregar',
						scope : this,
                        handler: function() {
							var activelist = lista.getActiveItem();
							record = activelist.getSelectedRecords()[0];
							agregaingrediente(record.get('id'));
							if (!this.popup) {
							this.popup = new Ext.Panel({
							floating: true,
							modal: true,
							centered: true,
							width: 300,
							height: 200,
							styleHtmlContent: true,
							scroll: 'vertical',
							html: '<p>Se ha agregado el ingrediente a tu refri, ahora podras tener mas recetas.</p>',
							dockedItems: [{
								dock: 'top',
								xtype: 'toolbar',
								title: 'Agregado '
										}]
													});
											}
							this.popup.show('pop');
						this.actions.hide();
						}
						/*handler : function(){
							//////
							editPnl.show();
							this.actions.hide();							
							//editPnl.dockedItems.getAt(0).setTitle( "0000000000uyuyuyyyyy");
							var activelist = lista.getActiveItem();
							record = activelist.getSelectedRecords()[0];
							txtFld.setValue(record.get('id'));
							
							//ultimoboton.setText( Ext.util.Format.format('<a href="{0}">agregar</a>', "getelementsbyid.php?"+txtFld.getValue()));
						    /////
                        }*/
                    },
					{
                        text : 'Cancelar',
                        ui: 'decline',
                        scope : this,
                        handler : function(){
                            this.actions.hide();
                        }
                    }
					]
                });
            }
            this.actions.show();
			txtFld.setValue('otracosa');
        }






/*	editPnl.show();
	//editPnl.dockedItems.getAt(0).setTitle( "0000000000uyuyuyyyyy");
	var activelist = lista.getActiveItem();
	record = activelist.getSelectedRecords()[0];
	txtFld.setValue(record.get('id'));*/
				

});
	//listado donde estan todos los ingredientes clasificados
var lista = new Ext.NestedList({ //lista que tiene boton de agregar
plugins: [new Ext.LeafSelectedPlugin()],
title: 'Ingredientes',
store: datos,
toolbar: {
items: [	{xtype: 'spacer'},
			{text: '+',
			handler: cargarrecetas,
			 ui  : 'small'
			},
		agregar
		]
}
});
/****************************************************
tab's principales donde esta montada la aplicacion
******************************************************/
        tabs = new Ext.TabPanel({
            fullscreen: true,
            dockedItems: [{xtype:'toolbar', title:'Y QUE COCINAMOS??'}],
            tabBar: {
                ui: 'light',
                layout: {
                    pack: 'center'
                }
            },
           items: [
    loginpanel, //aqui tiene que ir el form
	lista,// lista 2.0
	///// nuevo para listado de refri
	{ //el listado de la refri
	title: 'Refri',
        layout: Ext.is.Phone ? 'fit' : {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        cls: 'demo-list',
        items: [{
            width: Ext.is.Phone ? undefined : 300,
            height: Ext.is.Phone ? undefined : 500,
            xtype: 'list',
            onItemDisclosure: function(record, btn, index) {
                //Ext.Msg.alert(record.get('nombre')+' '+record.get('id'), 'Desea eliminar ' + record.get('nombre')+ ' de su Refri?', elimina(record.get('id'))); //agregar la funcion que elimine el ingrediente de ese usuario
				//Ext.Msg.confirm("Eliminar "+record.get('nombre'), "Estas seguro que ya no quieres este ingrediente en tu refri?", Ext.emptyFn);
				Ext.Msg.confirm("Eliminar "+record.get('nombre'), "Estas seguro que ya no quieres este ingrediente en tu refri?", function(btn){

if (btn == 'yes') {
elimina(record.get('id'));
}
else{

}

});
			},
            store: listadorefri, //getRange(0, 9),
            itemTpl: '<div class="contact"><strong>{nombre}</strong></div>'
        }]
	
	
	
	},
	///////
	recetas	// aqui se deberian cargar 
	
]
        });
		
	//para acceder a un elemento de una variable	
    gallery = tabs.items.getAt(1);
	//habilita y deshabilita el boton de agregar 
lista.on('leafselected', function(enabled) {
    agregar.setDisabled(!enabled);
});
	
	}
});