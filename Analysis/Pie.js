// Create Pie Chart
var pieData = d3.json('Data/cause_pie_chart.json').then(function(data) {
    var info = data.REPORT_NUMBER;
    var pieNums = Object.values(info)
    console.log(info);
    console.log(pieNums);
});
// var colors = ['Thistle', 'Tan', 'CornflowerBlue', 'DarkOliveGreen', 'LightPurple', 'GoldenRod', 'Sienna','Salmon'];

var trace = {
    labels: ['Corrosion Failure','Equipment Failure','Excavation Damage', 'Incorrect Operation',
     'Material Failure of Pipe or Weld','Natural Force Damage','Other Incident Cause', 'Other Outside Force Damage'],
    values: [944, 2124, 165, 674, 310, 217, 114, 91],
    marker: {
        colorscale: 'Electric'},
    type: 'pie'
};

var data = [trace];

var layout = {
    title: 'Cause by Incident (2010 - November 2021)',
};

Plotly.newPlot('pie_chart', data, layout)