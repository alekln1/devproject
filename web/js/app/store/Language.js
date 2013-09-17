Ext.define('Regio.store.States', {
    extend: 'Ext.data.Store',
	
	// model that describes fieldlist to request
    model: 'Regio.model.Combo',
    autoLoad: true,
	autoDestroy: true,
    proxy: {
        type: 'ajax',
		url: 'data.php?controller=myfields&a=getMessages',
		update: '',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});