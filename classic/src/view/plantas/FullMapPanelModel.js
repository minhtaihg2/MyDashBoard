Ext.define('Admin.view.plantas.FullMapPanelModel', {
    extend: 'Admin.view.maps.FullMapPanelModel',
    alias: 'viewmodel.fullmap-plantas',
    requires: ['Admin.model.geo.Nominatim'],

    data: {
        paper: 'A4',
        orientation: 'portrait',
        draw: {},
        modify: {}
    },

    stores: {
        nominatimdata: {
            model: 'geo.Nominatim'
        },
        geometrias: {
            fields: ['value', 'name'],
            data: [
                {value: "Point", name: "Point"},
                {value: "LineString", name: "Line"},
                {value: "Polygon", name: "Polygon"},
                {value: "Circle", name: "Circle"},
                {value: "Square", name: "Square"},
                {value: "Box", name: "Box"},
                {value: "None", name: "None"}
            ]
        }
    }

});
