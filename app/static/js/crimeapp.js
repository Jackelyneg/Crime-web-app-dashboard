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
    // initialising map
    // var myMap = L.map("map", {
    //     center: [41.754247,-75.052611],
    //     zoom: 5.5
    //   });
    //   // Adding the tile layer
    //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //   }).addTo(myMap);
    init_map();
    choro_map('arson', 2018);
    chartData('Florida');
}
// d3.json("/sunburst_chart").then(function(data){
//  json_file=data
function sunburstChart_redraw(newyear) {
    console.log(newyear)
    d3.json(`/sunburst_chart/${newyear}`).then(function (data) {
        console.log(data)
        chart.data(data);
    });
}
function buildMetadata_change(crime_type, state_type, newyear) {
    console.log(crime_type, state_type, newyear);
    d3.json(`/demographicdata/${crime_type}/${state_type}/${newyear}`).then((data) => {
        //  let metadata = data.metadata;
        //let resultsarray = data.filter(sampleobject=>sampleobject.state_abbr == State );
        console.log(data);
        let result = data[0]
        let panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("p").text(`${key}: ${value}`);
        });
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