  // Create variables that hold each item.
  var CAUSE = data.map(cause => cause.CAUSE);
  var AGE_OF_FACILITY = data.map(age => age.AGE_OF_FACILITY);
  var ACCIDENT_PRESSURE = data.map(pressure => pressure.ACCIDENT_PRESSURE);
  var PC1 = data.map(pc1 => pc1.PC1);
  var PC2 = data.map(pc2 => pc2.PC2);
  var PC3 = data.map(pc3 => pc3.PC3);
  var MODEL_CLASS = data.map(modelclass => modelclass.MODEL_CLASS);
  
  console.log(MODEL_CLASS);
  
  // Create the trace for the scatter plot. 
  var scatterData = [{
    x: CAUSE,
    y: ACCIDENT_PRESSURE,
    z: AGE_OF_FACILITY,
    text: {MODEL_CLASS},
    mode: "markers",
    marker: {
        size: 10,
        symbol: "Circle",
        color: MODEL_CLASS,
        colorscale: "Rainbow"
    },
    hovertemplate: 'Class: %{text} <extra></extra>',
    type: "scatter3d"
  }]; 
  
  // Create the layout for the scatter plot. 
  var scatterLayout = {
    title: "Unsupervised Machine Learning Clusters"
  };
  
  // Use Plotly to plot the data with the layout. 
  Plotly.newPlot("scatter3d", scatterData, scatterLayout);


  // Histogram of causes
  var trace = {
    x: CAUSE,
    type: "histogram"
  };
  var data = [trace];
  var layout = {
      title: "Number of Incidents Occuring for each Cause",
      xaxis: { title: "Cause of Incident" },
      yaxis: { title: "Count"}
  };
  Plotly.newPlot("histogramchart", data, layout);
  
// });