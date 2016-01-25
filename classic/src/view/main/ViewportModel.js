Ext.define('Admin.view.main.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewport',

    requires: [
        'Ext.data.TreeStore'
    ],

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
    },
    stores: {
        //https://www.sencha.com/forum/showthread.php?293227-Binding-external-stores-using-a-viewmodel-Type-is-alias-and-alias-is-type
        navigationTree: {
            type: 'tree',
            root: {
                expanded: true    // the same as autoLoad: true
            },
            fields: [
                {
                    name: 'text'
                }
            ],
            proxy: {
                type: 'direct',
                directFn: 'Server.Users.User.readNavTree',
                extraParams: {
                    userid : 8192
                }
            }
        }
    }

});
