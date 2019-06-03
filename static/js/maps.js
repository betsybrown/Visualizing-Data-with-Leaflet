// Create initial map object
// Set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map-id'
var myMap = L.map("map-id", {
    center: [43.7384, 7.4246],
    zoom: 1
  });
  
  // Add map tile layer (the background map image) to map
  // Use addTo method to add objects 
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  // Add url for earthquake data
  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  // Create geoJson layer with returned data & console log the data
  d3.json(link, function(data) {
    
    console.log(data);
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
          },
          style: styleMarker,
          onEachFeature: function(feature, layer) {
         layer.bindPopup("<h1>" + feature.properties.place + "</h1> <hr> <h3>Magnitude: " + feature.properties.mag + "</h3>");
          }
    }).addTo(myMap);
 
  function styleMarker(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  function getRadius(mag) {
    if (mag === 0) {
      return 1;
    }
    return mag * 3;
  }

  function getColor(mag) {
    if (mag > 5) {
        return "#f06b6b";
      }
      else if (mag > 4) {
       return "#f0a76b";
      }
      else if (mag > 3) {
        return "#f3ba4d";
      }
      else if (mag > 2) {
          return "#f3db4d";
      }
      else if (mag > 1) {
          return "#e1f34d";
      }
      else {
        return "#b7f34d";
      }
  
}
//legend


});