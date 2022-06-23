// Add console.log to check to see if our code is working.
console.log("working");

//  We create the tile layer that will be the background of our map.
let light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create a base layer that hold both maps
let baseMaps = {
    Street: light,
    Dark: dark
};

//Create the map object with a center and zoom level
let map = L.map('mapid', {
    center: [44,-80],
    zoom: 2,
    layers: [light]
})

//Pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map)

// Accesing the GeoJSON data URL
let torontoData = "https://raw.githubusercontent.com/antongit505/Mapping_Earthquakes/Mapping_GeoJSON_points/Mapping_GeoJSON_points/majorAirports.json";

//Grabbing our GeoJSON data
d3.json(airportData).then( function(data) {
    console.log(data);
    //Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data)
    //.bindPopup("<h1> Airport code: "+ +"<hr> <h2>Airport Name: "+ +"</h2>")
    .addTo(map);
})
//To add popups to geoJSON https://leafletjs.com/reference.html#geojson