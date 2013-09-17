/*
* TODO:
* Selected fields list button and list as a popup modal dialog
* Selected fields single change update (update several records by one combo change)
* import data match selector
* export data match selector / and data selector
*/
Ext.onReady(function() {
	
	var stores =  ['Fields'];
	
	Ext.application({
		requires: [
			'Ext.LoadMask',
			'Ext.container.Viewport'//,
			//'Regio.view.field.UserSelection'
		],
	   
		// namespace name
		name: 'Regio',
		// application folder
		appFolder: 'js/app',
		
		controllers:['Fields'],
		stores: stores,
		models: ['Field'],
		
		// client selection
		selection: null,
		
		launch: function() {
			
			Ext.getBody().mask('Loading...', 'x-mask-loading', false);
			
			//this.selection = new Regio.view.fields.UserSelection();
		//	app.stores = ['Fields', 'States', 'UseTypes', 'UseRights'];
			
			Ext.create('Ext.container.Viewport', {
				layout: 'fit',
				items: {
					xtype: 'fieldlist'
				}
			});
			
			Ext.getBody().unmask();
		}
	});
});
