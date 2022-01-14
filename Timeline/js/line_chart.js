let data_json= "incidents_per_year.json"
Plotly.d3.json(data_json, Data => {
    console.log(Data)
    var spills = Data.Incidents_per_Year
    console.log(spills)
    var x_data = [];
    var y_data = [];
    Object.entries(spills).forEach(([year,count]) =>{
        
        X = year;
        x_data.push(X)
        console.log(X);
        Y = count;
        y_data.push(Y)
        console.log(Y);
        });
        var trace1 = {
            x: x_data,
            y: y_data,
            marker: {
                color: x_data,
                colorscale: 'Electric'
            },
            hovertemplate: '<i>Total Oil Spills: </i><b>%{y}</b>',
            type:"bar",
            name: ''
        };
        var trace2 = {
            x: x_data,
            y: y_data,
            hoverinfo: 'skip'

        };
        let layout = {
            // hovermode: false,
            title:" Total Oil Spills per Year (1968 to 2021)",
            yaxis:{title: "Total Oil Spills"},
            xaxis: {autorange: true,
                range: ['1970', '2020'],
                rangeselector: {buttons: [
                    {
                      count: 10,
                      label: '10y',
                      step: 'year',
                      stepmode: 'backward'
                    },
                    {
                      count: 20,
                      label: '20y',
                      step: 'year',
                      stepmode: 'backward'
                    },
                    {step: 'all'}
                  ]},
                rangeslider: {range: ['1968', '2017-02-16']},
                type: 'date',
                title: "Year",
            },
            showlegend: false  
        };
        var config = {responsive:true}
        Plotly.newPlot('plot', [trace1, trace2], layout, {displayModeBar:false}, config) 
    });
