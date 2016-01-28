Ext.define('Admin.view.embargo.Embargo', {
    extend: 'Ext.container.Container',
    alias: 'widget.embargo',
    requires: ['Ext.grid.filters.Filters'],
    controller: 'embargo',
    viewModel: {
        type: 'embargo'
    },

    items: [{
        xtype: 'grid',
        reference: 'embargoGrid',
        //flex: 1,
        cls: 'shadow-panel',
        margin: 20,
        //height: 400,
        //margin: 10,
        bind: {
            //title: '{title.sensor}',
            //title: '{user.name}',
            store: '{embargo}'
        },
        // para preservar as propriedades da grid entre page loads
        // hum... não está a funcionar
        stateId: 'embargoGrid',
        plugins: 'gridfilters',
        dockedItems: [{
            xtype: 'pagingtoolbar',
            bind: {
                store: '{embargo}'
            },
            dock: 'top',
            displayInfo: true
        }],
        viewConfig: {
            emptyText: 'No data available'
        },
        columns: [{
            text: 'Auto',
            dataIndex: 'n_auto_embargo',
            width: 80,
            filter: {
                // required configs
                type: 'string'
            },
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            text: 'Nome',
            dataIndex: 'nome_notificado',
            width: 240,
            filter: {
                // required configs
                type: 'string'
            },
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            text: 'Morada',
            dataIndex: 'morada',
            flex: 1,
            filter: {
                // required configs
                type: 'string'
            },
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            // https://docs.sencha.com/extjs/6.0/components/grids.html
            xtype: 'datecolumn',
            //format: 'Y-m-d H:i:s',
            format: 'Y-m-d',
            width: 150,
            text: 'Data do auto',
            dataIndex: 'data_auto',
            filter: {
                type: 'date'
            },
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d H:i:s' // format to show the date
                // defined in the model: dateWriteFormat: 'c'
            }
        }],
        selType: 'rowmodel'
    }],
    getEmbargoGrid: function() {
        // embargoGrid
        return this.items[0];
    }
});
