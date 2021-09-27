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

    var sr_type = [];

    data.forEach( (call) => { 
    
        sr_type.push(call.sr_method_received_desc)
      
    });

    // get list of unique request methods
    var unique_sr_type = Array.from(new Set(sr_type))
    console.log(unique_sr_type)

    console.log(master_data);

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
   var myframe = document.getElementsByTagName("iframe")[0];
   myframe.id = "iframeid"
   console.log(new_call_type);

   data_displayed = master_data.filter(call => call.sr_method_received_desc == new_call_type);
   
   buildMap(data_displayed);
   buildSummaryTable(data_displayed);
   document.getElementById('iframeid').src = document.getElementById('iframeid').src


 }

 function cityDistrictCounts(data){
   city_district_1 = 0;
   city_district_2 = 0;
   city_district_3 = 0;
   city_district_4 = 0;
   city_district_5 = 0;
   city_district_6 = 0;
   city_district_7 = 0;
   city_district_8 = 0;
   city_district_9 = 0;
   city_district_10 = 0;
   data.forEach( (value) => {
     if(value.sr_location_council_district == "1"){
       city_district_1 += 1;
     }else if (value.sr_location_council_district == "2"){
       city_district_2 += 1;
     }else if (value.sr_location_council_district == "3"){
      city_district_3 += 1;
     }else if (value.sr_location_council_district == "4"){
      city_district_4 += 1;
     }else if (value.sr_location_council_district == "5"){
      city_district_5 += 1;
    }else if (value.sr_location_council_district == "6"){
      city_district_6 += 1;
    } else if (value.sr_location_council_district == "7"){
      city_district_7 += 1;
    } else if (value.sr_location_council_district == "8"){
      city_district_8 += 1;
    } else if (value.sr_location_council_district == "9"){
      city_district_9 += 1;
    } else if (value.sr_location_council_district == "10"){
      city_district_10 += 1;
    }
   })
 }
 function buildSummaryTable(data){ 

  cityDistrictCounts(data)

   number_of_requests = Object.keys(data).length;

   

   var PANEL = d3.select("#sample-metadata");

   PANEL.html("");

   PANEL.append("h6").text(`Number of Requests: ${number_of_requests}`);
   PANEL.append("h6").text(`District 1 Requests: ${city_district_1}`);
   PANEL.append("h6").text(`District 2 Requests: ${city_district_2}`);
   PANEL.append("h6").text(`District 3 Requests: ${city_district_3}`);
   PANEL.append("h6").text(`District 4 Requests: ${city_district_4}`);
   PANEL.append("h6").text(`District 5 Requests: ${city_district_5}`);
   PANEL.append("h6").text(`District 6 Requests: ${city_district_6}`);
   PANEL.append("h6").text(`District 7 Requests: ${city_district_7}`);
   PANEL.append("h6").text(`District 8 Requests: ${city_district_8}`);
   PANEL.append("h6").text(`District 9 Requests: ${city_district_9}`);
   PANEL.append("h6").text(`District 10 Requests: ${city_district_10}`);

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
