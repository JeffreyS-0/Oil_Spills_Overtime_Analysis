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
let corrosionFailure = new L.LayerGroup();
let equipmentFailure = new L.LayerGroup();
let excavationDamage = new L.LayerGroup();
let incorrectOperation = new L.LayerGroup();
let materialFailure = new L.LayerGroup();
let naturalForce = new L.LayerGroup();
let otherIncident = new L.LayerGroup();
let otherOutsideforce = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "All Spills": allSpills,
  "Monetary Damage": propDamage,
  "Cause: Corrosion Failure": corrosionFailure, 
  "Cause: Equipment Failure": equipmentFailure,
  "Cause: Excavation Damage": excavationDamage,
  "Cause: Incorrect Operation": incorrectOperation,
  "Cause: Material Failure": materialFailure,
  "Cause: Natural Forces": naturalForce,
  "Cause: Other Incident": otherIncident,
  "Cause: Other Outside Forces": otherOutsideforce
  
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.

L.control.layers(baseMaps, overlays).addTo(map)


// Get data from spills.js
let spillData = spills;


// Loop through the cities array and create one marker for each spill.
spillData.forEach(function(spill) {
  // console.log(spill)
  L.circleMarker([spill.LOCATION_LATITUDE, spill.LOCATION_LONGITUDE], {
    // style: styleInfo,
    radius: spill.UNINTENTIONAL_RELEASE_BBLS/500, //radius based on spill volume
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
// PROPERTY DAMAGE - Loop through the cities array and create one marker for each spill.


spillData.forEach(function(spill) {
  // console.log(spill)
  L.circleMarker([spill.LOCATION_LATITUDE, spill.LOCATION_LONGITUDE], {
    radius: spill.PRPTY/3000000, //radius of marker dependant on property damage
    color: "#da8a67"
    // style: styleInfo
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
// -------------------------------------------------------------------------------




// Adding Cause corrosion as separate layer:
// Get data from corrosion.js
let corrosionData = corrosion;



corrosionData.forEach(function(corrosion) {
  // console.log(spill)
  L.circleMarker([corrosion.LOCATION_LATITUDE, corrosion.LOCATION_LONGITUDE], {
    // style: styleInfo,
    radius: corrosion.UNINTENTIONAL_RELEASE_BBLS/500, //radius based on spill volume
    color: "brown"
  })
    .bindPopup("<h2> Operator ID#: " + corrosion.OPERATOR_ID + "</h2><hr>"
  + "<h3> Spill Volume (bbls): " + corrosion.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
  "Commodity Class: " + corrosion.COMMODITY_RELEASED_TYPE + "<br></br>" +
  "Location: " + corrosion.ONSHORE_CITY_NAME + ", " + corrosion.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
  "County: " + corrosion.ONSHORE_COUNTY_NAME + "<br></br>" +
  "Failed Part: " + corrosion.SYSTEM_PART_INVOLVED + "<br></br>" +
  "Principal Cause: " + corrosion.CAUSE + "<br></br>" +
  "Age of Failed Component (YRS): " + corrosion["COMPONENT_AGE(YEARS)"]
  .toLocaleString() + "</h3>").addTo(corrosionFailure);
});
// Then we add the 'spill information' tile layer to the map
corrosionFailure.addTo(map);
//-------------------------------------------------------------------------------

// -------------------------------------------------------------------------------




// Adding Cause Eqipment failure as separate layer:
// Get data from equipfail.js
let equipfailData = equipfail;



equipfailData.forEach(function(equipfail) {
  // console.log(spill)
  L.circleMarker([equipfail.LOCATION_LATITUDE, equipfail.LOCATION_LONGITUDE], {
    // style: styleInfo,
    radius: equipfail.UNINTENTIONAL_RELEASE_BBLS/500, //radius based on spill volume
    color: "#aaf0d1"
  })
    .bindPopup("<h2> Operator ID#: " + equipfail.OPERATOR_ID + "</h2><hr>"
  + "<h3> Spill Volume (bbls): " + equipfail.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
  "Commodity Class: " + equipfail.COMMODITY_RELEASED_TYPE + "<br></br>" +
  "Location: " + equipfail.ONSHORE_CITY_NAME + ", " + equipfail.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
  "County: " + equipfail.ONSHORE_COUNTY_NAME + "<br></br>" +
  "Failed Part: " + equipfail.SYSTEM_PART_INVOLVED + "<br></br>" +
  "Principal Cause: " + equipfail.CAUSE + "<br></br>" +
  "Age of Failed Component (YRS): " + equipfail["COMPONENT_AGE(YEARS)"]
  .toLocaleString() + "</h3>").addTo(equipmentFailure);
});
// Then we add the 'spill information' tile layer to the map
equipmentFailure.addTo(map);
//-------------------------------------------------------------------------------

// Adding Cause Excavation as separate layer:
// Get data from excavation.js
let excavationData = excavation;



excavationData.forEach(function(excavation) {
  // console.log(spill)
  L.circleMarker([excavation.LOCATION_LATITUDE, excavation.LOCATION_LONGITUDE], {
    // style: styleInfo,
    radius: excavation.UNINTENTIONAL_RELEASE_BBLS/500, //radius based on spill volume
    color: "#006400"
  })
    .bindPopup("<h2> Operator ID#: " + excavation.OPERATOR_ID + "</h2><hr>"
  + "<h3> Spill Volume (bbls): " + excavation.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
  "Commodity Class: " + excavation.COMMODITY_RELEASED_TYPE + "<br></br>" +
  "Location: " + excavation.ONSHORE_CITY_NAME + ", " + excavation.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
  "County: " + excavation.ONSHORE_COUNTY_NAME + "<br></br>" +
  "Failed Part: " + excavation.SYSTEM_PART_INVOLVED + "<br></br>" +
  "Principal Cause: " + excavation.CAUSE + "<br></br>" +
  "Age of Failed Component (YRS): " + excavation["COMPONENT_AGE(YEARS)"]
  .toLocaleString() + "</h3>").addTo(excavationDamage);
});
// Then we add the 'spill information' tile layer to the map
excavationDamage.addTo(map);
//-------------------------------------------------------------------------------

// Adding Cause incorrect operation as separate layer:
// Get data from incorrect.js
let incorrectData = incorrect;



incorrectData.forEach(function(incorrect) {
  // console.log(spill)
  L.circleMarker([incorrect.LOCATION_LATITUDE, incorrect.LOCATION_LONGITUDE], {
    // style: styleInfo,
    radius: incorrect.UNINTENTIONAL_RELEASE_BBLS/500, //radius based on spill volume
    color: "#FED8B1"
  })
    .bindPopup("<h2> Operator ID#: " + incorrect.OPERATOR_ID + "</h2><hr>"
  + "<h3> Spill Volume (bbls): " + incorrect.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
  "Commodity Class: " + incorrect.COMMODITY_RELEASED_TYPE + "<br></br>" +
  "Location: " + incorrect.ONSHORE_CITY_NAME + ", " + incorrect.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
  "County: " + incorrect.ONSHORE_COUNTY_NAME + "<br></br>" +
  "Failed Part: " + incorrect.SYSTEM_PART_INVOLVED + "<br></br>" +
  "Principal Cause: " + incorrect.CAUSE + "<br></br>" +
  "Age of Failed Component (YRS): " + incorrect["COMPONENT_AGE(YEARS)"]
  .toLocaleString() + "</h3>").addTo(incorrectOperation);
});
// Then we add the 'spill information' tile layer to the map
incorrectOperation.addTo(map);
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------

// Adding Cause material or pipe failure as separate layer:
// Get data from matfail.js
let matfailData = matfail;



matfailData.forEach(function(matfail) {
  // console.log(spill)
  L.circleMarker([matfail.LOCATION_LATITUDE, matfail.LOCATION_LONGITUDE], {
    // style: styleInfo,
    radius: matfail.UNINTENTIONAL_RELEASE_BBLS/500, //radius based on spill volume
    color: "#EE9A4D"
  })
    .bindPopup("<h2> Operator ID#: " + matfail.OPERATOR_ID + "</h2><hr>"
  + "<h3> Spill Volume (bbls): " + matfail.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
  "Commodity Class: " + matfail.COMMODITY_RELEASED_TYPE + "<br></br>" +
  "Location: " + matfail.ONSHORE_CITY_NAME + ", " + matfail.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
  "County: " + matfail.ONSHORE_COUNTY_NAME + "<br></br>" +
  "Failed Part: " + matfail.SYSTEM_PART_INVOLVED + "<br></br>" +
  "Principal Cause: " + matfail.CAUSE + "<br></br>" +
  "Age of Failed Component (YRS): " + matfail["COMPONENT_AGE(YEARS)"]
  .toLocaleString() + "</h3>").addTo(materialFailure);
});
// Then we add the 'spill information' tile layer to the map
materialFailure.addTo(map);

//-------------------------------------------------------------------------------

// Adding Cause Natural Forces as separate layer:
// Get data from natforce.js
let natforceData = natforce;



natforceData.forEach(function(natforce) {
  // console.log(spill)
  L.circleMarker([natforce.LOCATION_LATITUDE, natforce.LOCATION_LONGITUDE], {
    // style: styleInfo,
    radius: natforce.UNINTENTIONAL_RELEASE_BBLS/500, //radius based on spill volume
    color: "#F75D59"
  })
    .bindPopup("<h2> Operator ID#: " + natforce.OPERATOR_ID + "</h2><hr>"
  + "<h3> Spill Volume (bbls): " + natforce.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
  "Commodity Class: " + natforce.COMMODITY_RELEASED_TYPE + "<br></br>" +
  "Location: " + natforce.ONSHORE_CITY_NAME + ", " + natforce.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
  "County: " + natforce.ONSHORE_COUNTY_NAME + "<br></br>" +
  "Failed Part: " + natforce.SYSTEM_PART_INVOLVED + "<br></br>" +
  "Principal Cause: " + natforce.CAUSE + "<br></br>" +
  "Age of Failed Component (YRS): " + natforce["COMPONENT_AGE(YEARS)"]
  .toLocaleString() + "</h3>").addTo(naturalForce);
});
// Then we add the 'spill information' tile layer to the map
naturalForce.addTo(map);
//-----------------------------------------------------------------------------

//-------------------------------------------------------------------------------

// Adding Cause Other Forces as separate layer:
// Get data from otherforce.js
let otherforceData = otherforce;



otherforceData.forEach(function(otherforce) {
  // console.log(spill)
  L.circleMarker([otherforce.LOCATION_LATITUDE, otherforce.LOCATION_LONGITUDE], {
    // style: styleInfo,
    radius: otherforce.UNINTENTIONAL_RELEASE_BBLS/500, //radius based on spill volume
    color: "#F9A7B0"
  })
    .bindPopup("<h2> Operator ID#: " + otherforce.OPERATOR_ID + "</h2><hr>"
  + "<h3> Spill Volume (bbls): " + otherforce.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
  "Commodity Class: " + otherforce.COMMODITY_RELEASED_TYPE + "<br></br>" +
  "Location: " + otherforce.ONSHORE_CITY_NAME + ", " + otherforce.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
  "County: " + otherforce.ONSHORE_COUNTY_NAME + "<br></br>" +
  "Failed Part: " + otherforce.SYSTEM_PART_INVOLVED + "<br></br>" +
  "Principal Cause: " + otherforce.CAUSE + "<br></br>" +
  "Age of Failed Component (YRS): " + otherforce["COMPONENT_AGE(YEARS)"]
  .toLocaleString() + "</h3>").addTo(otherOutsideforce);
});
// Then we add the 'spill information' tile layer to the map
otherOutsideforce.addTo(map);
//-----------------------------------------------------------------------------

//-------------------------------------------------------------------------------

// Adding Cause Other Incident as separate layer:
// Get data from otherincident.js
let otherincidentData = otherincident;



otherincidentData.forEach(function(otherincident) {
  // console.log(spill)
  L.circleMarker([otherincident.LOCATION_LATITUDE, otherincident.LOCATION_LONGITUDE], {
    // style: styleInfo,
    radius: otherincident.UNINTENTIONAL_RELEASE_BBLS/500, //radius based on spill volume
    color: "#6960EC"
  })
    .bindPopup("<h2> Operator ID#: " + otherincident.OPERATOR_ID + "</h2><hr>"
  + "<h3> Spill Volume (bbls): " + otherincident.UNINTENTIONAL_RELEASE_BBLS_STR + "<br></br>" +
  "Commodity Class: " + otherincident.COMMODITY_RELEASED_TYPE + "<br></br>" +
  "Location: " + otherincident.ONSHORE_CITY_NAME + ", " + otherincident.ONSHORE_STATE_ABBREVIATION + "<br></br>" +
  "County: " + otherincident.ONSHORE_COUNTY_NAME + "<br></br>" +
  "Failed Part: " + otherincident.SYSTEM_PART_INVOLVED + "<br></br>" +
  "Principal Cause: " + otherincident.CAUSE + "<br></br>" +
  "Age of Failed Component (YRS): " + otherincident["COMPONENT_AGE(YEARS)"]
  .toLocaleString() + "</h3>").addTo(otherIncident);
});
// Then we add the 'spill information' tile layer to the map
otherIncident.addTo(map);
//-----------------------------------------------------------------------------








  // // This function returns the style data for each of the spills we plot on
  // // the map. We pass the volume of the spill into two separate functions
  // // to calculate the color and radius.

  // function styleInfo(spill) {
  //   return {
  //     opacity: 1,
  //     fillOpacity: 1,
  //     fillColor: getColor(spill.CAUSE),
  //     color: "#000000",
  //     radius: getRadius(spill.UNINTENTIONAL_RELEASE_BBLS/500),
  //     stroke: true,
  //     weight: 0.5
  //   };
  // }

  // // This function determines the color of the marker based on the cause of the spill.
  // function getColor(spill) {
  //   if (CAUSE == "CORROSION FAILURE") {
  //     return "#ea2c2c";
  //   };
  //   if (CAUSE == "EQUPIMENT FAILURE") {
  //     return "#ea822c";
  //   }
  //   if (CAUSE == "EXCAVATION DAMAGE") {
  //     return "#ee9c00";
  //   }
  //   if (CAUSE == "NATURAL FORCE DAMAGE") {
  //     return "#eecc00";
  //   }
  //   if (CAUSE == "MATERIAL FAILURE OF PIPE OR WELD") {
  //     return "#d4ee00";
  //   }
  //   if (CAUSE == "OTHER OUTSIDE FORCE DAMAGE") {
  //     return "#FFFCCC";
  //   }
  //   if (CAUSE == "OTHER INCIDENT CAUSE") {
  //     return "#f4a460";
  //   }
  //   return "#e77471";
  // }
  // // 6. Use the function that determines the radius of the spill marker based on its magnitude
  // function getRadius(spill) {
  //   UNINTENTIONAL_RELEASE_BBLS/500;
  // }
