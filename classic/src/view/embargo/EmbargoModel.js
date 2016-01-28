Ext.define('Admin.view.embargo.EmbargoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.embargo',

    // TODO - Add view data as needed or remove if not needed

    data: {
        title: {
            sensor: 'Embargo'
        }
    },

    stores: {
        embargo: {
            model: 'embargo.Embargo',
            autoLoad: true,
            autoSync: true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 20
        }
    }

});
