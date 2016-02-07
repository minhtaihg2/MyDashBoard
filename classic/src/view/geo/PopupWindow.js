Ext.define('Admin.view.geo.PopupWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.popup-window',

    viewModel: {
        type: "geo-popup"
    },

    cls: 'geoext-popup-window',
    width: 320,
    height: 280,
    closeAction : 'hide',
    closable: true,
    resizable: true,
    autoShow: false,
    titleAlign: 'center',
    headerPosition: 'bottom',
    frameHeader: false,
    title: '{title}',
    layout: 'fit',
    items: [{
        xtype: 'grid',
        bind: {
            store: '{gfinfo}'
        },
        viewConfig: {
            emptyText: 'No data available'
        },
        columns: [{
            text: 'id',
            dataIndex: 'id',
            width: 80
        }, {
            text: 'geometry_name',
            dataIndex: 'geometry_name',
            width: 140
        }, {
            text: 'property',
            dataIndex: 'properties',
            width: 140
        }]
    }]
});
