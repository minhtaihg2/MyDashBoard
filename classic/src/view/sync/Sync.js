Ext.define('Admin.view.sync.Sync', {
    extend: 'Ext.container.Container',
    xtype: 'sync',
    controller: 'sync',
    viewModel: {
        type: 'sync'
    },
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    //margin: '20 0 0 20',

    items: [{
        xtype: 'grid',
        reference: 'sensorGrid',
        //flex: 1,
        cls: 'shadow-panel',

        width: '30%',
        minWidth: 180,
        maxWidth: 360,

        margin: 10,

        tbar: [{
            text: 'Refresh',
            //bind: {
            //    text: 'Refresh {sensorGrid.selection.address}'
            //},
            handler: 'onSensorRefreshClick'
        }, {
            text: 'Clear selection',
            //bind: {
            //    text: 'Refresh {sensorGrid.selection.address}'
            //},
            handler: 'onSensorClearSelectionClick'
        }],
        bind: {
            title: '{title.sensor}',
            store: '{sensor}'
        },
        viewConfig: {
            emptyText: 'No data available'
        },
        columns: [{
            text: 'Id',
            dataIndex: 'sensorid',
            width: 40
        }, {
            text: 'Address',
            dataIndex: 'address',
            width: 80
        }, {
            text: 'Location',
            dataIndex: 'location',
            flex: 1
        }, {
            xtype: 'datecolumn',
            width: 120,
            text: 'Date',
            dataIndex: 'installdate'
        }, {
            text: 'Type',
            dataIndex: 'sensortype',
            width: 20
        }]
    }, {
        xtype: 'tabpanel',
        cls: 'shadow-panel',

        margin: 10,
        flex: 1,
        items: [{
            xtype: 'grid',
            flex: 1,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                bind: {
                    store: '{temperature}'
                },
                dock: 'top',
                displayInfo: true
            }],
            title: 'Temperature',
            bind: {
                title: '{title.temperature} {sensorGrid.selection.sensorid}@{sensorGrid.selection.address}',
                store: '{temperature}'
            },
            viewConfig: {
                emptyText: 'No data available'
            },
            columns: [{
                text: 'Id',
                dataIndex: 'sensorid',
                width: 40
            }, {
                text: 'Address',
                dataIndex: 'address',
                width: 80
            }, {
                xtype: 'datecolumn',
                width: 120,
                text: 'Date',
                dataIndex: 'created'
            }, {
                text: 'Value',
                dataIndex: 'value',
                width: 120
            }]
        }, {
            xtype: 'grid',
            flex: 1,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                bind: {
                    store: '{calibration}'
                },
                dock: 'top',
                displayInfo: true
            }],
            title: 'Calibration',
            bind: {
                title: '{title.calibration} {sensorGrid.selection.sensorid}@{sensorGrid.selection.address}',
                store: '{calibration}'
            },
            viewConfig: {
                emptyText: 'No calibration data available',
                deferEmptyText : false
            },
            columns: [{
                text: 'Id',
                dataIndex: 'id',
                width: 40
            },{
                text: 'Id',
                dataIndex: 'sensorid',
                width: 40
            }, {
                text: 'Address',
                dataIndex: 'address',
                width: 80
            }, {
                xtype: 'datecolumn',
                width: 120,
                text: 'Date',
                dataIndex: 'created'
            }, {
                text: 'A (old)',
                dataIndex: 'cal_a_old',
                width: 80
            }, {
                text: 'B (old)',
                dataIndex: 'cal_b_old',
                width: 80
            }, {
                text: 'A (new)',
                dataIndex: 'cal_a_new',
                width: 80
            }, {
                text: 'B (new)',
                dataIndex: 'cal_b_new',
                width: 80
            }]
        }]
    }]
});
