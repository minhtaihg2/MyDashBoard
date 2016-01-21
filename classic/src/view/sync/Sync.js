Ext.define('Admin.view.sync.Sync', {
    extend: 'Ext.container.Container',
    xtype: 'sync',

    controller: 'sync',
    viewModel: {
        type: 'sync'
    },

    /*
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    */

    // margin: '20 0 0 20',

    items: [{
        xtype: 'grid',
        reference: 'sensorGrid',
        //flex: 1,
        cls: 'shadow-panel',

        //width: '40%',
        //minWidth: 180,
        //maxWidth: 420,

        height: 400,
        margin: 10,

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
        }],
        bind: {
            //title: '{title.sensor}',
            title: '{user.name}',
            store: '{sensor}'
        },
        viewConfig: {
            emptyText: 'No data available'
        },
        columns: [{
            text: 'Id',
            dataIndex: 'sensorid',
            width: 40,
            editor : {
                xtype : 'textfield',
                allowBlank : false
            }
        }, {
            text: 'Address',
            dataIndex: 'address',
            width: 80,
            editor : {
                xtype : 'textfield',
                allowBlank : false
            }
        }, {
            text: 'Location',
            dataIndex: 'location',
            flex: 1,
            editor : {
                xtype : 'textfield',
                allowBlank : false
            }
        }, {
            // https://docs.sencha.com/extjs/6.0/components/grids.html
            xtype: 'datecolumn',
            format: 'Y-m-d H:i:s',
            width: 150,
            text: 'Date',
            dataIndex: 'installdate',
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d H:i:s' // format to show the date
                // defined in the model: dateWriteFormat: 'c'
            }
        }, {
            text: 'Type',
            dataIndex: 'sensortype',
            width: 20,
            editor : {
                xtype : 'textfield',
                allowBlank : false
            }
        }, {
            text: 'Key',
            dataIndex: 'cal1',
            width: 80,
            disabled: true
        }],
        selType: 'rowmodel',
        plugins: [{
            ptype: 'rowediting',
            pluginId: 'sensorGridRowEditing',
            clicksToEdit: 2
        }]
    }, {
        xtype: 'tabpanel',
        cls: 'shadow-panel',

        margin: 10,
        flex: 1,
        items: [{
            xtype: 'grid',
            reference: 'temperatureGrid',
            flex: 1,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                bind: {
                    store: '{temperature}'
                },
                dock: 'top',
                displayInfo: true
            }],
            tbar: [{
                text: 'Add',
                iconCls: 'x-fa fa-pencil',
                handler: 'onTemperatureAddClick'
            }, {
                text: 'Delete',
                iconCls: 'x-fa fa-remove',
                handler: 'onTemperatureRemoveClick'
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
                // https://docs.sencha.com/extjs/6.0/components/grids.html
                xtype: 'datecolumn',
                format: 'Y-m-d H:i:s',
                width: 150,
                text: 'Date',
                dataIndex: 'created',
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d H:i:s' // format to show the date
                    // defined in the model: dateWriteFormat: 'c'
                }
            }, {
                text: 'Value',
                dataIndex: 'value',
                width: 120
            }],
            selType: 'rowmodel',
            plugins: [{
                ptype: 'rowediting',
                pluginId: 'sensorTemperatureRowEditing',
                clicksToEdit: 2
            }]
        }, {
            xtype: 'grid',
            reference: 'calibrationGrid',
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
                deferEmptyText: false
            },
            columns: [{
                text: 'Id',
                dataIndex: 'id',
                width: 40
            }, {
                text: 'Id',
                dataIndex: 'sensorid',
                width: 40
            }, {
                text: 'Address',
                dataIndex: 'address',
                width: 80
            }, {
                // https://docs.sencha.com/extjs/6.0/components/grids.html
                xtype: 'datecolumn',
                format: 'Y-m-d H:i:s',
                width: 150,
                text: 'Date',
                dataIndex: 'created',
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d H:i:s' // format to show the date
                    // defined in the model: dateWriteFormat: 'c'
                }
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
