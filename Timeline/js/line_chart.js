let data_json= "prod_vs_inc.json"
Plotly.d3.json(data_json, Data => {
    var year = Object.values(Data.Year)
    console.log(year)
    var y_prod = Object.values(Data.Production)
    console.log(y_prod)
    var y_inc = Object.values(Data.Incidents_per_Year)
    console.log(y_inc)
   
        var trace1 = {
            x: year,
            y: y_inc,
            marker: {
                color: year,
                colorscale: 'Electric'
            },
            hovertemplate: '<i>Total Oil Spills: </i><b>%{y}</b>',
            type:"bar",
            name: ''
        };
        var trace2 = {
            x: year,
            y: y_inc,
            hoverinfo: 'skip'
        
        };
        var trace3 ={
            x: year,
            y: y_prod,
            yaxis: 'y2',
            hovertemplate: '<i> Total Oil Produced: </i><b>%{y}</b>',
            name: ''
                         
        } 
        var trace4 = {
            x: '2002',
            customdata: ['This is a tet']
        }                
        let layout = {
            // hovermode: false,
            title: "<b>Total Oil Spills Vs Oil Production per Year (1968 to 2021)</b>",
            yaxis:{title: "Total Oil Spills",
                titlefont: {color: 'rgb(255, 127, 14 )'},
                tickfont: {color: 'rgb(255, 127, 14 )'},
            },
            yaxis2: {
                title: 'Oil Produced (Thousand Barrels per Day)',
                titlefont: {color: 'rgb(44, 160, 44 )'},
                tickfont: {color: 'rgb(44, 160, 44 )'},
                overlaying: 'y',
                side: 'right'
            },
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
            showlegend: false,
            annotations: [
                {
                  x: '2002',
                  y: '458',
                  xref: 'x',
                  yref: 'y',
                  text: 'Pipeline Safety Improvement Act 2002 <a href=”https://www.osha.gov/laws-regs/regulations/standardnumber/1981/1981.102"/>',
                  
                  showarrow: true,
                  arrowhead: 7,
                  ax: 0,
                  ay: -40
                }]
        };
        var config = {responsive:true}
        Plotly.newPlot('plot', [trace1, trace2, trace3, trace4], layout, {displayModeBar:false}, config) 
    });
