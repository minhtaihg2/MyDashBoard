Ext.define('Admin.view.pages.FAQ', {
    extend: 'Ext.container.Container',
    xtype: 'faq',

    requires: [
        'Ext.panel.Panel',
        'Ext.plugin.Responsive',
        'Ext.button.Button',
        'Ext.layout.container.Accordion'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    padding: 10,

    items: [
        {
            xtype: 'panel',
            cls: 'faq-left-sidebar shadow-panel',
            //margin: 10,
            header: false,
            ui: 'light',
            responsiveConfig: {
                'width < 1000': {
                    width: 0,
                    visible: false
                },
                'width >= 1000 && width < 1600': {
                    width: 230,
                    visible: true
                },
                'width >= 1600': {
                    width: 300,
                    visible: true
                }
            },

            items: [
                {
                    xtype: 'panel',
                    title: 'Bem vindo',
                    ui: 'light',
                    cls: 'shadow-panel pages-faq-container',
                    iconCls: 'x-fa fa-lightbulb-o',
                    html: '',
                    bodyPadding: 15,
                    loader: {
                        url: 'resources/help/welcome.html',
                        autoLoad: true
                    }
                },
                {
                    xtype: 'panel',
                    bodyPadding: 20,
                    ui: 'light',
                    cls: 'shadow-panel pages-faq-container',
                    iconCls: 'x-fa fa-question',
                    title: 'Precisa de Ajuda?',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'box',
                            loader: {
                                url: 'resources/help/ajuda.html',
                                autoLoad: true
                            }
                        } /*,
                         {
                         xtype: 'button',
                         ui: 'soft-blue',
                         margin: '20 20 20 20',
                         text: 'Contact Us'
                         }
                         */
                    ]
                }, {
                    xtype: 'panel',
                    title: 'STORM Clouds',
                    ui: 'light',
                    cls: 'shadow-panel pages-faq-container',
                    iconCls: 'x-fa fa-lightbulb-o',
                    flex: 1,
                    items: [
                        {
                            xtype: 'image',
                            src: 'resources/images/storm.png',
                            height: 144
                        }
                    ]
                }
            ],
            plugins: [
                {
                    ptype: 'responsive'
                }
            ]
        },
        {
            xtype: 'panel',
            ui: 'light',
            //margin: 10,
            flex: 1,
            cls: 'pages-faq-container shadow-panel',

            iconCls: 'x-fa fa-question-circle',
            title: 'Questões típicas',
            bodyPadding: 15,
            items: [
                {
                    xtype: 'panel',
                    cls: 'FAQPanel',
                    layout: 'accordion',
                    title: 'Genéricas',
                    height: 340,
                    ui: 'light',
                    items: [
                        {
                            xtype: 'panel',
                            html: 'Não precisa de se registar e entrar com a sua conta para poder explorar as várias aplicações. Contudo, há funcionalidades específicas que carecem de autenticação.',
                            title: 'Preciso de me registar?',
                            iconCls: 'x-fa fa-caret-down'
                        },
                        {
                            xtype: 'panel',
                            html: 'Sim, vai poder usar a sua conta das principais redes sociais muito em breve.',
                            title: 'Posso usar uma rede social?',
                            iconCls: 'x-fa fa-caret-down'
                        },
                        {
                            xtype: 'panel',
                            html: 'Em breve.',
                            title: 'Quando estão mais aplicações disponíveis?',
                            iconCls: 'x-fa fa-caret-down'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    cls: 'FAQPanel',
                    layout: 'accordion',
                    title: 'Autenticação',
                    height: 340,
                    bodyPadding: 10,
                    ui: 'light',
                    items: [/*
                     {
                     xtype: 'panel',
                     html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                     title: 'Migração das contas',
                     iconCls: 'x-fa fa-caret-down'
                     },
                     {
                     xtype: 'panel',
                     html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                     title: 'Can I change my plan in between?',
                     iconCls: 'x-fa fa-caret-down'
                     },
                     {
                     xtype: 'panel',
                     html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                     title: 'How can I deactivate my account?',
                     iconCls: 'x-fa fa-caret-down'
                     },
                     {
                     xtype: 'panel',
                     html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                     title: 'Can I transfer my account to another user?',
                     iconCls: 'x-fa fa-caret-down'
                     }
                     */
                    ]
                },
                {
                    xtype: 'panel',
                    cls: 'FAQPanel',
                    layout: 'accordion',
                    title: 'Plantas de Localização',
                    height: 300,
                    bodyPadding: 10,
                    ui: 'light',
                    items: [
                        {
                            xtype: 'panel',
                            html: 'As plantas de localização são impressas usando <b>apenas</b> a cartografia oficial do município, nas escalas 1:2000, 1:5000 e 1:10000.<br/>Sobre essa cartografia, deve desenhar as peças que achar convenientes.',
                            title: 'Os ortofotomapas não aparecem na impressão',
                            iconCls: 'x-fa fa-caret-down'
                        },
                        {
                            xtype: 'panel',
                            html: 'Pode desenhar pontos, linhas de polígonos, assim como círculos, retângulos e caixas.<br/>Depois de desenhar algo, pode selecionar o mesmo e editar os vértices. Para remover um vértice, depois de escolher o vértice, tem que premir a tecla shift.',
                            title: 'Que geometrias posso desenhar?',
                            iconCls: 'x-fa fa-caret-down'
                        } /*,
                         {
                         xtype: 'panel',
                         html: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                         title: 'How long does it take to process my payment?',
                         iconCls: 'x-fa fa-caret-down'
                         }
                         */
                    ]
                }
            ]
        }
    ]
});
