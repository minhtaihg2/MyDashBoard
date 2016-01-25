Ext.define('Admin.view.main.Viewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'mainviewport',

    plugins: [
        'viewport'
    ],

    requires: [
        'Ext.plugin.Viewport',
        'Ext.list.Tree'
    ],

    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar toolbar-btn-shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo"><img src="resources/images/geomaster-42x38.png">Geomaster</div>',
                    width: 250
                },
                {
                    margin: '0 0 0 8',
                    cls: 'delete-focus-bg',
                    iconCls: 'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                /*
                 {
                 cls: 'delete-focus-bg',
                 iconCls: 'x-fa fa-search',
                 href: '#search',
                 hrefTarget: '_self',
                 tooltip: 'See latest search'
                 },
                 {
                 cls: 'delete-focus-bg',
                 iconCls: 'x-fa fa-envelope',
                 href: '#email',
                 hrefTarget: '_self',
                 tooltip: 'Check your email'
                 },
                 */
                {
                    cls: 'delete-focus-bg',
                    iconCls: 'x-fa fa-bell',
                    handler: 'onBellClick'
                },
                {
                    cls: 'delete-focus-bg',
                    iconCls: 'x-fa fa-minus-circle',
                    tooltip: 'Remove item',
                    handler: 'onRemoveItemClick'
                },
                {
                    cls: 'delete-focus-bg',
                    iconCls: 'x-fa fa-plus-circle',
                    tooltip: 'Add item',
                    handler: 'onAddItemClick'
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    alt: 'Profile image',
                    bind: {
                        src: '{current.user.fotografia}'
                    }
                }, {
                    xtype: 'splitbutton',
                    text: 'Login',
                    iconCls: 'header-right-profile-image',
                    bind: {
                        //icon: '{current.user.fotografia}',
                        text: '{sessionLabel}'
                    },
                    resizable: true,
                    scale: 'medium',
                    handler: 'onClickLogin',
                    menu: [{
                        text: 'Logout',
                        bind: {
                            disabled: '{!current.user.id}'
                        },
                        iconCls: 'x-fa fa-sign-out',
                        itemId: 'botaoLogout',
                        handler: 'onLogoutClick'
                    }]
                }]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    bind: {
                        store: '{navigationTree}'
                    },
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});
