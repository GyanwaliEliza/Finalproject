function init() {



console.log("Test")

const master_data = []
// Grab a reference to the dropdown select element
var selector = d3.select("#selDataset");

// Make API call to 311 call dashboard and get 5000 most recent calls.
$.ajax({
    url: "https://data.austintexas.gov/resource/xwdj-i9he.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : MyAppToken
    }
}).done(function(data) {

  // master_data = data;
  // call_data = data;

  alert("Retrieved " + data.length + " records from the dataset!");

  console.log(data);

  var sr_type = [];
  var lat

  data.forEach( (call) => { 
   
      sr_type.push(call.sr_method_received_desc)
    
  });
  var unique_sr_type = Array.from(new Set(sr_type))
  console.log(unique_sr_type)

  // For each call collect the method received and populate the dropdown
  unique_sr_type.forEach( (call) => {
    selector 
      .append("option")
      .text(call)
      .property("value", call)
  })
});
}

// Initialize the dashboard
init();

 function optionChanged(new_call_type) {
   // Fetch new data each time a new filter is selected
   console.log("test");
 }


// buildMap();


// d3.json(call_data).then((data) => {
//     var sampleNames = data.sr_type_desc;

//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });
//     var firstSample = sampleNames[0];
//   });
