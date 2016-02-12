Ext.define("Admin.view.maps.MapCanvas", {
    //extend: "Ext.panel.Panel",
    extend: "GeoExt.component.Map",
    alias: 'widget.mapcanvas',

    requires: [
        "Admin.view.maps.MapCanvasController",
        "Admin.view.maps.MapCanvasModel"
    ],

    controller: "mapcanvas",
    viewModel: {
        type: "mapcanvas"
    },

    listeners: {
        beforerender: 'beforeMapCanvasRender'
    },

    initComponent: function () {
        var me = this;

        //<debug>
        console.log('Admin.view.maps.MapCanvas initComponent');
        console.log(me.initialConfig);
        console.log(me.geoExtViewId);
        //</debug>

        var projection = new ol.proj.Projection({
            code: 'EPSG:3763',
            units: 'm',
            axisOrientation: 'neu',
            // Gridset bounds
            // Computed from maximum extent of CRS
            // extent: [-127096.80687006014, -301702.02931375435, 173081.7938279003, 278541.6694684961]
            extent: [-119191.407499, -300404.803999, 162129.0811, 276083.7674]
        });

        me.map = new ol.Map({
            controls: ol.control.defaults().extend([
                new ol.control.ZoomToExtent({
                    extent: [-36000, 91900, -9000, 114000]
                })
            ]),
            layers: [],
            view: new ol.View({
                projection: projection,
                center: [-26000, 100800],
                zoom: 10
            }),
            interactions: ol.interaction.defaults({doubleClickZoom: false})
        });

        //// https://github.com/walkermatt/ol3-layerswitcher
        //var layerSwitcher = new ol.control.LayerSwitcher({
        //    tipLabel: 'Legenda'
        //});
        //me.map.addControl(layerSwitcher);

        me.callParent();
    }

});
