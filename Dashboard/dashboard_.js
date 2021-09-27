function init() {

  console.log("Test")

  master_data = []
  data_displayed = []

  phone_layer = {}
  spot311_layer = {}
  web_layer = {}
  mobile_layer = {}
  other_layer = {}
  email_layer = {}
  field_request_layer = {}
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

    master_data = data;

    alert("Retrieved " + data.length + " records from the dataset!");

    var sr_type = [];

    data.forEach( (call) => { 
    
        sr_type.push(call.sr_method_received_desc)
      
    });

    // get list of unique request methods
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
   console.log(new_call_type);

   data_displayed = master_data.filter(call => call.sr_method_received_desc == new_call_type);

   buildMap(data_displayed);

   console.log(other_layer)
 }

 function onEachFeature(feature, layer) {
   if(feature.sr_method_received_desc == "Phone"){
    phone_layer.addLayer(layer);
   } else if (feature.sr_method_received_desc == "Spot311 Interface"){
     spot311_layer.addLayer(layer);
   } else if (feature.sr_method_received_desc == "Web"){
    web_layer.addLayer(layer);
  } else if (feature.sr_method_received_desc == "Mobile Device"){
    mobile_layer.addLayer(layer);
  } else if (feature.sr_method_received_desc == "Other"){
    other_layer.addLayer(layer);
  } else if (feature.sr_method_received_desc == "E-mail"){
    email_layer.addLayer(layer);
  } else if (feature.sr_method_received_desc == "Field Request"){
    field_request_layer.addLayer(layer);
  }
 };
