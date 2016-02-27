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

    onSearchNominatim: function (combo, newValue, oldValue, eOpts) {
        var me = this;
        var vm = me.getView().getViewModel();

        console.log('Pesquisa: ' + newValue);
        console.log(newValue);

        var vectorLayer = vm.get('nominatimLayer');
        vectorLayer.getSource().clear(true);

        if (Array.isArray(newValue)) {
            console.log('É um array com ' + newValue.length);

            var spot = ol.proj.transform(newValue, 'EPSG:4326', 'EPSG:3763');
            console.log(spot);

            var geoMarker = new ol.Feature({
                geometry: new ol.geom.Point(spot)
            });

            vectorLayer.getSource().addFeature(geoMarker);

            //
            var map = me.getView().down('mapcanvas').map;
            var mapView = map.getView();
            var pan = ol.animation.pan({
                duration: 1000,
                source: mapView.getCenter()
            });
            map.beforeRender(pan);
            mapView.setCenter(spot);


        } else {
            console.log('Não é um array');
        }
        //var geoMarker = new ol.Feature({
        //    geometry: new ol.geom.Point([-23000, 101000])
        //});


    },

    onPrintClick: function (item, e, eOpts) {
        var view = this.getView();
        var olMap = view.down('mapcanvas').map;

        var vm = view.getViewModel();

        var extent = vm.get('extent');

        //var layout = vm.get('layout');

        var layouts = vm.get('layouts');
        var layout;

        var orientation = vm.get('orientation');

        switch (orientation) {
            case 'vertical':
                layout = layouts.getAt(0);
                break;
            case 'horizontal':
                layout = layouts.getAt(1);
                break;
            default:
                return;
        }

        //console.log(layout);
        var attr = layout.attributes().getAt(0);
        var clientInfo = attr.get('clientInfo');

        var spec = {
            layout: layout.get('name'),
            attributes: {}
        };

        var firstFeature = extent.getSource().getFeatures()[0];
        var bbox = firstFeature.getGeometry().getExtent();
        var center = ol.extent.getCenter(firstFeature.getGeometry().getExtent());
        var util = GeoExt.data.MapfishPrintProvider;

        var mapView = view.down('mapcanvas').getView();
        var serializedLayers = util.getSerializedLayers(
            olMap,
            function (layer) {
                // do not print the extent layer
                var isExtentLayer = (extent === layer);
                console.log('Layer ' + layer.get('title') + ' → ' + (!isExtentLayer && layer.getVisible()));
                return !isExtentLayer && layer.getVisible();
            }
        );

        serializedLayers.reverse();
        spec.attributes[attr.get('name')] = {
            //bbox: bbox,
            center: center,
            dpi: 200, // clientInfo.dpiSuggestions[0],
            //layers: serializedLayers,
            layers: [{
                "baseURL": "http://softwarelivre.cm-agueda.pt/geoserver/wms",
                "customParams": {"VERSION": "1.1.1", "tiled": true, "STYLES": "", "LAYERS": "carto2_5k"},
                "layers": ["carto2_5k"],
                "opacity": 1,
                "styles": [""],
                "type": "WMS"
            }],
            projection: mapView.getProjection().getCode(),
            rotation: mapView.getRotation(),
            scale: 2000
        };

        Ext.create('Ext.form.Panel', {
            standardSubmit: true,
            url: 'http://localhost:8080/print/print/plantas/buildreport.pdf',
            method: 'POST',
            items: [
                {
                    xtype: 'textfield',
                    name: 'spec',
                    value: Ext.encode(spec)
                }
            ]
        }).submit();

        spec = {
            "layout": "A4 portrait",
            "attributes": {
                "map": {
                    "bbox": [-25639.676895325025, 100699.43356133146, -25519.769366045202, 100750.16366987293],
                    "dpi": 72,
                    "layers": [{
                        "baseURL": "http://softwarelivre.cm-agueda.pt/geoserver/wms",
                        "customParams": {"VERSION": "1.1.1", "tiled": true, "STYLES": "", "LAYERS": "carto2_5k"},
                        "layers": ["carto2_5k"],
                        "opacity": 1,
                        "styles": [""],
                        "type": "WMS"
                    }],
                    "projection": "EPSG:3763",
                    "rotation": 0
                }
            }
        };

        // working!
        specScale = {
            "layout": "A4 landscape",
            "attributes": {
                "map": {
                    "center": [-26177, 101169],
                    "dpi": 300,
                    "layers": [{
                        "baseURL": "http://softwarelivre.cm-agueda.pt/geoserver/wms",
                        "customParams": {
                            "VERSION": "1.1.1",
                            "tiled": true,
                            "STYLES": "",
                            "LAYERS": "carto2_5k"
                        },
                        "layers": ["carto2_5k"],
                        "opacity": 1,
                        "styles": [""],
                        "type": "WMS"
                    }
                    ],
                    "projection": "EPSG:3763",
                    "rotation": 0,
                    "scale": 2000
                },
                "map10k": {
                    "center": [-26177, 101169],
                    "dpi": 300,
                    "layers": [{
                        "baseURL": "http://softwarelivre.cm-agueda.pt/geoserver/wms",
                        "customParams": {
                            "VERSION": "1.1.1",
                            "tiled": true,
                            "STYLES": "",
                            "LAYERS": "carto2_5k"
                        },
                        "layers": ["carto2_5k"],
                        "opacity": 1,
                        "styles": [""],
                        "type": "WMS"
                    }
                    ],
                    "projection": "EPSG:3763",
                    "rotation": 0,
                    "scale": 10000
                }
            }
        };


    },

    onPaperClick: function (btn, menuitem) {
        var view = this.getView();
        var canvas = view.down('mapcanvas');
        var olMap = canvas.map;

        var vm = view.getViewModel();
        vm.set('paper', menuitem.type);
        console.log(menuitem.type);

        var layouts = vm.get('layouts');
        var layout = layouts.getAt(1);

        var attr = layout.attributes().getAt(0);
        var clientInfo = attr.get('clientInfo');
        var render = GeoExt.data.MapfishPrintProvider.renderPrintExtent;

        var extentLayer = vm.get('extent');

        extentLayer.getSource().clear();
        render(canvas, extentLayer, clientInfo);
        olMap.getView().on('propertychange', function () {
            extentLayer.getSource().clear();
            render(canvas, extentLayer, clientInfo);
        });

    },

    onOrientationClick: function (btn, menuitem) {
        var view = this.getView();
        var canvas = view.down('mapcanvas');
        var olMap = canvas.map;

        var vm = view.getViewModel();
        vm.set('orientation', menuitem.type);
        console.log(menuitem.type);

        var layouts = vm.get('layouts');
        var layout;

        var printWidthMeters2k, printHeightMeters2k;
        var printWidthMeters10k, printHeightMeters10k;

        switch (menuitem.type) {
            case 'vertical':
                layout = layouts.getAt(0);
                printWidthMeters2k = 388.04;
                printHeightMeters2k = 465.65;
                printWidthMeters10k = 1940.2;
                printHeightMeters10k = 2328.3;
                break;
            case 'horizontal':
                layout = layouts.getAt(1);
                printWidthMeters2k = 465.65;
                printHeightMeters2k = 388.04;
                printWidthMeters10k = 2328.3;
                printHeightMeters10k = 1940.2;
                break;
            default:
                return;
        }

        var attr = layout.attributes().getAt(0);
        var clientInfo = attr.get('clientInfo');
        var render = GeoExt.data.MapfishPrintProvider.renderPrintExtent;
        var render10k = GeoExt.data.MapfishPrintProvider.renderPrintExtent10k;

        var extentLayer = vm.get('extent');

        extentLayer.getSource().clear();
        //render(canvas, extentLayer, clientInfo);
        render10k(canvas, extentLayer, clientInfo, printWidthMeters2k, printHeightMeters2k, '2000');
        render10k(canvas, extentLayer, clientInfo, printWidthMeters10k, printHeightMeters10k, '10000');
        olMap.getView().on('propertychange', function () {
            extentLayer.getSource().clear();
            //render(canvas, extentLayer, clientInfo);
            render10k(canvas, extentLayer, clientInfo, printWidthMeters2k, printHeightMeters2k, '2000');
            render10k(canvas, extentLayer, clientInfo, printWidthMeters10k, printHeightMeters10k, '10000');
        });

    },

//    plantas = Ext.ComponentQuery.query('fullmap-plantas')[0];
//    map = plantas.down('mapcanvas').map;
//    layers = map.getLayers();
//    l6 = layers.getArray()[6];
//l6s = l6.getSource()


    addPreviewPolygon: function (provider, view, vm, map, extent) {
        var center = map.getView().getCenter();
        console.log(center);
        var polinates = [];

        // saber a área de impressão...
        // scale = 1:10000
        var printWidthMeters = 1940.2;
        var printHeightMeters = 2328.3;

        polinates.push([center[0] - printWidthMeters / 2, center[1] - printHeightMeters / 2]);
        polinates.push([center[0] - printWidthMeters / 2, center[1] + printHeightMeters / 2]);
        polinates.push([center[0] + printWidthMeters / 2, center[1] + printHeightMeters / 2]);
        polinates.push([center[0] + printWidthMeters / 2, center[1] - printHeightMeters / 2]);
        polinates.push([center[0] - printWidthMeters / 2, center[1] - printHeightMeters / 2]);

        console.log(polinates);

        var feature = new ol.Feature({
            geometry: new ol.geom.Polygon([polinates]),
            name: '10000',
            description: '1:10000 print area'
        });

        extent.getSource().addFeature(feature);
    },

    onPrintProviderReady: function (provider, view, vm, map, extent) {
        var me = this;
        console.log('onPrintProviderReady');

        var capabilities = provider.capabilityRec;
        var layouts = capabilities.layouts();
        console.log('Layouts disponíveis: ' + layouts.getCount());

        // all possible layouts
        vm.set('layouts', layouts);
        // current layout
        var layout = layouts.getAt(0); // vertical → A4 portrait, config.yaml
        vm.set('layout', layout);

        var attr = layout.attributes().getAt(0);
        var clientInfo = attr.get('clientInfo');

        var printWidthMeters = clientInfo.width * 2;    // assuming 1:2000
        var printHeightMeters = clientInfo.height * 2;  // assuming 1:2000

        var render = GeoExt.data.MapfishPrintProvider.renderPrintExtent;
        var render10k = GeoExt.data.MapfishPrintProvider.renderPrintExtent10k;

        //render(view, extent, clientInfo);
        render10k(view, extent, clientInfo, 388.04, 465.65, '2000');
        render10k(view, extent, clientInfo, 1940.2, 2328.3, '10000');
        //me.addPreviewPolygon(provider, view, vm, map, extent);

        map.getView().on('propertychange', function () {
            extent.getSource().clear();
            //render(view, extent, clientInfo);
            render10k(view, extent, clientInfo, 388.04, 465.65, '2000');
            render10k(view, extent, clientInfo, 1940.2, 2328.3, '10000');
            //me.addPreviewPolygon(provider, view, vm, map, extent);
        });

    },

    onAfterLayersLoaded: function (view) {
        var me = this;
        console.log('afterlayersloaded()@fullmap-plantas');

        var olMap = view.map;
        var vm = me.getView().getViewModel();

        // a default style is good practice!
        var defaultStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: [0, 0, 128, 0.8],
                width: 2
            })
        });

        function styleFunction(feature, resolution) {
            var res;
            var funcao = feature.get('name');
            switch (funcao) {
                case '2000':
                    res = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'green',
                            lineDash: [4],
                            width: 2
                        }),
                        text: new ol.style.Text({
                            textAlign: 'left',
                            textBaseline: 'top',
                            font: '10px Verdana',
                            text: feature.get('description'),
                            //fill: new ol.style.Fill({color: [255, 153, 0, 0.4]}),
                            stroke: new ol.style.Stroke({color: [0, 255, 0, 1], width: 1}),
                            offsetX: 0,
                            offsetY: 0,
                            rotation: 0
                        })
                    });
                    break;
                case '10000':
                    res = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            lineDash: [2],
                            width: 2
                        }),
                        text: new ol.style.Text({
                            textAlign: 'right',
                            textBaseline: 'bottom',
                            font: '10px Verdana',
                            text: feature.get('description'),
                            //fill: new ol.style.Fill({color: [255, 153, 0, 0.4]}),
                            stroke: new ol.style.Stroke({color: [0, 0, 255, 1], width: 1}),
                            offsetX: 0,
                            offsetY: 0,
                            rotation: 0
                        })
                    });
                    break;
                default:
                    res = defaultStyle;
                    break;
            }
            return [res];
        }

        var extentLayer = new ol.layer.Vector({
            name: 'Área de Impressão', // 'Área de Impressão--',  // legend tree
            source: new ol.source.Vector(),
            style: styleFunction
        });

        olMap.addLayer(extentLayer);
        vm.set('extent', extentLayer);

        Ext.create('GeoExt.data.MapfishPrintProvider', {
            url: "http://localhost:8080/print/print/plantas/capabilities.json",
            //url: "http://localhost:8080/print/print/geoext/capabilities.json",
            listeners: {
                ready: function (provider) {
                    me.onPrintProviderReady(provider, view, vm, olMap, extentLayer);
                }
            }
        });

        var geoMarker = new ol.Feature({
            geometry: new ol.geom.Point([-23000, 101000])
        });

        var nominatimLayer = new ol.layer.Vector({
            name: 'nominatim--',  // legend tree
            source: new ol.source.Vector({
                //features: [geoMarker]
            }),
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    //anchor: [0.5, 1],
                    src: 'resources/images/location-icon-24.svg'
                })
            })
        });
        olMap.addLayer(nominatimLayer);
        vm.set('nominatimLayer', nominatimLayer);

    }

});
