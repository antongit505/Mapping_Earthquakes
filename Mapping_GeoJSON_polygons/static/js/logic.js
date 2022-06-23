// Add console.log to check to see if our code is working.
console.log("working");

//  We create the tile layer that will be the background of our map.
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create a base layer that hold both maps
let baseMaps = {
    'Streets': streets,
    'Satellite Streets': satelliteStreets
};

//Create the map object with a center and zoom level
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
})

//Pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map)

// Accesing the GeoJSON data URL
let torontoHoods = "https://raw.githubusercontent.com/antongit505/Mapping_Earthquakes/Mapping_GeoJSON_polygons/Mapping_GeoJSON_polygons/torontoNeighborhoods.json";


// Create a style for the lines.
let myStyle = {
    color: "blue",
    fillColor: "lightyellow",
    opacity: 1,
    fillOpacity:0.5,
    weight: 1
}

//Grabbing our GeoJSON data
d3.json(torontoHoods).then( function(data) {
    console.log(data);
    //Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data,{
        style: myStyle,
        onEachFeature: function(feature,layer){
            layer.bindPopup("<h3>Neighborhood: "+feature.properties.AREA_NAME+"</h3>")
        }
    }).addTo(map);
})
  

//To add popups to geoJSON https://leafletjs.com/reference.html#geojson