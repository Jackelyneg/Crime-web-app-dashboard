
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
    })
    let statesel = d3.select("#selDataset1");
    d3.json("/dropdownstatetypes").then(function (data) {
        console.log(data);
        let stateList = data;
        stateList.forEach(state => {
            statesel.append("option").text("state").property("value", state);

        });
        let yearsel = d3.select("#selDataset2");
    console.log(yearsel)
    d3.json("/dropdownyeartypes").then(function (data) {
        console.log(data);
        let yearList = data;
        yearList.forEach(y => {
            yearsel.append("option").text(y).property("value", y);
        });
    })

        let sample = arr[0];
        buildMetadata_change(sample);

    });






}
// Define a function that will create metadata for given sample


// function init() {
//     let crimesel = d3.select("#selDataset");
//     //read the json data from the first route 
//     d3.json("/dropdowncrimetypes").then(function (response) {
//         console.log(response);
//         let nameList = response;
//         nameList.forEach(nam => {
//             crimesel.append("option").text(nam).property("value", nam);

//         });

// function buildMetadata(sample) {
//     console.log(sample);
//     d3.json("/demographicdata").then((data) => {
// //  let metadata = data.metadata;
//         console.log(data);
//         let resultsarray = data.filter(sampleobject=>sampleobject.state_abbr == sample);
//         console.log(resultsarray);
//         let result = resultsarray[0]
//         let panel = d3.select("#sample-metadata");
//         panel.html("");
//         Object.entries(result).forEach(([key, value]) => {
//             panel.append("h6").text(`${key}: ${value}`);
//         });




//     });
// }
function buildMetadata_change(Crime_type,State,query_year) {
    console.log(Crime_type,State,query_year);
    d3.json(`/demographicdata/${Crime_type}/${State}/${query_year}`).then((data) => {
//  let metadata = data.metadata;
        
        //let resultsarray = data.filter(sampleobject=>sampleobject.state_abbr == State );
        console.log(resultsarray);
        let result = resultsarray[0]
        let panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });




    });
}



function optionChangedState(sample) {
    // Fetch new data each time a new sample is selected
    //buildCharts(newSample);
    let crime_type=d3.select("#selDataset1").node().value
    buildMetadata_change(sample);

}
function optionChangedCrime(sample){
    let crime_type=d3.select("#selDataset").node().value
    buildMetadata_change(sample);

}
function optionChangedYear(sample){
    let crime_type=d3.select("#selDataset3").node().value
    buildMetadata_change(query_data);

}



// Initialize dashboard on page load
init();

