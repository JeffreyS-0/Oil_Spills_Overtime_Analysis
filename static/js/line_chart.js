let data_json= "Resources/prod_vs_inc.json"
Plotly.d3.json(data_json, Data => {
    var year = Object.values(Data.Year)
    var y_prod = Object.values(Data.Production)
    var y_inc = Object.values(Data.Incidents_per_Year)
   
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
        };               
        let layout = {
            // hovermode: false,
            title: "<b>Total Oil Spills vs Total Barrels of Production per Year (1968 to 2021)</b>",
            titlefont: {color: 'rgb(198,102,62)'},
            yaxis:{
                title: "<b>Total Oil Spills</b>",
                titlefont: {color: 'rgb(255, 127, 14 )'},
                tickfont: {color: 'rgb(255, 127, 14 )'},
            },
            yaxis2: {
                title: '<b>Oil Produced (Thousand Barrels per Day)</b>',
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
                  x: '1968',
                  y: '504',
                  xref: 'x',
                  yref: 'y',
                  text: '<a href= "https://www.phmsa.dot.gov/working-phmsa/state-programs/natural-gas-pipeline-safety-act-1968">Natural Gas Pipeline Safety Act of 1968</a>',
                  showarrow: true,
                  arrowhead: 7,
                  ax: 0,
                  ay: -40
                },
                {
                  x: '1976',
                  y: '212',
                  xref: 'x',
                  yref: 'y',
                  text: 'Natural Gas Pipeline Safety Act amended',
                  showarrow: true,
                  arrowhead: 7,
                  ax: 0,
                  ay: -90
                },
                {
                    x: '1979',
                    y: '252',
                    xref: 'x',
                    yref: 'y',
                    text: '<a href= "https://www.phmsa.dot.gov/working-phmsa/state-programs/hazardous-liquid-pipeline-safety-act-1979">Pipeline Safety Act of 1979</a>',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 0,
                    ay: -40
                },
                {
                    x: '1988',
                    y: '193',
                    xref: 'x',
                    yref: 'y',
                    text: '<a href= "https://www.congress.gov/bill/100th-congress/house-bill/2266">Act of 1988 </a>',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 0,
                    ay: -80
                },
                {
                    x: '1992',
                    y: '212',
                    xref: 'x',
                    yref: 'y',
                    text: '<a href= "https://www.govinfo.gov/content/pkg/STATUTE-106/pdf/STATUTE-106-Pg3289.pdf">The Pipeline Safety<br></br>Act of 1992</a>',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 0,
                    ay: -70
                },
                {
                    x: '1996',
                    y: '194',
                    xref: 'x',
                    yref: 'y',
                    text: '<a href= "https://www.govtrack.us/congress/bills/104/s1505">Act of 1996</a>',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 0,
                    ay: -40
                },
                {
                  x: '2002',
                  y: '458',
                  xref: 'x',
                  yref: 'y',
                  text: '<a href= "https://www.phmsa.dot.gov/pipeline/congressional-mandates/pipeline-safety-improvement-act-2002">Pipeline Saftety <br></br>Act of 2002</a>',
                  showarrow: true,
                  arrowhead: 7,
                  ax: 0,
                  ay: -40
                }]
        };
        var config = {responsive:true}
        Plotly.newPlot('line_chart', [trace1, trace2, trace3], layout, {displayModeBar:false}, config);
    });
