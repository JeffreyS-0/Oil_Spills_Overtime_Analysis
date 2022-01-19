// prototype


// Add console.log to check to see if our code is working.
console.log("working");

// Create the tile layer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the second tile layer that will be the background of the map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the third tile layer that will be the background of the map
let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Outdoor Terrain": outdoors
};

// 1. Add a 2nd layer group for the tectonic plate data.
let allSpills = new L.LayerGroup();
// let tectonicPlates = new L.LayerGroup();
// let majorEarthquakes = new L.LayerGroup();



// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "All Spills": allSpills
  // "Tectonic Plates": tectonicPlates,
  // "Major Earthquakes": majorEarthquakes
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("../Mapping/test_df.html").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
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

  // This function determines the color of the marker based on the magnitude of the spill.
  function getColor(UNINTENTIONAL_RELEASE_BBLS) {
    if (UNINTENTIONAL_RELEASE_BBLS > 5000) {
      return "#ea2c2c";
    }
    if (UNINTENTIONAL_RELEASE_BBLS > 2500) {
      return "#ea822c";
    }
    if (UNINTENTIONAL_RELEASE_BBLS > 1500) {
      return "#ee9c00";
    }
    if (UNINTENTIONAL_RELEASE_BBLS > 500) {
      return "#eecc00";
    }
    if (UNINTENTIONAL_RELEASE_BBLS > 50) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(UNINTENTIONAL_RELEASE_BBLS) {
    if (UNINTENTIONAL_RELEASE_BBLS === 0) {
      return 1;
    }
    return UNINTENTIONAL_RELEASE_BBLS;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, {LOCATION_LATITUDE[i], LOCATION_LONGITUDE[i]}) {
      		console.log(data);
      		return L.circleMarker(LOCATION_LATITUDE, LOCATION_LONGITUDE);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(allSpills);

  // Then we add the earthquake layer to our map.
  allSpills.addTo(map);

  // 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week
d3.json("../Mapping/test_df.html").then(function(data) {

  // 4. Use the same style as the earthquake data
  function styleInfo(feature) {
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
  
  // 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake
  function getColor(UNINTENTIONAL_RELEASE_BBLS) {
    if (UNINTENTIONAL_RELEASE_BBLS > 5000) {
      return "#922a31";
    }
    if (UNINTENTIONAL_RELEASE_BBLS >50) {
      return "#ffa500";
    }
    if (UNINTENTIONAL_RELEASE_BBLS <50) {
      return "#ffff00"
    }
  }
  
  // 6. Use the function that determines the radius of the earthquake marker based on its magnitude
  function getRadius(UNINTENTIONAL_RELEASE_BBLS) {
    if (UNINTENTIONAL_RELEASE_BBLS === 0) {
      return 1;
    }
    return UNINTENTIONAL_RELEASE_BBLS;
  }
  
  // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
  // sets the style of the circle, and displays the magnitude and location of the earthquake
  //  after the marker has been created and styled.
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },

    // Style info for each circleMarker
    style: styleInfo,

    // circleMarker popups
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(majorSpills);

  // 8. Add the major earthquakes layer to the map
  majorSpills.addTo(map);
  
  // 9. Close the braces and parentheses for the major earthquake data.
  });  

  // Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const UNINTENTIONAL_RELEASE_BBLS = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

// Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < UNINTENTIONAL_RELEASE_BBLS.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      UNINTENTIONAL_RELEASE_BBLS[i] + (UNINTENTIONAL_RELEASE_BBLS[i + 1] ? "&ndash;" + UNINTENTIONAL_RELEASE_BBLS[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);