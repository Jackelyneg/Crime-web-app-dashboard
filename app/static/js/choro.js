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



function init_map() {
    myMap = L.map("map", {
        center: [41.754247, -75.052611],
        zoom: 5.5
    });

    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
}

function choro_map(crime, newyear) {




    // d3.json('hope.geojson').then(function(data) {
    d3.json(`/choropeleth_map/${crime}/${newyear}`).then(function (data) {
        console.log(data)
        // Create a new choropleth layer.
        geojson = L.choropleth(data, {

            // Define which property in the features to use.
            valueProperty: "density",

            // Set the color scale.
            scale: ["#ffffb2", "#b10026"],

            // The number of breaks in the step range
            steps: 20,

            // q for quartile, e for equidistant, k for k-means
            mode: "q",
            style: {
                // Border color
                color: "#fff",
                weight: 1,
                fillOpacity: 0.8
            },

            // Binding a popup to each layer
            onEachFeature: function (feature, layer) {
                layer.bindPopup(` Year: ${newyear}  ` + `Crime Reported:  ` + feature.properties.density + `  State :` +
                    feature.properties.name);

            }
        }).addTo(myMap);

        console.log(legend);
        // Set up the legend.
        if (legend instanceof (L.Control)) {
            console.log("removed");
            myMap.removeControl(legend);
            delete myMap.legend
        };
        legend = L.control({ position: "bottomright" });
        console.log(L.control);

        legend.onAdd = function (myMap) {
            var div = L.DomUtil.create("div", "info legend");
            var limits = geojson.options.limits;

            var colors = geojson.options.colors;
            var labels = [];

            // Add the minimum and maximum.
            var legendInfo = "<h1>crime</h1>" +
                "<div class=\"labels\">" +
                "<div class=\"min\">" + limits[0] + "</div>" +
                "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
                "</div>";

            div.innerHTML = legendInfo;


            limits.forEach(function (limit, index) {

                labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
            }
            );

            div.innerHTML += "<ul>" + labels.join("") + "</ul>";
            return div;
        };

        // Adding the legend to the map
        legend.addTo(myMap);


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





