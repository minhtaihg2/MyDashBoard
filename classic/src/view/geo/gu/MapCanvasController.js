Ext.define('Admin.view.geo.gu.MapCanvasController', {
    extend: 'Admin.view.geo.MapCanvasController',
    alias: 'controller.geo-mapcanvas-gu',

    addVectorLayer: function (view) {
        //<debug>
        console.log('addVectorLayer');
        //</debug>
        var me = this;
        var vm = view.up('geo-map').getViewModel();
        var olMap = view.map;

        // WFS
        // http://softwarelivre.cm-agueda.pt/geoserver/ide_local/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ide_local:edificado_vt&maxFeatures=50&outputFormat=application/json
        // http://softwarelivre.cm-agueda.pt/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ide_local:edificado_vt&maxFeatures=50&outputFormat=application/json
        // http://localhost:8080/geoserver/ide_local/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ide_local:edificado_vt_i&maxFeatures=50&outputFormat=application%2Fjson
        var vectorWFS = new ol.layer.Vector({
            title: 'Edificado (Local)',
            name: 'Edificado (Local)',
            source:  new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function (extent) {
                    return 'http://localhost:8080/geoserver/wfs?service=WFS&' +
                        'version=1.1.0&request=GetFeature&typename=ide_local:edificado_vt_i&' +
                        'outputFormat=application/json&srsname=EPSG:3763&' +
                        'bbox=' + extent.join(',') + ',EPSG:3763';
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ())
            }),
            /*
             style: new ol.style.Style({
             stroke: new ol.style.Stroke({
             color: 'rgba(0, 255, 0, 0.5)',
             width: 2.5
             })
             }),
             */
            maxResolution: 1.09956468849 // 2.199129376979828 // The maximum resolution (exclusive) below which this layer will be visible.
        });

        olMap.addLayer(vectorWFS);

        var featureStore = Ext.create('GeoExt.data.store.Features', {
            layer: vectorWFS,
            map: olMap
        });
        vm.setStores(Ext.apply(vm.getStores(), {'featureStore': featureStore}));

        featureStore.clearFilter();
        var selectedFeatures = [];
        featureStore.filterBy(function(record, id) {
            return Ext.Array.indexOf(selectedFeatures, record.get("inspireid")) !== -1;
        }, this);

        var grid = view.up('geo-map').down('geo-mapgrid');
        grid.setStore(featureStore);

        // enable select elements
        var selectSingleClick = new ol.interaction.Select({
            layers: [vectorWFS]
        });
        olMap.addInteraction(selectSingleClick);
        vm.data.select = selectSingleClick;

        selectSingleClick.on('select', function (e) {
            selectedFeatures = [];
            e.target.getFeatures().forEach(function (feature, idx, a) {
                //console.log(feature);
                selectedFeatures.push(feature.get('inspireid'));
                //console.log(selectedFeatures);
            }, view);

            featureStore.filterBy(function(record, id) {
                return Ext.Array.indexOf(selectedFeatures, record.get("inspireid")) !== -1;
            }, this);
            //console.log(featureStore);
        });

    }

});
