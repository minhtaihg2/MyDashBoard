Ext.define('Admin.view.plantas.FullMapPanelModel', {
    extend: 'Admin.view.maps.FullMapPanelModel',
    alias: 'viewmodel.fullmap-plantas',
    requires: ['Admin.model.geo.Nominatim'],

    data: {
        paper: 'A4',
        orientation: 'portrait'
    },

    stores: {
        nominatimdata: {
            model: 'geo.Nominatim'
        }
    }

});
