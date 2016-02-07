Ext.define('Admin.view.geo.PopupWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.geo-popup',

    data: {
    },

    //http://localhost:8080/geoserver/geomaster/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=geomaster%3Aagueda,geomaster%3Abgri2011_0101&STYLES&LAYERS=geomaster%3Aagueda,geomaster%3Abgri2011_0101&info_format=application/json&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A3763&WIDTH=101&HEIGHT=101&BBOX=-29957.80798244231%2C102114.7105175374%2C-29837.31583317896%2C102235.20266680076

    stores: {
        gfinfo: {
            autoLoad: false,
            fields: [{
                name: 'id',
                type: 'string'
            }, {
                name: 'geometry_name',
                type: 'string'
            }, {
                name: 'properties',
                type: 'auto',
                convert: function(value) {
                    return JSON.stringify(value);
                }
            }],
            proxy: {
                //type: 'memory',
                type : 'ajax',
                url  : 'http://localhost:8080/geoserver/geomaster/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=geomaster%3Aagueda,geomaster%3Abgri2011_0101&STYLES&LAYERS=geomaster%3Aagueda,geomaster%3Abgri2011_0101&info_format=application/json&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A3763&WIDTH=101&HEIGHT=101&BBOX=-29957.80798244231%2C102114.7105175374%2C-29837.31583317896%2C102235.20266680076',
                reader: {
                    type: 'json',
                    rootProperty: 'features'
                }
            }
        }
    }

});
