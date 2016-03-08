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
        responsiveCls: 'big-100' //,
        //title: 'Plantas de localização'
    }, {
        xtype: 'grid',
        reference: 'pedidoGrid',
        responsiveCls: 'big-100',
        height: 500,
        //flex: 1,
        dockedItems: [{
            xtype: 'pagingtoolbar',
            bind: {
                store: '{pedido}'
            },
            dock: 'bottom',
            displayInfo: true
        }],

        tbar: [ '->', {
            text: 'Recuperar desenho',
            iconCls: 'x-fa fa-pencil-square-o ',
            bind: {
                disabled: '{!pedidoGrid.selection}'
            },
            handler: 'onLoadDrawClick'
        }, {
            text: 'Descarregar novamente',
            iconCls: 'x-fa fa-download',
            bind: {
                disabled: '{!pedidoGrid.selection}'
            },
            handler: 'onReDownloadClick'
        }],

        title: 'Pedidos',
        bind: {
            store: '{pedido}'
        },
        viewConfig: {
            emptyText: 'No data available'
        },
        columns: [{
            text: 'Pedido',
            dataIndex: 'gid',
            width: 120
        }, {
            text: 'Documento',
            dataIndex: 'pdf',
            flex: 1
        }, {
            // https://docs.sencha.com/extjs/6.0/components/grids.html
            xtype: 'datecolumn',
            format: 'Y-m-d H:i:s',
            width: 150,
            text: 'Date',
            dataIndex: 'datahora'
        }],
        selType: 'rowmodel',
        selModel: {
            allowDeselect: true
        }
    }]

});
