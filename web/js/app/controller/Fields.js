Ext.define('Regio.controller.Fields', {
    extend: 'Ext.app.Controller',
	views: [
        'field.List'
    ],
	init: function() {
		
		this.control({
			'viewport > panel': {
				render: this.onGridRendered
			},
			'fieldlist': {
                itemdblclick: this.editItem
            }
			
		});
	},
	// onPanelRendered: function() {
		// console.log('TEST_TEST'.translate());
		// console.log('The panel was rendered');
	// },
	onGridRendered : function(gridView) {
		//console.log('Grid panel was just rendered');
		//create the ToolTip
		
		//this.initFormComponent();
		
		gridView.tip = Ext.create('Ext.tip.ToolTip', {
		
			height:'300px',
			
			width:'400px',
			// The overall target element.
			target: gridView.el,
			// Each grid row causes its own seperate show and hide.
			delegate: gridView.view.cellSelector + '-massiveNr',
			// Moving within the row should not hide the tip.
			trackMouse: true,
			// Render immediately so that tip.body can be referenced prior to the first show.
			renderTo: Ext.getBody(),
			
			listeners: {
				// Change content dynamically depending on which element triggered the show.
				beforeshow: function updateTipBody(tip) {
					
					gridColums = gridView.view.getGridColumns();
					
					column = gridColums[tip.triggerElement.cellIndex];
					//only display the tool tip for name column
					if(column.dataIndex === 'massiveNr'){
						record = gridView.view.getRecord(tip.triggerElement.parentNode);
						tip.setTitle('Alusala - ' + record.get('massiveNr'));
						
						tip.update(record.get('massiveNr'), null, function(){
							//update map;
						});
					}else{
						return false;
					}
				}
			}
		});
	},
	initFormComponent: function(){
	
		this.editForm = new Ext.form.Panel({
						requires: ['Ext.form.field.Text'],
						//renderTo: Ext.getBody(),
						initComponent: function(){
							console.log('init event');
							this.addEvents('create');
							Ext.apply(this, {
								activeRecord: null,
								iconCls: 'icon-user',
								frame: true,
								title: 'User -- All fields are required',
								defaultType: 'textfield',
								bodyPadding: 5,
								fieldDefaults: {
									anchor: '100%',
									labelAlign: 'right'
								},
								items: [{
									fieldLabel: 'Email',
									name: 'email',
									allowBlank: false,
									vtype: 'email'
								}, {
									fieldLabel: 'First',
									name: 'first',
									allowBlank: false
								}, {
									fieldLabel: 'Last',
									name: 'last',
									allowBlank: false
								}],
								dockedItems: [{
									xtype: 'toolbar',
									dock: 'bottom',
									ui: 'footer',
									items: ['->', {
										iconCls: 'icon-save',
										itemId: 'save',
										text: 'Save',
										disabled: true,
										scope: this,
										handler: this.onSave
									}, {
										iconCls: 'icon-user-add',
										text: 'Create',
										scope: this,
										handler: this.onCreate
									}, {
										iconCls: 'icon-reset',
										text: 'Reset',
										scope: this,
										handler: this.onReset
									}]
								}]
							});
							this.callParent();
						},

						setActiveRecord: function(record){
							this.activeRecord = record;
							if (record) {
								this.down('#save').enable();
								this.getForm().loadRecord(record);
							} else {
								this.down('#save').disable();
								this.getForm().reset();
							}
						},

						onSave: function(){
							var active = this.activeRecord,
								form = this.getForm();

							if (!active) {
								return;
							}
							if (form.isValid()) {
								form.updateRecord(active);
								this.onReset();
							}
						},

						onCreate: function(){
							var form = this.getForm();

							if (form.isValid()) {
								this.fireEvent('create', this, form.getValues());
								form.reset();
							}

						},

						onReset: function(){
							this.setActiveRecord(null);
							this.getForm().reset();
						}
			});

	}
	/*editItem: function(grid, record) {
		console.log(record);
		this.editForm.setActiveRecord(record);
		console.log(this.editForm);
		this.editForm.show();console.log('show');
		
        console.log('Double clicked on ' + record.get('name'));
    }*/
});