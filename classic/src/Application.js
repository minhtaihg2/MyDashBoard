Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Admin',

    requires:[
        'Ext.direct.*', 'Ext.data.proxy.Direct'
    ],

    defaultToken : 'dashboard',

    //controllers: [
        // TODO - Add Global View Controllers here
    //],

    init: function() {
        console.log('Admin.Application init()');
        Ext.enableAriaButtons = false;
    },

    //https://sencha.guru/2015/09/22/loading-ext-direct-api/
    // pull request to https://github.com/jurisv/extdirect.examples/issues
    launch: function () {
        var me = this;
        Ext.state.Manager.setProvider(Ext.create('Ext.state.LocalStorageProvider'));
        // The 'directapi' is called from app.json
        console.log('Admin.Application launch()');

        // tradução da aplicação...
        // http://www.enovision.net/how-to-add-missing-extjs-6-locale-properties-in-your-application/

        var ns = Server.API;
        if (ns) {
            if (ns.error) {
                Ext.Msg.alert('Error', ns.error.message);
            } else {
                Ext.direct.Manager.addProvider(ns);
                this.setMainView('Admin.view.main.Viewport');
                Server.DXLogin.alive({}, function(result, event) {
                    //<debug>
                    console.log('------------------- ALIVE --------------------');
                    //</debug>
                    // console.debug(result);
                    // console.debug(event);
                    if (result.success) {
                        // We have a valid user data
                        Ext.Msg.alert('Successful login: session was recovered', Ext.encode(result));
                        //GeoPublic.LoggedInUser = Ext.create('GeoPublic.model.Utilizador', result.data[0]);
                        //GeoPublic.LoggedInUser["login"] = "local";
                        //// console.log(GeoPublic.LoggedInUser);
                        //me.fireEvent('loginComSucesso', result.data[0]);
                        Ext.GlobalEvents.fireEvent('loginComSucesso', result.data[0]);
                    } else {
                        //Ext.Msg.alert('No session available', Ext.encode(result));
                        Ext.Msg.alert('No session available', result.message.text);
                        Ext.GlobalEvents.fireEvent('logoutComSucesso');
                    }
                });
            }
        }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
