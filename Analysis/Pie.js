PieChart.js

// Prepare Data
d3.json(url).then(function(receivedData){
    causeOne = receivedData.CAUSES.map(cause => CAUSES);
    console.log(causeOne);
});

// Create Pie Chart
// var pieData =

var trace = {
    labels: ['Corrosion Failure','Equipment Failure','Excavation Damage', 'Incorrect Operation',
     'Material Failure of Pipe or Weld','Natural Force Damage','Other Incident Cause', 'Other Outside Force Damage'],
    values: pieData,
    type: 'pie'
};

var data = [trace];

var layout = {
    title: 'Cause by Incident (2010 - November 2021)',
};

Plotly.newPlot('PieChart', data, layout)