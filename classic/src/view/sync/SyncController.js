Ext.define('Admin.view.sync.SyncController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.sync',

    onSensorRefreshClick: function(button) {
        var sensor = this.getViewModel().get('sensorGrid.selection');
        if (sensor != null) {
            // There is a selection
            console.log(sensor);
        }
        var grid = this.lookupReference('sensorGrid');
        grid.store.load();
    },

    onSensorClearSelectionClick: function(button) {
        var grid = this.lookupReference('sensorGrid');
        var sm = grid.getSelectionModel();
        sm.deselectAll();
    },

    onSetViewportViewModel: function(button) {
        var me = this,
            viewModel = me.getViewModel(),
            vmData = viewModel.getData();
        console.log(viewModel.get('user.name'));

        Ext.Msg.prompt('Nude de nome', 'Novo nome', function (action, value) {
            if (action === 'ok') {
                viewModel.set('user.name', value);
                console.log(viewModel.get('user.name'));
            }
        });

    }

});
