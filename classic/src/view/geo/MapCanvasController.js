Ext.define('Admin.view.geo.MapCanvasController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.geo-mapcanvas',

    init: function () {
        var me = this;
        me.callParent(arguments);
    },

    //http://docs.sencha.com/extjs/6.0/application_architecture/view_controllers.html#Listeners_and_Event_Domains
    initViewModel: function (vm) {
        //<debug>
        console.log('initViewModel');
        //console.log(vm);
        //</debug>
    },

    onLayersStoreLoaded: function (records, operation, success) {
        //<debug>
        console.log('store loaded');
        console.log(records.length + ' layers foram devolvidos');
        //console.log(this);  // viewcontroller type: "geo-mapcanvas"
        //</debug>

        var me = this;
        var olMap = me.getView().map;

        var projection = olMap.getView().getProjection();

        var pt_tm_06_grid_mapproxy = new ol.tilegrid.WMTS({
            origin: [-119191.407499, 276083.7674],
            resolutions: [281.488560253, 140.744280127, 70.3721400634, 35.1860700317, 17.5930350158, 8.79651750792, 4.39825875396, 2.19912937698, 1.09956468849, 0.549782344245, 0.274891172122, 0.137445586061, 0.0687227930306],
            matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        });

        var tileGridGWCGeomaster = new ol.tilegrid.TileGrid({
            origin: [-127096.80687006014, 346847.6135091576],
            extent: [-127096.80687006014, -301702.02931375435, 233208.55025377986, 346847.6135091576],
            resolutions: [281.488560253, 140.744280127, 70.3721400634, 35.1860700317, 17.5930350158, 8.79651750792, 4.39825875396, 2.19912937698, 1.09956468849, 0.549782344245, 0.274891172122, 0.137445586061, 0.0687227930306]
        });

        var tileGridGWCSoftwareLivre = new ol.tilegrid.TileGrid({
            origin: [-119191.4075, 416395.1959999999],
            extent: [-119191.4075, -300404.804, 597608.5924999999, 416395.1959999999],
            resolutions: [2799.9999999999995, 1399.9999999999998, 699.9999999999999, 280.0, 140.0, 70.0, 27.999999999999996, 13.999999999999998, 6.999999999999999, 2.8, 1.4, 0.27999999999999997, 0.13999999999999999, 0.06999999999999999]
        });

        var groups = [];
        function addToGroup(layer, groupid) {
            var existent = null;
            groups.forEach(function (element, index, array) {
                if (element.get('name') == groupid) {
                    //console.log('Bingo!');
                    existent = element;
                }
            });
            if (!existent) {
                //console.log('addToGroup(' + groupid + ') → Novo grupo' + groups.length);
                existent = new ol.layer.Group({
                    name: groupid
                });
                groups.push(existent);
            }
            //console.log('addToGroup(' + groupid + ') → Adicionar ao grupo' + groups.length);
            var layers = existent.getLayers();
            layers.push(layer);
            existent.setLayers(layers);
        }

        var total = records.length;
        var novolayer;
        for (var i = 0; i < total; i++) {
            novolayer = null;
            switch (records[i].get('service')) {
                case 'MapProxy':
                    novolayer = new ol.layer.Tile({
                        title: records[i].get('title'), // layer switcher
                        name: records[i].get('title'),  // legend tree
                        type: 'base', // layer switcher
                        //visible: records[i].get('visible'),
                        opacity: records[i].get('opacity'),
                        source: new ol.source.WMTS({
                            url: records[i].get('url'),
                            layer: records[i].get('layer'),
                            attributions: [new ol.Attribution({
                                html: records[i].get('attribution')
                            })],
                            requestEncoding: 'REST',
                            matrixSet: 'pt_tm_06', // mapproxy grid
                            format: 'image/png',
                            tileGrid: pt_tm_06_grid_mapproxy
                        })
                    });
                    break;
                case 'GWC-CMA':
                    novolayer = new ol.layer.Tile({
                        title: records[i].get('title'),
                        name: records[i].get('title'),
                        //visible: records[i].get('visible'),
                        opacity: records[i].get('opacity'),
                        source: new ol.source.TileWMS({
                            url: records[i].get('url'),
                            params: {
                                'VERSION': '1.1.1',
                                'LAYERS': records[i].get('layer'),
                                'TILED': true
                            },
                            serverType: 'geoserver',
                            tileGrid: tileGridGWCSoftwareLivre
                        })
                    });
                    break;
                case 'GWC-Geomaster':
                    novolayer = new ol.layer.Tile({
                        title: records[i].get('title'),
                        name: records[i].get('title'),
                        //visible: records[i].get('visible'),
                        opacity: records[i].get('opacity'),
                        source: new ol.source.TileWMS({
                            url: records[i].get('url'),
                            params: {
                                'VERSION': '1.1.1',
                                'LAYERS': records[i].get('layer'),
                                'TILED': true
                            },
                            serverType: 'geoserver',
                            tileGrid: tileGridGWCGeomaster
                        })
                    });
                    break;
                case 'WMS':
                    novolayer = new ol.layer.Tile({
                        title: records[i].get('title'),
                        name: records[i].get('title'),
                        //visible: records[i].get('visible'),
                        opacity: records[i].get('opacity'),
                        source: new ol.source.TileWMS({
                            url: records[i].get('url'),
                            params: {
                                'LAYERS': records[i].get('layer')
                            },
                            serverType: 'geoserver',
                            projection: projection,
                            crossOrigin: 'anonymous',
                            attributions: [new ol.Attribution({
                                html: records[i].get('attribution')
                            })]
                        })
                    });
                    break;
                case 'OSM':
                    break;
                case 'Stamen':
                    break;
                default:
                    console.log('Tipo desconhecido: ' + records[i].data.tipo);
                    break;
            }
            if (novolayer) {
                if (records[i].get('layergroup')) {
                    //console.log('layergroup → ' + records[i].get('layergroup'));
                    addToGroup(novolayer, records[i].get('layergroup'));
                } else {
                    olMap.addLayer(novolayer);
                }
            }
        }
        //console.log('Missing ' + groups.length + ' groups' );

        groups.forEach(function (element, index, array) {
            olMap.addLayer(element);
        });

        this.afterMapCanvasRender(me.getView());
    },

    beforeMapCanvasRender: function (view) {
        //<debug>
        console.log('beforeMapCanvasRender');
        //</debug>
        var me = this;
        var geoLayersStore = view.getViewModel().getStore('geolayers');

        var viewId = 0;

        if (view.hasOwnProperty('geoExtViewId') && (parseInt(view.geoExtViewId) > 0)) {
            viewId = parseInt(view.geoExtViewId);
        }
        //console.log();

        //<debug>
        console.log('geoLayersStore');
        //console.log(geoLayersStore);
        console.log('geoLayersStore.load()');
        //</debug>

        geoLayersStore.load({
            params: {
                viewid: viewId
            },
            callback: me.onLayersStoreLoaded,
            scope: me
        });

    },

    afterMapCanvasRender: function (view) {
        //<debug>
        console.log('afterMapCanvasRender');
        //</debug>
        var me = this;
        var vm = view.up('geo-map').getViewModel();
        var olMap = view.map;

        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(vm.data.cidades, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3763'
                }),
                attributions: [new ol.Attribution({
                    html: "UT-SIG, Município de Águeda"
                })]
            }),
            name: 'Population', // Legend Tree
            title: 'Population', // Layer Switcher
            legendUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Edit_pie_chart.jpg',
            style: vm.data.redStyle
        });
        olMap.addLayer(vectorLayer);

        var treeStore = Ext.create('GeoExt.data.store.LayersTree', {
            layerGroup: olMap.getLayerGroup()
        });
        //vm.setStores({'treeStore': treeStore});
        vm.setStores(Ext.apply(vm.getStores(), {'treeStore': treeStore}));

        var tree = view.up('geo-map').down('geo-tree');
        tree.setStore(treeStore);

        var featureStore = Ext.create('GeoExt.data.store.Features', {
            layer: vectorLayer,
            map: olMap
        });
        //vm.setStores({'featureStore': featureStore});
        vm.setStores(Ext.apply(vm.getStores(), {'featureStore': featureStore}));
        //vm.setStores({'featureStore': featureStore, 'treeStore': treeStore});

        var grid = view.up('geo-map').down('geo-mapgrid');
        grid.setStore(featureStore);

        // enable select elements
        var selectSingleClick = new ol.interaction.Select({
            layers: [vectorLayer]
        });
        olMap.addInteraction(selectSingleClick);
        vm.data.select = selectSingleClick;

        selectSingleClick.on('select', function (e) {
            var features = e.target.getFeatures();
            var geomapv = view.up('geo-map');
            var grid = geomapv.lookupReference('geo-mapgrid');

            e.selected.forEach(function (feature, idx, a) {
                var store = vm.getStore('featureStore');
                var record = store.getByFeature(feature);
                grid.getSelectionModel().select(record, true, true); // keepExisting = true, suppressEvent = true
            }, view);

            e.deselected.forEach(function (feature, idx, a) {
                var store = vm.getStore('featureStore');
                var record = store.getByFeature(feature);
                grid.getSelectionModel().deselect(record, true); // suppressEvent = true
            }, view);

        });

        //var popupWindow = Ext.create('Admin.view.geo.PopupWindow');
        me.popupwindow = null;

        olMap.getViewport().addEventListener("dblclick", function (e) {
            var windows = Ext.ComponentQuery.query('popup-window');
            if (windows.length > 0) {
                me.popupwindow = windows[0];
            } else {
                console.log('Vou criar um novo popup');
                me.popupWindow = Ext.create('Admin.view.geo.PopupWindow');
            }
            var position = olMap.getEventPixel(e);
            var coordinate = olMap.getEventCoordinate(e);
            var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
            me.popupWindow.setPosition(position[0] + me.getView().getX(), position[1] + me.getView().getY(), {});
            //console.log(me.getView().getConstrainRegion());
            //console.log(view.getConstrainRegion());
            me.popupWindow.setTitle(hdms);
            me.popupWindow.show();
            me.popupWindow.doConstrain(me.getView().getConstrainRegion());
            me.popupWindow.constrain = true;
        });

        olMap.on('pointerdrag', function () {
            if (me.popupWindow) {
                me.popupWindow.hide();
            }
        });

        olMap.on('moveend', function () {
            if (me.popupWindow) {
                me.popupWindow.hide();
            }
        });

        /*
         * forcing pan
         *
         *
         var showPopup = false;

         olMap.getViewport().addEventListener("dblclick", function (e) {
         var position = olMap.getEventPixel(e);
         var coordinate = olMap.getEventCoordinate(e);
         showPopup = true;
         var pan = ol.animation.pan({
         duration: 1000,
         source: (olMap.getView().getCenter())
         });
         olMap.beforeRender(pan);
         olMap.getView().setCenter(coordinate);
         });

         olMap.on('moveend', function () {
         //if (popupWindow) {
         //    popupWindow.hide();
         //}
         var coordinate = olMap.getView().getCenter();
         var position = olMap.getPixelFromCoordinate(coordinate);

         var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
         popupWindow.setPosition(position[0] + me.getView().getX(), position[1] + me.getView().getY(), {});
         //console.log(me.getView().getConstrainRegion());
         //console.log(view.getConstrainRegion());
         popupWindow.setTitle(hdms);
         if (showPopup) {
         popupWindow.show();
         popupWindow.doConstrain(me.getView().getConstrainRegion());
         popupWindow.constrain = true;
         }
         });
         */

    }

});
