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
    text: MODEL_CLASS,
    mode: "markers",
    marker: {
        size: 10,
        symbol: "Circle",
        color: MODEL_CLASS,
        colorscale: "Portland"
    },
    hovertemplate: 'Class: %{text} <extra></extra>',
    type: "scatter3d"
  }]; 
  
  // Create the layout for the scatter plot. 
  var scatterLayout = {
    autosize: false,
    width: 1100,
    height: 600,
    title: "Unsupervised Machine Learning Clusters"
  };
  
  // Use Plotly to plot the data with the layout. 
  Plotly.newPlot("scatter3d", scatterData, scatterLayout);


  // Histogram of causes
  //var trace = {
    //x: CAUSE,
    //type: "histogram"
  //};
  //var data = [trace];
  //var layout = {
      //title: "Number of Incidents Occuring for each Cause",
      //width: 1200,
      //height: 600,
      //xaxis: {
        //automargin: true,
        //tickangle: 45,
        //title: {
          //text: "Cause of Incident",
          //standoff: 10
        //}},
      //yaxis: { title: "Count"},
  //};
  //Plotly.newPlot("histogramchart", data, layout);


  // Histogram of Equipment Failure ages
  // Create variables that hold each item.
  var Class1Ages = class1data.map(age => age.AGE_OF_FACILITY);

  var class1trace = {
    x: Class1Ages,
    marker: {
      color: 'OliveDrab',
    },
    type: "histogram"
  };
  var class1data = [class1trace];
  var class1layout = {
      title: "Ages of Facilities with Spills Resulting from Equipment Failures",
      width: 1000,
      height: 600,
      xaxis: { title: "Age of Facility at Time of Incident" },
      yaxis: { title: "Count"}
  };
  Plotly.newPlot("histogramchart2", class1data, class1layout);

  // Histogram of Corrosion Failure ages
  // Create variables that hold each item.
  var Class2Ages = class2data.map(age => age.AGE_OF_FACILITY);

  var class2trace = {
    x: Class2Ages,
    marker: {
      color: 'OliveDrab',
    },
    type: "histogram"
  };
  var class2data = [class2trace];
  var class2layout = {
      title: "Ages of Facilities with Spills Resulting from Equipment Failures",
      width: 1000,
      height: 600,
      xaxis: { title: "Age of Facility at Time of Incident" },
      yaxis: { title: "Count"}
  };
  Plotly.newPlot("histogramchart3", class2data, class2layout);
  
// });
