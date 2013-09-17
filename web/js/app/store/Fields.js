Ext.define('Regio.store.Fields', {
    extend: 'Ext.data.Store',
	
	// model that describes fieldlist to request
    model: 'Regio.model.Field',
	autoCommit :true,
    autoLoad: true,
	autoDestroy: true,
	autoSync:true,
    proxy: {
        type: 'rest',
        url: 'index.php/getActiveConnections',
		//update: 'index.php/setConnectionData',
		api:{
			read: 'index.php/getActiveConnections',
			write: 'index.php/setConnectionData',
		},
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
		writer:{
		    type: 'json',
            root: 'data',
            successProperty: 'success',
			writeAllFields : false,  //just send changed fields
            allowSingle :true	
		},
	
    },
	listeners : {
        write: function(store, operation, opts){
            console.log('wrote!');
            //workaround to sync up store records with just completed operation
            Ext.each(operation.records, function(record){
                if (record.dirty) {
                    record.commit();
                }
            });
        },
        update:function(){
            console.log('tasks store updated');
        }
    }
});