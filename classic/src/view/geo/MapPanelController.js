Ext.define('Admin.view.geo.MapPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.geo-map',

    onBeforeDeactivate: function (view) {
        //<debug>
        console.log('onBeforeDeactivate MapPanel');
        //</debug>
        var me = this;

        var windows = Ext.ComponentQuery.query('popup-window');
        console.log(windows);
        windows.forEach(function (element, index, array) {
            element.destroy();
        });

    }

});
