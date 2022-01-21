
// Bacteria to Beef , charts from samples.json
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of spills names to populate the select options
  d3.json("mapping.json").then((data) => {
    var spillCause = data.OPERATOR_ID;

    spillCause.forEach((spill) => {
      selector
        .append("option")
        .text(spill)
        .property("value", spill);
    });

    // Use the first sample from the list to build the initial plots
    var firstSpill = sampleCause[0];
    buildCharts(firstSpill);
    buildMetadata(firstSpill);
  });
}

// Initialize the dashboard
init();

function optionChanged(newCause) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newCause);
  buildCharts(newCause);
}

// Demographics Panel 
function buildMetadata(spill) {
  d3.json("mapping.json").then((data) => {
    var spill = data.OPERATOR_ID;
    
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    
    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}