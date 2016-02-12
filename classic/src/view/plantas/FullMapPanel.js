Ext.define("Admin.view.plantas.FullMapPanel", {
    extend: "Admin.view.maps.FullMapPanel",
    alias: 'widget.fullmap-plantas',

    requires: [
        "Admin.view.plantas.FullMapPanelController",
        "Admin.view.plantas.FullMapPanelModel"
    ],

    controller: "fullmap-plantas",
    viewModel: {
        type: "fullmap-plantas"
    }

});
