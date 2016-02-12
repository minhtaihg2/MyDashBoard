Ext.define('Admin.view.plantas.Plantas', {
    extend: 'Ext.container.Container',
    xtype: 'plantas',

    controller: 'plantas',
    viewModel: {
        type: 'plantas'
    },

    layout: 'responsivecolumn',

    items: [{
        xtype: 'fullmap-plantas',
        geoExtViewId: 40,
        responsiveCls: 'big-100',
        title: 'Plantas de localização'
    }]

});
