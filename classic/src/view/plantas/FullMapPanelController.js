Ext.define('Admin.view.plantas.FullMapPanelController', {
    extend: 'Admin.view.maps.FullMapPanelController',
    alias: 'controller.fullmap-plantas',
    requires: ['GeoExt.data.MapfishPrintProvider',
        'GeoExt.data.serializer.ImageWMS',
        'GeoExt.data.serializer.TileWMS',
        'GeoExt.data.serializer.Vector',
        'GeoExt.data.serializer.WMTS',
        'GeoExt.data.serializer.XYZ',
        'Ext.form.action.StandardSubmit'],

    onPrintClick: function(item, e, eOpts) {
        var view = this.getView();
        var olMap = view.down('mapcanvas').map;

        var vm = view.getViewModel();

        var extent = vm.get('extent');
        var layout = vm.get('layout');
        console.log(layout);
        var attr = layout.attributes().getAt(0);
        var clientInfo = attr.get('clientInfo');

        var spec = {
            layout: layout.get('name'),
            attributes: {}
        };

        var firstFeature = extent.getSource().getFeatures()[0];
        var bbox = firstFeature.getGeometry().getExtent();
        var util = GeoExt.data.MapfishPrintProvider;

        var mapView = view.down('mapcanvas').getView();
        var serializedLayers = util.getSerializedLayers(
            olMap,
            function(layer) {
                // do not print the extent layer
                var isExtentLayer = (extent === layer);
                console.log('Layer ' + layer.get('title') + ' → ' + (!isExtentLayer && layer.getVisible()) );
                return !isExtentLayer && layer.getVisible();
            }
        );

        serializedLayers.reverse();
        spec.attributes[attr.get('name')] = {
            bbox: bbox,
            dpi: clientInfo.dpiSuggestions[0],
            layers: serializedLayers,
            projection: mapView.getProjection().getCode(),
            rotation: mapView.getRotation()
        };
        Ext.create('Ext.form.Panel', {
            standardSubmit: true,
            url: 'http://localhost:8080/print/print/geoext/buildreport.pdf',
            method: 'POST',
            items: [
                {
                    xtype: 'textfield',
                    name: 'spec',
                    value: Ext.encode(spec)
                }
            ]
        }).submit();


    },

    onPaperClick: function(btn, menuitem) {
        var view = this.getView();
        var viewModel = view.getViewModel();
        viewModel.set('paper', menuitem.type);
    },

    onOrientationClick: function(btn, menuitem) {
        var view = this.getView();
        var viewModel = view.getViewModel();
        viewModel.set('orientation', menuitem.type);
    },

    onPrintProviderReady: function(provider, view, vm, map, extent) {
        console.log('onPrintProviderReady');

        var capabilities = provider.capabilityRec;
        var layout = capabilities.layouts().getAt(0);

        vm.set('layout', layout);

        var attr = layout.attributes().getAt(0);
        var clientInfo = attr.get('clientInfo');
        var render = GeoExt.data.MapfishPrintProvider.renderPrintExtent;

        render(view, extent, clientInfo);
        map.getView().on('propertychange', function(){
            extent.getSource().clear();
            render(view, extent, clientInfo);
        });

    },

    onAfterLayersLoaded: function (view) {
        var me = this;
        console.log('afterlayersloaded()@fullmap-plantas');

        var olMap = view.map;
        var vm = me.getView().getViewModel();

        var extentLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });

        olMap.addLayer(extentLayer);
        vm.set('extent', extentLayer);

        Ext.create('GeoExt.data.MapfishPrintProvider', {
            url: "http://localhost:8080/print/print/geoext/capabilities.json",
            listeners: {
                ready: function(provider) {
                    me.onPrintProviderReady(provider, view, vm, olMap, extentLayer);
                }
            }
        });

    }

});
