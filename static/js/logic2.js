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
let propDamage = new L.LayerGroup();


// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "All Spills": allSpills,
//   "Tectonic Plates": tectonicPlates,
  "Property Damage": propDamage
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
// Get data from spills.js
let spillData = spills;

L.spillData(spill, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(spill,LOCATION_LATITUDE, spill,LOCATION_LONGITUDE) {
          console.log(data);
          return L.circleMarker([spill.LOCATION_LATITUDE, spill.LOCATION_LONGITUDE]);
    },
  // We set the style for each circleMarker using our styleInfo function.
style: styleInfo,
 // We create a popup for each circleMarker to display the magnitude and location of the earthquake
 //  after the marker has been created and styled.
 onEachFeature: function(feature, layer) {
  layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
}
}).addTo(allEarthquakes);

// Then we add the earthquake layer to our map.
allEarthquakes.addTo(map);
// Loop through the cities array and create one marker for each city.
spillData.forEach(function(spill) {
  console.log(spill)
  L.circleMarker([spill.LOCATION_LATITUDE, spill.LOCATION_LONGITUDE], {
    radius: spill.UNINTENTIONAL_RELEASE_BBLS/500,
    color: "yellow"
  })
  .bindPopup("<h2> Operator ID#: " + spill.OPERATOR_ID + "</h2><hr>"
  + "<h3> Spill Volume (bbls): " + spill.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
  "Commodity Class: " + spill.COMMODITY_RELEASED_TYPE + "<br></br>" +
  "Location: " + spill.ONSHORE_CITY_NAME + ", " + spill.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
  "County: " + spill.ONSHORE_COUNTY_NAME + "<br></br>" +
  "Failed Part: " + spill.SYSTEM_PART_INVOLVED + "<br></br>" +
  "Principal Cause: " + spill.CAUSE
  .toLocaleString() + "</h3>").addTo(allSpills);
});
// Then we add the 'graymap' tile layer to the map
streets.addTo(map);
allSpills.addTo(map);
  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(CAUSE) {
    if (spill.CAUSE = "CORROSION DAMAGE") {
      return "#ea2c2c";
    // }
    // if (magnitude > 4) {
    //   return "#ea822c";
    // }
    // if (magnitude > 3) {
    //   return "#ee9c00";
    // }
    // if (magnitude > 2) {
    //   return "#eecc00";
    // }
    // if (magnitude > 1) {
    //   return "#d4ee00";
    // }
    // return "#98ee00";
  }

//   // This function determines the radius of the earthquake marker based on its magnitude.
//   // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
//   function getRadius(magnitude) {
//     if (magnitude === 0) {
//       return 1;
//     }
//     return magnitude * 4;
//   }

  // Creating a GeoJSON layer with the retrieved data.
  spillData.forEach(function(spill) {
    console.log(spill)
    L.circleMarker([spill.LOCATION_LATITUDE, spill.LOCATION_LONGITUDE], {
      radius: spill.PRPTY/100000,
      color: "mint"
    })
    .bindPopup("<h2> Operator ID#: " + spill.OPERATOR_ID + "</h2><hr>"
    + "<h3> Spill Volume (bbls): " + spill.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
    "Commodity Class: " + spill.COMMODITY_RELEASED_TYPE + "<br></br>" +
    "Location: " + spill.ONSHORE_CITY_NAME + ", " + spill.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
    "County: " + spill.ONSHORE_COUNTY_NAME + "<br></br>" +
    "Failed Part: " + spill.SYSTEM_PART_INVOLVED + "<br></br>" +
    "Principal Cause: " + spill.CAUSE
    .toLocaleString() + "</h3>").addTo(propDamage);
  });
//       // We set the style for each circleMarker using our styleInfo function.
//     style: styleInfo,
//      // We create a popup for each circleMarker to display the magnitude and location of the earthquake
//      //  after the marker has been created and styled.
//      onEachFeature: function(feature, layer) {
//       layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
//     }
//   }).addTo(allEarthquakes);

  // Then we add the earthquake layer to our map.
  propDamage.addTo(map);

//   // 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {

//   // 4. Use the same style as the earthquake data
//   function styleInfo(feature) {
//     return {
//       opacity: 1,
//       fillOpacity: 1,
//       fillColor: getColor(feature.properties.mag),
//       color: "#000000",
//       radius: getRadius(feature.properties.mag),
//       stroke: true,
//       weight: 0.5
//     };
//   }
  
  // 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake
  function getColor(PRPTY) {
    if (spill.PRPTY > 100000000) {
      return "#922a31";
    }
    if (spill.PRPTY > 10000000) {
      return "#ffa500";
    }
    if (spill.PRPTY > 1000000) {
      return "#ffff00"
    }
    if (spill.PRPTY > 10000) {
        return "#3eb489"
      }
  }
  
  // 6. Use the function that determines the radius of the earthquake marker based on its magnitude
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  
  // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
  // sets the style of the circle, and displays the magnitude and location of the earthquake
  //  after the marker has been created and styled.
//   L.geoJson(data, {
//     pointToLayer: function(feature, latlng) {
//       return L.circleMarker(latlng);
//     },

//     // Style info for each circleMarker
//     style: styleInfo,

//     // circleMarker popups
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
//     }
//   }).addTo(majorEarthquakes);

//   // 8. Add the major earthquakes layer to the map
//   majorEarthquakes.addTo(map);
  
//   // 9. Close the braces and parentheses for the major earthquake data.
//   });  

  // Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

// Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);

//  Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {

    // Create a geoJSON layer with the retrieved data
    L.geoJson(data, {
      style: styleInfo,
      onEachFeature: function(feature, layer) {
        console.log(feature);
      }
    }).addTo(tectonicPlates);
  });
  tectonicPlates.addTo(map);
};