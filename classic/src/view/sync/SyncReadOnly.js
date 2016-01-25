Ext.define('Admin.view.sync.SyncReadOnly', {
    extend: 'Admin.view.sync.SyncBase',
    xtype: 'sync-readonly',

    initComponent: function(){
        var me = this;
        console.log('Admin.view.sync.SyncReadOnly initComponent');
        var grid = me.getSensorGrid();
        //var grid = me.items[0];
        Ext.apply(grid, {
            //reference: 'sensorGridReadOnly',
        });
        me.callParent(arguments);
    }
});
