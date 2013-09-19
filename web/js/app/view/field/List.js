Ext.define('Regio.view.field.List' ,{

	requires: [
		'Ext.grid.plugin.CellEditing',
		'Ext.form.*',
		'Ext.tip.*',
		'Ext.selection.CellModel',
		'Ext.selection.CheckboxModel',
		'Ext.grid.plugin.RowEditing',
		'Ext.menu.Menu'
	],
	extend: 'Ext.grid.Panel',
	
    alias: 'widget.fieldlist',
	
	height:'400px',
	autoHeight:false,
	xtype: 'cell-editing',
	store:'Fields',
	loadMask:true,
	stateful: true,
	
    title: 'Active connections',
	
	dockedItems: [{
			dock: 'bottom',
			xtype:'pagingtoolbar',
            store: 'Fields',
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display"
        }],
	
	listeners: {
		'render': function(grid){
			var view = grid.getView();    // Capture the grid's view.
			grid.tip = Ext.create('Ext.tip.ToolTip', {
				target: view.el,          // The overall target element.
				delegate: view.itemSelector, // Each grid row causes its own seperate show and hide.
				trackMouse: true,         // Moving within the row should not hide the tip.
				renderTo: Ext.getBody()
			})
		}
	},
	// appends edit form window 

    initComponent: function() {
		Ext.apply(this, {
            plugins: [
				new Ext.grid.plugin.RowEditing({clicksToEdit: 1})
		]});
		
		// bottom bar actions
		var items = [];
		// define checkbox selection model (first column for selecting records)

		this.columns = [
			{
				header: 'IP adress',
				tooltip: 'current active IP address',
				dataIndex: 'ipAddress',
				css: 'text-align: center;',
				sortable:true,
				width: 100//,
			},
			// {
				// header: 'Browser',
				// tooltip: 'current active browser',
				// dataIndex: 'requestBrowser',
				// css: 'text-align: center;',
				// sortable:true,
				// width: 500//,
			// },
			{
				header: 'Date visited',
				tooltip: 'date visited',
				dataIndex: 'dateCreated',
				id:'dateCreated',
				css: 'text-align: right;',
				width: 200,
				sortable:true
			}, 
			{
				header: 'Last activity',
				tooltip: 'Last activity',
				dataIndex: 'lastActivity',
				id:'lastActivity',
				css: 'text-align: right;',
				width: 200,
				sortable:true
			}, 
			{
				header: 'Comment',
				tooltip: 'Comment',
				dataIndex: 'customComment',
				width: 400,
				sortable:true,
				editor: {
					xtype: 'textfield',
					allowBlank: true,
					minValue: 1,
					maxValue: 150000
				}
			}]

        this.callParent(arguments);
    }
});