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
    },

    onPrintClick: function (item, e, eOpts) {
        var me = this;
        var view = this.getView();
        var olMap = view.down('mapcanvas').map;
        var mapView = view.down('mapcanvas').getView();

        var vm = view.getViewModel();
        var extent = vm.get('extent');

        var center = olMap.getView().getCenter();
        var layoutname = vm.get('paper') + '_' + vm.get('orientation');

        var stringifyFunc = ol.coordinate.createStringXY(0);
        var out = stringifyFunc(center);

        var spec = {
            layout: layoutname,
            outputFilename: "1999",
            attributes: {
                centro: out,
                pedido: "1999/2016",
                requerente: "Ana Isabel Gomes Vilar"
            }
        };

        //var util = GeoExt.data.MapfishPrintProvider;
        //var serializedLayers = util.getSerializedLayers(
        //    olMap,
        //    function (layer) {
        //        // do not print the extent layer
        //        var isExtentLayer = (extent === layer);
        //        console.log('Layer ' + layer.get('title') + ' → ' + (!isExtentLayer && layer.getVisible()));
        //        return !isExtentLayer && layer.getVisible();
        //    }
        //);
        //serializedLayers.reverse();

        spec.attributes['map2k'] = {
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

        spec.attributes['map10k'] = {
            center: center,
            dpi: 200, // clientInfo.dpiSuggestions[0],
            //layers: serializedLayers,
            layers: [{
                "baseURL": "http://softwarelivre.cm-agueda.pt/geoserver/wms",
                "customParams": {"VERSION": "1.1.1", "tiled": true, "STYLES": "", "LAYERS": "carto10k"},
                "layers": ["carto10k"],
                "opacity": 1,
                "styles": [""],
                "type": "WMS"
            }],
            projection: mapView.getProjection().getCode(),
            rotation: mapView.getRotation(),
            scale: 10000
        };

        /*
         Ext.create('Ext.form.Panel', {
         standardSubmit: true,
         url: 'http://localhost:8080/print/print/plantas/buildreport.pdf',
         method: 'POST',
         items: [{
         xtype: 'textfield',
         name: 'spec',
         value: Ext.encode(spec)
         }]
         }).submit();
         */

        Ext.Ajax.request({
            url: 'http://localhost:8080/print/print/plantas/report.pdf',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            jsonData: spec,
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                console.dir(obj);

                /*
                 downloadURL: "/print/print/report/47470980-2975-418e-8841-08261c9fd6ea@dbfe37f9-02ef-4f4b-9441-4e3d0247733c"
                 ref: "47470980-2975-418e-8841-08261c9fd6ea@dbfe37f9-02ef-4f4b-9441-4e3d0247733c"
                 statusURL: "/print/print/status/47470980-2975-418e-8841-08261c9fd6ea@dbfe37f9-02ef-4f4b-9441-4e3d0247733c.json"
                 */

                var startTime = new Date().getTime();
                me.downloadWhenReady(startTime, obj);

            },

            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });


    },

    downloadWhenReady: function (startTime, data) {
        var me = this;
        if ((new Date().getTime() - startTime) > 50000) {
            console.log('Gave up waiting after 50 seconds');
        } else {
            //updateWaitingMsg(startTime, data);
            setTimeout(function () {
                Ext.Ajax.request({
                    url: 'http://localhost:8080' + data.statusURL,
                    success: function(response, opts) {
                        var statusData = Ext.decode(response.responseText);
                        console.dir(statusData);

                        if (!statusData.done) {
                            me.downloadWhenReady(startTime, data);
                        } else {
                            // TODO
                            // popups are usually blocked!
                            //window.open('http://localhost:8080' + statusData.downloadURL, '_blank');
                            window.location = 'http://localhost:8080' + statusData.downloadURL;
                            console.log('Downloading: ' + data.ref);
                        }
                    },
                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }, 1000);
        }
    },

    onPaperClick: function (btn, menuitem) {
        var me = this;
        var view = this.getView();
        var canvas = view.down('mapcanvas');
        var olMap = canvas.map;

        var vm = view.getViewModel();
        vm.set('paper', menuitem.type);
        console.log(menuitem.type);

        me.addPreviewPolygon(vm, olMap);
    },

    onOrientationClick: function (btn, menuitem) {
        var me = this;
        var view = this.getView();
        var canvas = view.down('mapcanvas');
        var olMap = canvas.map;

        var vm = view.getViewModel();
        vm.set('orientation', menuitem.type);
        console.log(menuitem.type);

        me.addPreviewPolygon(vm, olMap);
    },

//    plantas = Ext.ComponentQuery.query('fullmap-plantas')[0];
//    map = plantas.down('mapcanvas').map;
//    layers = map.getLayers();
//    l6 = layers.getArray()[6];
//l6s = l6.getSource()


    //addPreviewPolygon: function (provider, view, vm, map, extent) {
    addPreviewPolygon: function (vm, map) {
        var center = map.getView().getCenter();
        console.log(center);
        var layoutname = vm.get('paper') + '_' + vm.get('orientation');
        console.log(vm.get(layoutname));

        var extentLayer = vm.get('extent');
        extentLayer.getSource().clear();

        var layout = vm.get(layoutname);
        var attr = layout.attributes(); // attr is "Ext.data.Store"
        // console.log(attr);
        // debug
        // Ext.getDisplayName(temp1)
        // "Ext.data.Store"

        attr.each(function (record) {
            console.log(record.get('name') + ' → ' + record.get('type'));
            if (record.get('type') == 'MapAttributeValues') {
                var clientInfo = record.get('clientInfo');

                // saber a área de impressão
                // clientInfo is layout size in pixels
                var width_mm = clientInfo.width * 0.3527778;
                var height_mm = clientInfo.height * 0.3527778;

                // map2k → scale 2 (from mm → meters)
                // map10k → scale 10 (from mm → meters)
                var escala = record.get('name').match(/\d+/);
                if (escala.length > 0 && parseInt(escala[0]) > 0) {
                    var printWidthMeters = width_mm * parseInt(escala[0]);
                    var printHeightMeters = height_mm * parseInt(escala[0]);
                    var polinates = [];
                    polinates.push([center[0] - printWidthMeters / 2, center[1] - printHeightMeters / 2]);
                    polinates.push([center[0] - printWidthMeters / 2, center[1] + printHeightMeters / 2]);
                    polinates.push([center[0] + printWidthMeters / 2, center[1] + printHeightMeters / 2]);
                    polinates.push([center[0] + printWidthMeters / 2, center[1] - printHeightMeters / 2]);
                    polinates.push([center[0] - printWidthMeters / 2, center[1] - printHeightMeters / 2]);
                    console.log(polinates);
                    var featureName = (parseInt(escala[0]) * 1000).toString();
                    var featureDescription = '1:' + featureName + ' print area';
                    var feature = new ol.Feature({
                        geometry: new ol.geom.Polygon([polinates]),
                        name: featureName,
                        description: featureDescription
                    });
                    var fakefeature = new ol.Feature({
                        geometry: new ol.geom.Point([center[0] + printWidthMeters / 2, center[1] - printHeightMeters / 2]),
                        name: featureName,
                        description: featureDescription
                    });
                    extentLayer.getSource().addFeature(feature);
                    extentLayer.getSource().addFeature(fakefeature);
                }

            }
        });

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
        var layout = layouts.getAt(0); // portrait → A4 portrait, config.yaml

        for (var i = 0; i < layouts.getCount(); i++) {
            var name = layouts.getAt(i).get('name');
            console.log('Layout ' + i + ' → ' + name);
            vm.set(name, layouts.getAt(i));
        }

        //me.addPreviewPolygon(provider, view, vm, map, extent);
        me.addPreviewPolygon(vm, map);

        map.getView().on('propertychange', function () {
            me.addPreviewPolygon(vm, map);
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
                            color: [153, 0, 204, 1],
                            lineDash: [4],
                            width: 2
                        }),
                        text: new ol.style.Text({
                            textAlign: 'left',
                            textBaseline: 'top',
                            font: '10px Verdana',
                            text: feature.get('description'),
                            //fill: new ol.style.Fill({color: [255, 153, 0, 0.4]}),
                            stroke: new ol.style.Stroke({color: [153, 0, 204, 1], width: 1}),
                            offsetX: 0,
                            offsetY: 0,
                            rotation: 0
                        })
                    });
                    break;
                case '10000':
                    res = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [255, 102, 204, 1],
                            lineDash: [4],
                            width: 2
                        }),
                        text: new ol.style.Text({
                            textAlign: 'right',
                            textBaseline: 'bottom',
                            font: '10px Verdana',
                            text: feature.get('description'),
                            //fill: new ol.style.Fill({color: [255, 153, 0, 0.4]}),
                            stroke: new ol.style.Stroke({color: [255, 102, 204, 1], width: 1}),
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

        var nominatimLayer = new ol.layer.Vector({
            name: 'nominatim--',  // legend tree
            source: new ol.source.Vector({}),
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
