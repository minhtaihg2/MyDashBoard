Ext.define('Admin.model.geo.Layer', {
	extend : 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'title',
        type: 'string'
    }, {
        name: 'layer',
        type: 'string'
    }, {
        name: 'layergroup',
        type: 'string'
    }, {
        name: 'url',
        type: 'string'
    }, {
        name: 'legendurl',
        type: 'string'
    }, {
        name: 'service',
        type: 'string'
    }, {
        name: 'srid',
        type: 'int'
    }, {
        name: 'style',
        type: 'string'
    }, {
        name: 'baselayer',
        type: 'bool'
    }, {
        name: 'singletile',
        type: 'string'
    }, {
        name: 'active',
        type: 'string'
    }, {
        name: 'visible',
        type: 'string'
    }, {
        name: 'opacity',
        type: 'float'
    }, {
        name: 'attribution',
        type: 'string'
    }, {
        name: 'viewid',
        type: 'int'
    }],
    proxy : {
        type : 'direct',
        api : {
            read : 'Server.DXSessao.readLayer'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message'
        }
    }
});
