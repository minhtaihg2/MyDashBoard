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
        var remember = formpanel.getViewModel().get('persist');

        //<debug>
        console.log('Vai tentar com o login com ' + email + ' e a password = ' + pass + ' codificada = ' + sha1);
        //</debug>
        Server.DXLogin.authenticate({
            email: email,
            password: sha1,
            remember: remember
        }, function (result, event) {
            // result == event.result
            console.debug(result);
            // console.debug(event);
            if (result.success) {
                // We have a valid user data
                Ext.Msg.alert('Successful login', Ext.encode(result));
                //console.log(result.data[0]);
                var viewModel = me.getViewModel();
                // global: ViewportModel
                viewModel.set('currentUser', Ext.create('Admin.model.Utilizador', result.data[0]));
                // untested
                viewModel.set('current.user.login', "local");

                //console.log(me.getViewModel().getData());
                // local: AuthenticationModel
                // local: was already set by the form
                //viewModel.set('userid', result.data[0].email);
                viewModel.set('fullName', result.data[0].nome);
                //viewModel.set('password', result.data[0].password);
                viewModel.set('email', result.data[0].email);

                /*
                 ativo: true
                 codpostal: "4715-281"
                 datacriacao: "2014-04-12T22:14:17.698Z"
                 datamodificacao: "2014-11-05T19:07:40.388Z"
                 despostal: "Braga"
                 dicofre: null
                 email: "jorgegustavo@sapo.pt"
                 emailconfirmacao: true
                 fotografia: "uploaded_images/profiles/32x32/31_d20496d979674f34ee15943489a2ca91.jpg"
                 id: 31
                 idgrupo: 1
                 latitude: 5178696
                 localidade: ""
                 login: null
                 longitude: -950770
                 masculino: true
                 morada: ""
                 nic: "8432271"
                 nif: "196628865"
                 nome: "Gustavo Bastos"
                 observacoes: null
                 password: "93a82c2918a591d2de3144585e5666b7cf717079"
                 pessoacoletiva: null
                 ponto: "0101000020B30E000000000000E4032DC10000000052C15341"
                 preferencias: null
                 telefone: ""
                 telemovel: "910333888"
                 token: null
                 ultimologin: null
                 */

                //GeoPublic.LoggedInUser = Ext.create('GeoPublic.model.Utilizador', result.data[0]);
                //GeoPublic.LoggedInUser["login"] = "local";
                /*
                 * se remember, altero o cookie para sobreviver mais tempo
                 * se o cookie sobreviver, ele será loginado na próxima vez
                 * não preciso de usar o local storage ou qualquer outro cookie
                 */
                // login.close(); // passou para o evento
                //me.application.fireEvent('loginComSucesso');
                me.redirectTo("dashboard");
            } else {
                Ext.Msg.alert('Error starting session'.translate(), 'Invalid user or password'.translate()); // Ext.encode(result)
            }
        });
    },

    onLoginAsButton: function (button, e, eOpts) {
        this.redirectTo("authentication.login");
    },

    onNewAccount: function (button, e, eOpts) {
        this.redirectTo("authentication.register");
    },

    onSignupClick: function (button, e, eOpts) {
        this.redirectTo("dashboard");
    },

    onResetClick: function (button, e, eOpts) {
        this.redirectTo("dashboard");
    }
});
