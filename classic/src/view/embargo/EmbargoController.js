Ext.define('Admin.view.embargo.EmbargoController', {
    extend: 'Ext.app.ViewController',

    requires: ['Admin.model.embargo.Embargo'],

    alias: 'controller.embargo',

    init: function() {
        var me = this,
            embargoStore = me.getViewModel().getStore('embargo');
        embargoStore.on('load', function (store) {
            console.log('store embargo loaded: ' + store.count() + ' registos lidos');
            console.log();
        });

        embargoStore.proxy.addListener("exception", function (proxy, response, operation, eOpts) {
            console.log(response);
            var title = 'Error', body = 'Error reading store embargos';
            if (response.message.text)
                title = response.message.text;
            if (response.message.detail)
                body = response.message.detail;
            Ext.Msg.show({
                title: title,
                msg: body,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }, this);

        me.callParent(arguments);
    }

});