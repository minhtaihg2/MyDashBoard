Ext.define('Admin.model.embargo.Embargo', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'n_auto_embargo',
        type: 'string'
    }, {
        name: 'nome_notificado',
        type: 'string'
    }, {
        name: 'morada',
        type: 'string'
    }, {
        name: 'data_auto',
        type: 'date',
        dateWriteFormat: 'c' // ISO 8601 format
    }],
    proxy: {
        type: 'direct',
        api: {
            read: 'Server.Urbanismo.SQLServer.readEmbargos'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message'
        }
    }
});