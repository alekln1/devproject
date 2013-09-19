Ext.define('Regio.store.Fields', {
    extend: 'Ext.data.Store',
	intervalLoader:null,
	// model that describes fieldlist to request
    model: 'Regio.model.Field',
	autoCommit :true,
    autoLoad: true,
	autoDestroy: true,
	autoSync:true,
    proxy: {
        type: 'rest',
		url:'index.php/connections',
		
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
		// refresh only if has one connection
        load: function(store, records, success) {
			if(records.length == 0 && this.intervalLoader == null){
				var _this = this;
				
				this.intervalLoader = window.setInterval(function(){
					_this.reload();
				}, 5000);
				
			} else if(records.length > 1){
				window.clearInterval(this.intervalLoader);
				this.intervalLoader = null;
			}
			
		},
        write: function(store, operation, opts){
            //workaround to sync up store records with just completed operation
            Ext.each(operation.records, function(record){
                if (record.dirty) {
                    record.commit();
                }
            });
        }
    }
});