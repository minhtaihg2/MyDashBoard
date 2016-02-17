Ext.define("Admin.view.plantas.FullMapPanel", {
    extend: "Admin.view.maps.FullMapPanel",
    alias: 'widget.fullmap-plantas',

    requires: [
        'Ext.button.Cycle',
        "Admin.view.plantas.FullMapPanelController",
        "Admin.view.plantas.FullMapPanelModel"
    ],

    controller: "fullmap-plantas",
    viewModel: {
        type: "fullmap-plantas"
    },

    initComponent: function () {
        var me = this;
        console.log('Admin.view.plantas.FullMapPanel');

        me.tbar = [ '->', {
            xtype: 'cycle',
            showText: true,
            textAlign: 'right',
            listeners: {
                change: 'onPaperClick'
            },
            menu: {
                items: [{
                    text: 'Folha A4',
                    type: 'A4',
                    checked: true
                },{
                    text: 'Folha A3',
                    type: 'A3'
                }]
            }
        }, '-', {
            xtype: 'cycle',
            showText: true,
            textAlign: 'right',
            listeners: {
                change: 'onOrientationClick'
            },
            menu: {
                items: [{
                    text: 'Vertical',
                    type: 'vertical',
                    checked: true
                },{
                    text: 'Horizontal',
                    type: 'horizontal'
                }]
            }
        }, '-', {
            iconCls: 'x-fa fa-print',
            text: 'Documento para impressão',
            listeners: {
                click: 'onPrintClick'
            }
        }];
        this.callParent();
    }


});
