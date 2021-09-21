
console.log("Test")

var selector = d3.select("#selDataset");

$.ajax({
    url: "https://data.austintexas.gov/resource/xwdj-i9he.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : MyAppToken
    }
}).done(function(data) {

  call_data = data;
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
  
});

console.log(call_data)

d3.json(call_data).then((data) => {
    var sampleNames = data.sr_type_desc;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    var firstSample = sampleNames[0];
  });
