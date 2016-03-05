Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin: function (button, e) {
        console.log('onFaceBookLogin');
        this.redirectTo("dashboard");
    },

    onLoginButton: function (button, e, eOpts) {
        var me = this; // ViewController
        console.log('onLoginButton');

        var formpanel = button.up('authdialog');
        var email = formpanel.getViewModel().get('userid');
        var pass = formpanel.getViewModel().get('password');
        var sha1 = CryptoJS.SHA1(pass).toString();
        var md5 = CryptoJS.MD5(pass).toString();
        var remember = formpanel.getViewModel().get('persist');

        Server.DXLogin.authenticate({
            email: email,
            password: sha1,
            passwordold: md5,
            remember: remember
        }, function (result, event) {
            if (result) {
                // event.type : "rpc"
                if (result.success) {
                    me.fireEvent('loginComSucesso', result.data[0]);
                    var viewModel = me.getViewModel();
                    // TODO: is this necessary?
                    viewModel.set('fullName', result.data[0].nome);
                    viewModel.set('email', result.data[0].email);
                } else {
                    Ext.Msg.alert('Error starting session'.translate(), 'Invalid user or password'.translate()); // Ext.encode(result)
                }
            } else {
                // event.type: "exception"
                Ext.Msg.alert('Problema na autenticação', 'Neste momento, não foi possível verificar o utilizador.<br/>Por favor tente mais tarde.');
            }
            me.redirectTo("dashboard");
        });
    },

    onLoginAsButton: function (button, e, eOpts) {
        this.redirectTo("authentication.login");
    },

    onNewAccount: function (button, e, eOpts) {
        this.redirectTo("authentication.register");
    },

    onSignupClick: function (button, e, options) {
        var me = this;
        //<debug>
        console.log('registo submit');
        //</debug>

        var formpanel = button.up('authdialog');
        var name = formpanel.getViewModel().get('fullName');
        var email = formpanel.getViewModel().get('email');
        var pass = formpanel.getViewModel().get('password');
        var sha1 = CryptoJS.SHA1(pass).toString();

        //if (formPanel.getForm().isValid())

        //<debug>
        console.log('Vai tentar com o registo com ' + email + ' e a password = ' + pass + ' codificada = ' + sha1);
        //</debug>
        Server.DXLogin.registration({
            email: email,
            name: name,
            password: sha1
        }, function (result, event) {
            if (result) {
                // event.type : "rpc"
                if (result.success) {
                    Ext.Msg.alert('Processo de registo iniciado', 'Foi enviado um email para ' + email + '<br/>' + 'Siga as indicações enviadas.' + '<br/>' + 'Só pode entrar, depois de confirmado o endereço de email.');
                } else {
                    Ext.Msg.alert('Problema no registo', result.message);
                }
            } else {
                // event.type: "exception"
                Ext.Msg.alert('Problema no registo', 'Neste momento, não foi possível fazer o registo de um novo utilizador.<br/>Por favor tente mais tarde.');
            }
            me.redirectTo("dashboard");
        });
    },

    onResetClick: function (button, e, eOpts) {
        var me = this;
        //<debug>
        console.log('onResetClick');
        //</debug>

        var formpanel = button.up('authdialog');
        var email = formpanel.getViewModel().get('email');

        Server.DXLogin.reset({
            email: email
        }, function (result, event) {
            if (result) {
                // event.type : "rpc"
                if (result.success) {
                    Ext.Msg.alert('Reposição da senha', 'Foi enviado um email para ' + email + '<br/>' + 'Siga as indicações enviadas.');
                } else {
                    Ext.Msg.alert('Pedido sem efeito', result.message);
                    //Ext.Msg.alert('Pedido sem efeito', 'O email ' + email + ' não corresponde a nenhum utilizador registado.');
                    //Ext.Msg.alert('Pedido sem efeito', 'Falhou o envio para o endereço ' + email + '.');
                }
            } else {
                // event.type: "exception"
                Ext.Msg.alert('Problema ao repor a senha', 'Neste momento, não foi possível verificar se o utilizador ' + email + ' existe.<br/>Por favor tente mais tarde.');
            }
            me.redirectTo("dashboard");
        });

    }
});
