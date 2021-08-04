"use strict";
function init() {
  // Read json data


  let stateSel = d3.select("#selState");
  d3.json("/dropdownstates").then(function (data) {
    // console.log(data);
    let stateList = data;
    console.log(stateList);

    stateList.forEach(s => {
      stateSel.append("option").text(s).property("value", s);
    })
    //let stateValue = ''
    d3.selectAll("#selState").on("click", function () {
      let stateVal = this.value;
      console.log(stateVal);
      createChart(stateVal);
    })



    // Object.keys(educationDict).forEach(k => {
    //   console.log(k, ':', educationDict[k].state_abbr, educationDict[k].sum);
    // })


    // d3.json("/offense").then(function (data) {
    //   let stateOffense = data;
    //   console.log(stateOffense);
    // })

    // function optionChanged(state) {
    //   d3.selectAll("#selState").on("click", function () {
    //     let selectedValue = this.value;
    //     console.log(selectedValue);
    //     document.getElementById("bar").innerHTML = "";
    //   })
    // }


    function createChart(state) {
      let popList = [];
      let eduList = [];
      let polList = [];
      let incList = [];

      console.log(state);
      d3.json(`/state_data/${state}`).then((data) => {

        console.log(Object.values(data));
        console.log(data[0]);

        data.forEach((entry) => {
          // console.log(entry);
          incList.push(Object.values(entry)[0]);
          eduList.push(Object.values(entry)[1]);
          polList.push(Object.values(entry)[2]);
          ypop.push(Object.values(entry)[3]);


          console.log(incList);
          console.log(eduList);
          console.log(polList);
          console.log(popList);
        })



        let trace1 = {
          x: [2014, 2015, 2016, 2017, 2018],
          y: [],
          type: 'bar',
          name: 'Population',
          marker: {
            color: 'rgb(49,130,189)',
            opacity: 0.7,
          }
        }

        let trace2 = {
          x: [2014, 2015, 2016, 2017, 2018],
          y: [10, 20, 30, 40, 50],
          type: 'bar',
          name: 'Education - % of HS or Higher Degree Holders (Ages: 25-44)',
          marker: {
            color: 'rgb(204,204,204)',
            opacity: 0.5
          }
        };

        let trace3 = {
          x: [2014, 2015, 2016, 2017, 2018],
          y: [50, 50, 70, 80, 80],
          type: 'bar',
          name: 'Number of Police',
          marker: {
            color: 'rgb(124,252,0)',
            opacity: 0.5
          }
        };
        let trace4 = {
          x: [2014, 2015, 2016, 2017, 2018],
          y: [10, 20, 30, 40, 50],
          type: 'bar',
          name: 'Yearly Income',
          marker: {
            color: 'rgb(255,0,0)',
            opacity: 0.5
          }
        };


        let chartData = [trace1, trace2, trace3, trace4];

        let layout = {
          title: 'STATE STATISTICS',
          xaxis: {
            tickangle: -45
          },
          barmode: 'group'

        };


        Plotly.newPlot('bar', chartData, layout);

      });
    }
  });
  
  
};

init();
