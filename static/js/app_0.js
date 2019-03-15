function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url = "/metadata/"+sample
  d3.json(url).then(function(sample)
  {
    // Use d3 to select the panel with id of `#sample-metadata`
   var sample_metadata=d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
   sample_metadata.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
   newData= Object.entries(sample).forEach(([key,value]) =>{
    console.log(`${key}: ${value}`);
      var row=sample_metadata.append("panel-body");
      row.text(newData);
    })
    
    })
  };
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
function buildCharts(sample) 
{
  // @TODO: Use `d3.json` to fetch the sample data for the plots
var url = "/samples/"+sample;
d3.json(url).then(function(data)
{
    // @TODO: Build a Bubble Chart using the sample data
var trace1 ={
  x: data.otu_ids,
  y: data.sample_values,
  mode: 'markers',
marker: {
  color:data.otu_ids,
  size: data.sample_values,
}
};
var dataPlot= [trace1];

var layout ={xaxis:
  {title:"OTU ID"}
};
Plotly.newPlot('bubble', dataPlot, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
var dataPlot=[{
  values: data.sample_values.slice(0,10),
  labels: dataPlot.otu_ids.slice(0,10),
  hovertext: dataPlot.otu_labels.slice(0,10),
  type: 'pie'
}];
var layout = {showlegend:true};
Plotly.newPlot('pie', dataPlot, layout)
}
)}
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
