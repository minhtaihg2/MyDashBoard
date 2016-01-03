Ext.define('Admin.view.sync.SyncModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sync',

    // TODO - Add view data as needed or remove if not needed

    data: {
        title: {
            sensor: 'Sensor',
            calibration: 'Calibration',
            temperature: 'Temperature'
        }
    },

    formulas: {
        calibrationTitle: function (get) {
            var fn = get('title.calibration'), ln = get('sensorGrid.selection.sensorid');
            return (fn && ln) ? (fn + ' ' + ln) : (fn || ln || '');
        }
    },

    stores: {
        sensor: {
            model: 'sync.Sensor',
            autoLoad: true,
            autoSync: true
        },
        calibration: {
            model: 'sync.Calibration',
            autoLoad: true,
            autoSync: false,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 20,
            filters: [{
                property: 'sensorid',
                type: 'number',
                value: '{sensorGrid.selection.sensorid}'
            }, {
                property: 'address',
                type: 'string',
                value: '{sensorGrid.selection.address}'
            }]
        },
        temperature: {
            model: 'sync.Temperature',
            autoLoad: true, // important to set autoLoad to false. If there is an error on the backend, Ext will still try to resolve Direct method names and crash the app.
            autoSync: false, // true,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 20,
            filters: [{
                property: 'sensorid',
                type: 'number',
                value: '{sensorGrid.selection.sensorid}'
            }, {
                property: 'address',
                type: 'string',
                value: '{sensorGrid.selection.address}'
            }]
        }
    }

});
