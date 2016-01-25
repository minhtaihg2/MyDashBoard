Ext.define('Admin.view.sync.SyncReadWrite', {
    extend: 'Admin.view.sync.SyncBase',
    xtype: 'sync-readwrite',

    initComponent: function(){
        var me = this;

        //Ext.apply(me, {
        //    cls: me.config.containerColor
        //});

        console.log('Admin.view.sync.SyncReadWrite initComponent');
        console.log(me);
        console.log(me.items);
        console.log(me.items.length);

        var grid = me.getSensorGrid();

        //var grid = me.items[0];
        Ext.apply(grid, {
            //reference: 'sensorGridReadWrite',
            tbar: [{
                text: 'Refresh',
                handler: 'onSensorRefreshClick'
            }, {
                text: 'Add',
                iconCls: 'x-fa fa-pencil',
                handler: 'onSensorAddClick'
            }, {
                text: 'Delete',
                iconCls: 'x-fa fa-remove',
                handler: 'onSensorRemoveClick'
            }, {
                text: 'Clear sel.',
                //bind: {
                //    text: 'Refresh {sensorGrid.selection.address}'
                //},
                handler: 'onSensorClearSelectionClick'
            }, {
                text: 'vm.data',
                handler: 'onSetViewportViewModel'
            }]
        });

        me.callParent(arguments);
    }
});
