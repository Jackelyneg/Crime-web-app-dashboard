/ Define function that will run on page load and populate the drop downs
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
    sunburstChart(2014)
    buildMetadata_change('arson', 'Florida', 2014)
}
// d3.json("/sunburst_chart").then(function(data){
//  json_file=data
function sunburstChart(newyear) {
    console.log(newyear)
    d3.json(`/sunburst_chart/${newyear}`).then(function (data) {
        console.log(data)
        // json_file = data[0];
        // console.log(json_file);
        // create a chart and set the data
        var chart = anychart.sunburst(data, "as-tree");
        // set the calculation mode
        chart.calculationMode("parent-independent");
        // set the chart title
        chart.title().useHtml(true);
        chart.title("Sunburst: Calculation Mode (parent-independent)<br><br>" +
                    "<span style='font-size:12; font-style:italic'>" +
                    "Number of Employees</span>");
        // set the container id
        chart.container("container");
        // initiate drawing the chart
        chart.draw();
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
    // let crime_type =d3.select("#selDataset").node().value
    // let crime_type = d3.select("#selDataset").property("value")
    let state=d3.select("#selDataset1").node().value
    let year=d3.select("#selDataset2").node().value
    buildMetadata_change(crime_type,state,year);
}
function optionChangedstate(state_type) {
    // Fetch new data each time a new sample is selected
    // let state_type = d3.select("#selDataset1").property("value")
    // let state_type =d3.select("#selDataset1").node().value
    let crime=d3.select("#selDataset").node().value
    let year=d3.select("#selDataset2").node().value
    buildMetadata_change(crime,state_type,year);
    //buildCharts(newSample);
}
function optionChanged(newyear) {
    //     // The parameter being passed in this function is new sample id from dropdown menu
    //     //console.log(sample);
    //     // Update metadata with newly selected sample
    //     // let year = d3.select("#seldataset2").property("value")
    let crime=d3.select("#selDataset").node().value
    let state=d3.select("#selDataset1").node().value
    console.log(newyear)
    sunburstChart(newyear)
    buildMetadata_change(crime,state,newyear)
    //     // Update charts with newly selected sample
}
// Initialize dashboard on page load
init();
