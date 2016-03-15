Ext.define('Admin.view.main.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewport',

    requires: [
        'Ext.data.TreeStore'
    ],

    init: function () {
        var me = this;
        console.log('Admin.view.main.ViewportModel.init()');
        me.callParent(arguments);
    },

    data: {
        currentView: null,
        current: {
            user: null
        },
        flagCls: 'english',
        language: 'en'
    },

    formulas: {
        sessionLabel: {
            get: function (get) {
                var n = get('current.user.nome');
                console.log('-----');
                console.log(n);
                console.log('-----');
                return n ? n : 'Login';
            },
            set: function (value) {
                this.set('current.user.nome', value);
            }
        }
    },

    stores: {
        //https://www.sencha.com/forum/showthread.php?293227-Binding-external-stores-using-a-viewmodel-Type-is-alias-and-alias-is-type
        navigationTree: {
            type: 'tree',
            root: {
                // expanded: true    // the same as autoLoad: true
                expanded: false    // the same as autoLoad: false
            },
            fields: [
                {
                    name: 'text',
                    convert: function(v, rec) {
                        return rec.get('text').translate();
                    }
                }
            ],
            proxy: {
                type: 'direct',
                directFn: 'Server.Users.User.readNavTree',
                extraParams: {
                    userid: null
                }
            }
        },
        idioms: {
            fields: ['language', 'name'],
            data : [
                {"language": "pt-PT",   "name":"Português"},
                {"language": "en",      "name":"English"}
                //{"language": "es", "name":"Español"}
            ]
        }
    }

});
