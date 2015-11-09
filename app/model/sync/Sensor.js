Ext.define('Admin.model.sync.Sensor', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'sensorid',
            type: 'int'
        }, {
            name: 'address',
            type: 'string'
        }, {
            name: 'location',
            type: 'string'
        }, {
            name: 'installdate',
            type: 'date'
        }, {
            name: 'sensortype',
            type: 'string'
        }, {
            name: 'metric',
            type: 'boolean'
        }, {
            name: 'calibrated',
            type: 'boolean'
        }, {
            name: 'quantity',
            type: 'string'
        }, {
            name: 'decimalplaces',
            type: 'int'
        }, {
            name: 'cal_a',
            type: 'float'
        }, {
            name: 'cal_b',
            type: 'float'
        }, {
            name: 'read_interval',
            type: 'int'
        }, {
            name: 'record_sample',
            type: 'int'
        }
    ],

    proxy: {
        type: 'direct',
        api: {
            create: 'Server.ActiveEngCloud.Sensor.create',
            read: 'Server.ActiveEngCloud.Sensor.read',
            update: 'Server.ActiveEngCloud.Sensor.update',
            destroy: 'Server.ActiveEngCloud.Sensor.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});