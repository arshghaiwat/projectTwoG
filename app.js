var map = L.map('map').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var drawnLayer = new L.FeatureGroup().addTo(map);

var drawControl = new L.Control.Draw({
    draw: {
        polyline: true,
        polygon: false,
        marker: false,
        circlemarker: false,
        circle: false,
        rectangle: false,
    },
    edit: {
        featureGroup: drawnLayer,
    }
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
    var type = e.layerType;
    var layer = e.layer;

    if (type === 'polyline') {
        drawnLayer.addLayer(layer);
        var highwayName = prompt('Enter highway name:');
        layer.bindPopup(highwayName);
        saveHighwayToDatabase(layer.toGeoJSON(), highwayName);
    }
});

map.on('draw:deleted', function (e) {
    deleteHighwayFromDatabase(e.layers.toGeoJSON());
});

function saveHighwayToDatabase(geoJSON, name) {
    fetch('/api/saveHighway', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ geoJSON, name }),
    });
}

function deleteHighwayFromDatabase(geoJSON) {
    fetch('/api/deleteHighway', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ geoJSON }),
    });
}
