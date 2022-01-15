// Add console.log to check to see if our code is working.
console.log("working");

// Create the tile layer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
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
	zoom: 4.5,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Outdoor Terrain": outdoors
};
// 1. Add layers of data: Spills, property damages, causes.
let allSpills = new L.LayerGroup();
let propDamage = new L.LayerGroup();
// let corrosionFailure = new L.LayerGroup();
// let equipmentFailure = new L.LayerGroup();
// let excavationDamage = new L.LayerGroup();
// let incorrectOperation = new L.LayerGroup();
// let materialFailure = new L.LayerGroup();
// let naturalForce = new L.LayerGroup();
// let otherIncident = new L.LayerGroup();
// let otherOutsideforce = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "All Spills": allSpills,
  "Monetary Damage": propDamage,
  // "Cause: Corrosion Failure": corrosionFailure, 
  // "Cause: Equipment Failure": equipmentFailure,
  // "Cause: Excavation Damage": excavationDamage,
  // "Cause: Incorrect Operation": incorrectOperation,
  // "Cause: Material Failure": materialFailure,
  // "Cause: Natural Forces": naturalForce,
  // "Cause: Other Incident": otherIncident,
  // "Cause: Other Outside Forces": otherOutsideforce
  
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.

L.control.layers(baseMaps, overlays).addTo(map)


// Get data from spills.js
let spillData = spills;


// Loop through the cities array and create one marker for each spill.
spillData.forEach(function(spill) {
  console.log(spill)
  L.circleMarker([spill.LOCATION_LATITUDE, spill.LOCATION_LONGITUDE], {
    // style: styleInfo,
    radius: spill.UNINTENTIONAL_RELEASE_BBLS/500,
    color: "yellow"
    
  })
  .bindPopup("<h2> Operator ID#: " + spill.OPERATOR_ID + "</h2><hr>"
  + "<h3> Spill Volume (bbls): " + spill.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
  "Commodity Class: " + spill.COMMODITY_RELEASED_TYPE + "<br></br>" +
  "Location: " + spill.ONSHORE_CITY_NAME + ", " + spill.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
  "County: " + spill.ONSHORE_COUNTY_NAME + "<br></br>" +
  "Failed Part: " + spill.SYSTEM_PART_INVOLVED + "<br></br>" +
  "Principal Cause: " + spill.CAUSE + "<br></br>" +
  "Age of Failed Component (YRS): " + spill["COMPONENT_AGE(YEARS)"]
  .toLocaleString() + "</h3>").addTo(allSpills);
});
// Then we add the 'spill information' tile layer to the map
allSpills.addTo(map);
//-------------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// Loop through the cities array and create one marker for each spill.
spillData.forEach(function(spill) {
  console.log(spill)
  L.circleMarker([spill.LOCATION_LATITUDE, spill.LOCATION_LONGITUDE], {
    radius: spill.PRPTY/3000000, //radius of marker dependant on property damage
    color: "#da8a67"
  })
  .bindPopup("<h2> Operator ID#: " + spill.OPERATOR_ID + "</h2><hr>"
  + "<h3> Spill Volume (bbls): " + spill.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
  "Commodity Class: " + spill.COMMODITY_RELEASED_TYPE + "<br></br>" +
  "Total Monetary Damages (USD): " + spill.PRPTY_STR + "<br></br>" +
  "Location: " + spill.ONSHORE_CITY_NAME + ", " + spill.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
  "County: " + spill.ONSHORE_COUNTY_NAME + "<br></br>" +
  "Failed Part: " + spill.SYSTEM_PART_INVOLVED + "<br></br>" +
  "Principal Cause: " + spill.CAUSE
  .toLocaleString() + "</h3>").addTo(propDamage);
});
// Then we add the 'spill information' tile layer to the map
propDamage.addTo(map);


//   // This function returns the style data for each of the spills we plot on
//   // the map. We pass the volume of the spill into two separate functions
//   // to calculate the color and radius.

  // function styleInfo(feature) {
  //   return {
  //     opacity: 1,
  //     fillOpacity: 1,
  //     fillColor: getColor(cause),
  //     color: "#000000",
  //     radius: getRadius(radius),
  //     stroke: true,
  //     weight: 0.5
  //   };
  // }

  // // This function determines the color of the marker based on the cause of the spill.
  // function getColor(causes) {
  //   if (spill.CAUSE === "CORROSION FAILURE") {
  //     return "#ea2c2c";
  //   };
  //   if (spill.CAUSE == "EQUPIMENT FAILURE") {
  //     return "#ea822c";
  //   }
  //   if (spill.CAUSE == "EXCAVATION DAMAGE") {
  //     return "#ee9c00";
  //   }
  //   if (spill.CAUSE == "NATURAL FORCE DAMAGE") {
  //     return "#eecc00";
  //   }
  //   if (spill.CAUSE == "MATERIAL FAILURE OF PIPE OR WELD") {
  //     return "#d4ee00";
  //   }
  //   if (spill.CAUSE == "OTHER OUTSIDE FORCE DAMAGE") {
  //     return "FFFCCC";
  //   }
  //   if (spill.CAUSE == "OTHER INCIDENT CAUSE") {
  //     return "#f4a460";
  //   }
  //   return "#e77471";
  // }

