
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
                statesel.append("option").text(state).property("value", state);

            });
        })


        


        }

// function init() {
//     let crimesel = d3.select("#selDataset");
//     //read the json data from the first route 
//     d3.json("/dropdowncrimetypes").then(function (response) {
//         console.log(response);
//         let nameList = response;
//         nameList.forEach(nam => {
//             crimesel.append("option").text(nam).property("value", nam);

//         });





// Initialize dashboard on page load
init();