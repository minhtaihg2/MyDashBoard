Ext.define('Admin.view.main.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewport',

    data: {
        currentView: null,
        current: {
            user: null
        }
    },
    formulas: {
        sessionLabel: {
            get: function(get) {
                var n = get('current.user.nome');
                console.log('-----');
                console.log(n);
                console.log('-----');
                return n ? n : 'Login';
            },
            set: function(value) {
                this.set('current.user.nome', value);
            }
        }
    }

});
