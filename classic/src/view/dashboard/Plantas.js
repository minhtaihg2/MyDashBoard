Ext.define('Admin.view.dashboard.Plantas', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboard_plantas',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Bar',
        'Ext.chart.interactions.ItemHighlight'
    ],

    controller: 'dashboard_plantas',

    cls: 'quick-graph-panel shadow-panel',
    //height: 320,
    layout: 'fit',
    //headerPosition: 'bottom',
    iconCls: 'x-fa fa-align-left',

    title: 'Plantas de Localização',

    tools: [
        {
            xtype: 'tool',
            cls: 'quick-graph-panel-tool x-fa fa-ellipsis-v'
        }
    ],

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        insetPadding: 40,
        //flipXY: true,
        /*
        interactions: {
            type: 'itemedit',
            style: {
                lineWidth: 2
            },
            tooltip: {
                renderer: 'onItemEditTooltipRender'
            }
        },
        */
        animation: {
            easing: 'easeOut',
            duration: 500
        },
        /*
        store: {
            type: 'economy-sectors'
        },
        */
        bind: {
            store: '{plantas}'
        },

        axes: [{
            type: 'numeric',
            position: 'left',
            fields: 'value',
            grid: true,
            maximum: 4000,
            //majorTickSteps: 500,
            title: 'Nº de Plantas',
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'created',
            grid: true
        }],
        series: [{
            type: 'bar',
            //type: 'line',
            xField: 'created',
            yField: 'value',
            style: {
                opacity: 0.80,
                minGapWidth: 10
            },
            highlightCfg: {
                strokeStyle: 'black',
                radius: 10
            },
            label: {
                field: 'value',
                display: 'insideEnd' // ,
                //renderer: 'onSeriesLabelRender'
            },
            tooltip: {
                trackMouse: true
                //renderer: 'onSeriesTooltipRender'
            }
        }]

    }]

});
