Ext.define('Admin.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',

    listen: {
        global: {
            loginComSucesso: 'onLoginComSucesso',
            logoutComSucesso: 'onLogoutComSucesso'
        },
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            },
            'authentication': {
                loginComSucesso: 'onLoginComSucesso'
            },
            '*': {
                logoutComSucesso: 'onLogoutComSucesso'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    navigationTreeStoreLoaded: false,

    init: function () {
        var me = this;

        //var navigationTreeStore = Ext.getStore('NavigationTree');
        var navigationTreeStore = me.getViewModel().getStore('navigationTree');

        navigationTreeStore.on('load', function (store) {
            //console.log('navigationTreeStore loaded');
            me.navigationTreeStoreLoaded = true;
            //console.log('this.redirectTo("dashboard");');
            //me.redirectTo("dashboard");
            me.setCurrentView("dashboard");
        });

        me.callParent(arguments);
    },

    onLoginComSucesso: function (user) {
        var me = this;
        console.log('onLoginComSucesso()');
        //console.log(arguments);
        console.log(user);
        var viewModel = me.getViewModel();
        viewModel.set('current.user', Ext.create('Admin.model.Utilizador', user));
        viewModel.set('current.user.login', "local");

        var treelist = this.getReferences().navigationTreeList;
        var estore = viewModel.getStore('navigationTree');

        estore.reload({
            params: {
                userid: viewModel.get('current.user.id')
            }
        });
        treelist.onRootChange(estore.getRoot());
    },

    onLogoutComSucesso: function () {
        var me = this;
        console.log('logoutComSucesso()');
        //console.log(arguments);
        var refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            viewModel = me.getViewModel();

        mainCard.removeAll(true);
        viewModel.set('current.user', null);

        var treelist = this.getReferences().navigationTreeList;
        var estore = viewModel.getStore('navigationTree');

        estore.reload({
            params: {
                userid: null
            }
        });
        treelist.onRootChange(estore.getRoot());

    },

    onLogoutClick: function (button) {
        console.log('onLogoutClick');
        var me = this,
            viewModel = me.getViewModel();
        var id = viewModel.get('current.user.id');
        if (id) {
            Server.DXLogin.deauthenticate({}, function (result, event) {
                if (result.success) {
                    Ext.Msg.alert(result.message);
                    //viewModel.set('current.user', null);

                    //me.application.fireEvent('logoutComSucesso');
                    me.fireEvent('logoutComSucesso');
                } else {
                    Ext.Msg.alert('Erro ao terminar a sessão.', Ext.encode(result));
                }
            });
        } else {
            console.log('Não faz nada...');
        }
    },

    setCurrentView: function (hashTag) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            viewModel = me.getViewModel(),
            vmData = viewModel.getData(),
            //store = navigationList.getStore(),
            store = viewModel.getStore('navigationTree'),
            node = store.findNode('routeId', hashTag),
            view = node ? node.get('extjsview') : null,
            lastView = vmData.currentView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {
            newView = Ext.create('Admin.view.' + (view || 'pages.Error404Window'), {
                hideMode: 'offsets',
                routeId: hashTag
            });
        }

        //console.log('setCurrentView → mainCard');
        //console.log(mainCard);

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        vmData.currentView = newView;
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        //console.log('onNavigationTreeSelectionChange');
        if (node && node.get('extjsview')) {
            //console.log(node);
            //console.log('redirect to: ' + node.get("text") + ' routeId: ' + node.get("routeId"));
            this.redirectTo(node.get("routeId"));
        }
    },

    onClickNewUser: function (button) {
        console.log('onNewUser');
        //console.log(node);
        this.redirectTo('authentication.register'); // authentication.register
    },

    onClickLogin: function (splitbutton) {
        console.log('onClickLogin');
        var me = this;
        var viewModel = me.getViewModel();
        var id = viewModel.get('current.user.id');
        console.log(id);
        if (!id) {
            this.redirectTo('authentication.login'); // authentication.register
        } else {
            console.log('Não faz nada...');
        }
    },

    onBellClick: function (button) {
        console.log('Server.DXLogin.ping');
        Server.DXLogin.ping({}, function (result, event) {
            if (result.success) {
                Ext.Msg.alert(result.message);
            } else {
                Ext.Msg.alert('Erro.', Ext.encode(result));
            }
        });
    },

    onRemoveItemClick: function (button) {
        // https://fiddle.sencha.com/#fiddle/uoc
        console.log('onRemoveItemClick');

        var treelist = this.getReferences().navigationTreeList;
        var estore = treelist.getStore();

        estore.reload({
            params: {userid: 25}
        });
        treelist.onRootChange(estore.getRoot());
    },

    onAddItemClick: function (button) {
        console.log('onAddItemClick');

        var treelist = this.getReferences().navigationTreeList;
        var estore = treelist.getStore();

        estore.load({
            params: {userid: 25, from: 'test2'}
        });

        /*
         var treelist = this.getReferences().navigationTreeList;
         treelist.getStore().getRoot().cascadeBy(function (node) {
         var item, toolElement;
         item = treelist.getItem(node);
         if (item && item.isTreeListItem) {
         if (item.element.isVisible(true)) {
         console.log('Visible: ' + item.getText()); // .getNode()
         } else {
         console.log('Invisible: ' + item.getText());
         }
         }
         });
         */

    },

    // https://docs.sencha.com/extjs/6.0/components/trees.html
    // https://www.sencha.com/forum/showthread.php?304624-Ext.list.Tree-item-renderer-and-update
    //
    visitiList: function (treelist) {
        treelist.getStore().getRoot().cascadeBy(function (node) {
            var item, toolElement;
            item = treelist.getItem(node);
            if (item && item.isTreeListItem) {
                if (item.element.isVisible(true)) {
                    console.log('Visible: ' + item.getText()); // .getNode()
                } else {
                    console.log('Invisible: ' + item.getText());
                }
            }
        });
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                    },
                    single: true
                });
            }
        }
    },

    onMainViewRender: function () {
        console.log('this.redirectTo("dashboard");');
        if (!window.location.hash) {
            this.redirectTo("dashboard");
        }
    },

    onRouteChange: function (id) {
        console.log('this.setCurrentView(' + id + ')');
        if (this.navigationTreeStoreLoaded) {
            this.setCurrentView(id);
        }
    },

    onSearchRouteChange: function () {
        this.setCurrentView('search');
    },

    onEmailRouteChange: function () {
        this.setCurrentView('email');
    }
});
