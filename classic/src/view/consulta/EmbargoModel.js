Ext.define('Admin.view.consulta.EmbargoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.embargo',

    stores: {
        embargo: {
            model: 'consulta.Embargo',
            autoLoad: true,
            autoSync: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 20
        }
    }

});
