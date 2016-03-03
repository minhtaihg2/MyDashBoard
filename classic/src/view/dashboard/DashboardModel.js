Ext.define('Admin.view.dashboard.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard',

    requires: [
        'Ext.data.Store',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Boolean'
    ],

    stores: {
        'dashboard.QGAreaStore': {
            autoLoad: true,
            model: 'Admin.model.DataXY',
            proxy: {
                type: 'ajax',
                url: '~api/qg/area',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }

        },
        'dashboard.QGBarStore': {
            autoLoad: true,
            model: 'Admin.model.DataXY',
            proxy: {
                type: 'ajax',
                url: '~api/qg/bar',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        'dashboard.QGLineStore': {
            autoLoad: true,
            model: 'Admin.model.DataXY',
            proxy: {
                type: 'ajax',
                url: '~api/qg/line',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        'dashboard.QGPieStore': {
            autoLoad: true,
            model: 'Admin.model.DataXY',
            proxy: {
                type: 'ajax',
                url: '~api/qg/pie',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }

        },
        dashboardfulllinechartstore: {
            autoLoad: true,
            model: 'Admin.model.MultiDataXY',
            proxy: {
                type: 'ajax',
                url: '~api/dashboard/full',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        dashboardvisitorchartstore: {
            autoLoad: true,
            model: 'Admin.model.MultiDataXY',
            proxy: {
                type: 'ajax',
                url: '~api/dashboard/visitor',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        dashboardcouncechartstore: {
            autoLoad: true,
            model: 'Admin.model.MultiDataXY',
            proxy: {
                type: 'ajax',
                url: '~api/dashboard/counce',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        subscriptionstore: {
            autoLoad: true,
            model: 'Admin.model.Subscription',
            proxy: {
                type: 'ajax',
                url: '~api/subscriptions',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        dashboardtaskstore: {
            autoLoad: true,
            fields: [
                {
                    type: 'int',
                    name: 'id'
                },
                {
                    type: 'string',
                    name: 'task'
                },
                {
                    type: 'boolean',
                    name: 'done'
                }
            ],
            proxy: {
                type: 'ajax',
                //url: 'http://localhost/~jgr/Tarefas.json',
                url: '~api/dashboard/tasks',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        plantas: {
            fields: ['indicador', 'ind'],
            data: [
                {created: '2010', value: 2618},
                {created: '2011', value: 3479},
                {created: '2012', value: 3717},
                {created: '2013', value: 3039},
                {created: '2014', value: 2464},
                {created: '2015', value: 2535},
                {created: '2016', value: 485}
            ]
        },

        urbanismo_funcao: {
            fields: ['indicador', 'ind'],
            data: [
                {indicador: 'Industria', ind: 29},
                {indicador: 'Varanda', ind: 37},
                {indicador: 'Posto transformacao', ind: 50},
                {indicador: 'Alpendre', ind: 54},
                {indicador: 'Equipamentos', ind: 121},
                {indicador: '', ind: 126},
                {indicador: 'Escolar', ind: 168},
                {indicador: 'Notavel', ind: 207},
                {indicador: 'Religioso', ind: 219},
                {indicador: 'Residencia_individual', ind: 294},
                {indicador: 'Industrial', ind: 2881},
                {indicador: 'Barraco', ind: 7532},
                {indicador: 'Telheiro', ind: 8721},
                {indicador: 'Anexo', ind: 33139},
                {indicador: 'Edificio', ind: 36127}
            ]
        },
        /*

         select tipo, count(*), count(*) * 100 / 53488
         from dbo.processo
         group by tipo
         order by 2 DESC

         select count(*), count(*) * 100 / 53488
         from dbo.processo
         where tipo NOT IN('ONERED','GENERI','DV','LIC' )
         */
        urbanismo_processo_tipo : {
            fields: ['os', 'data1', 'data2' ],
            data: [
                { os: 'ONERED', data1: 58, data2: 31289 },
                { os: 'GENERI', data1: 31, data2: 17008 },
                { os: 'DV', data1: 3, data2: 2022 },
                { os: 'LIC', data1: 3, data2: 1862 },
                { os: 'Outros', data1: 2, data2: 1307 }
            ]
        }

    }
});