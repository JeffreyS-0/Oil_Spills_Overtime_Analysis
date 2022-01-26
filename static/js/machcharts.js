  // Create variables that hold each item.
  var CAUSE = data.map(cause => cause.CAUSE);
  var AGE_OF_FACILITY = data.map(age => age.AGE_OF_FACILITY);
  var ACCIDENT_PRESSURE = data.map(pressure => pressure.ACCIDENT_PRESSURE);
  var PC1 = data.map(pc1 => pc1.PC1);
  var PC2 = data.map(pc2 => pc2.PC2);
  var PC3 = data.map(pc3 => pc3.PC3);
  var MODEL_CLASS = data.map(modelclass => modelclass.MODEL_CLASS);
  
  console.log(MODEL_CLASS);
  
  // Create the trace for the bar chart. 
  var scatterData = [{
    x: PC1,
    y: PC2,
    z: PC3,
    text: MODEL_CLASS,
    mode: "markers",
    marker: {
        size: 12,
        symbol: "Circle",
        color: MODEL_CLASS,
        colorscale: "Rainbow"
    },
    hovertemplate: 'Class: %{text} <extra></extra>',
    type: "scatter3d"
  }]; 
  
  // Create the layout for the bar chart. 
  var scatterLayout = {
    title: "Unsupervised Machine Learning Clusters",
    margins: {   
        l: 10,
        r: 10,
        t: 10,
        b: 10
      }
  };
  
  // Use Plotly to plot the data with the layout. 
  Plotly.newPlot("scatter3d", scatterData, scatterLayout);
  
// });