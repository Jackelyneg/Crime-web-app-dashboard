var myMap;
var legend;
var chart;
// Define function that will run on page load and populate the drop downs
function init() {
    nameSel = d3.select("#selDataset");
    // Read json data
    d3.json("/dropdowncrimetypes").then(function (response) {

        console.log(response);
        arr = response;
        arr.forEach((nam) => {

            nameSel.append("option").text(nam).property("value", nam);
        });
    });
    console.log("hello world")

    let statesel = d3.select("#selDataset1");
    console.log(statesel)
    d3.json("/dropdownstatetypes").then(function (data) {
        console.log(data);
        let stateList = data;
        stateList.forEach(state => {
            statesel.append("option").text(state).property("value", state);

        });
    })
    let yearsel = d3.select("#selDataset2");
    console.log(yearsel)
    d3.json("/dropdownyeartypes").then(function (data) {
        console.log(data);
        let yearList = data;
        yearList.forEach(y => {
            yearsel.append("option").text(y).property("value", y);

        });



    })
    sunburstChart_init(2018)

    buildMetadata_change('arson', 'Florida', 2018)
    
    init_map();
    choro_map('arson', 2018);
    chartData('Florida');

}


function sunburstChart_redraw(newyear) {
    console.log(newyear)
    d3.json(`/sunburst_chart/${newyear}`).then(function (data) {


        console.log(data)



        chart.data(data);



    });

}

function sunburstChart_init(newyear) {
    console.log(newyear)
    d3.json(`/sunburst_chart/${newyear}`).then(function (data) {


        console.log(data)
        // json_file = data[0];
        // console.log(json_file);
        // create a chart and set the data

        chart = anychart.sunburst(data, "as-tree");

        // set the calculation mode
        chart.calculationMode("parent-independent");

        // set the chart title
        chart.title().useHtml(true);
        chart.title("Sunburst: Calculation Mode (parent-independent)<br><br>" +
            "<span style='font-size:12; font-style:italic'>" +
            "Crime Reported Per Year Per State </span>");

        // set the container id
        chart.container("sunburst");


        // initiate drawing the chart
        chart.draw();


    });

}
function optionChangedcrime(crime_type) {

    let state = d3.select("#selDataset1").node().value
    let newyear = d3.select("#selDataset2").node().value
    buildMetadata_change(crime_type, state, newyear);
    choro_map(crime_type, newyear);
}
function optionChangedstate(state_type) {

    let crime = d3.select("#selDataset").node().value
    let newyear = d3.select("#selDataset2").node().value
    buildMetadata_change(crime, state_type, newyear);
    chartData(state_type);

    //buildCharts(newSample);
}
function optionChanged(newyear) {

    let crime = d3.select("#selDataset").node().value
    let state = d3.select("#selDataset1").node().value

    // sunburstChart(newyear)
    sunburstChart_redraw(newyear)
    buildMetadata_change(crime, state, newyear)
    console.log(newyear)
    choro_map(crime, newyear);
    //     // Update charts with newly selected sample
}
// Initialize dashboard on page load
init();