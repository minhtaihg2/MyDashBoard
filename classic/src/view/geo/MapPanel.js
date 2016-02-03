Ext.define("Admin.view.geo.MapPanel", {
    extend: "Ext.panel.Panel",
    alias: 'widget.geo-map',

    requires: [
        "Admin.view.geo.MapPanelController",
        "Admin.view.geo.MapPanelModel"
    ],

    layout: 'responsivecolumn',

    controller: "geo-map",
    viewModel: {
        type: "geo-map"
    },

    listeners: {
        beforedeactivate: 'onBeforeDeactivate'
    },

    initComponent: function () {
        var me = this;
        console.log('Admin.view.geo.MapPanel initComponent');
        console.log(me.initialConfig);
        console.log(me.initialConfig.routeId);

        var res = me.initialConfig.routeId.match(/\d+$/);
        if (res && res[0] && parseInt(res[0]) > 0) {
            me.geoExtViewId = parseInt(res[0]);
            console.log(me.geoExtViewId);
        } else {
            me.geoExtViewId = null;
        }

        me.items = [{
            xtype: 'geo-mapcanvas',
            geoExtViewId: me.geoExtViewId,
            responsiveCls: 'big-100',
            height: 400 // good to know
        }, {
            xtype: 'geo-mapgrid',
            reference: 'geo-mapgrid',
            responsiveCls: 'big-60'
        }, {
            xtype: 'geo-tree',
            //html: 'Legend',
            responsiveCls: 'big-40'
        }];

        me.callParent();
    }
});
