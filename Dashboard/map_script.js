mymap = L.map('mapid').setView([30.2729 , -97.7444], 12.25);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,  
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicnVsbWEiLCJhIjoiY2tyMWFta3h0MjBneDMxcWh3N2c4djE4YSJ9.oJy_15dF1Y0JoP0x25O15w'
}).addTo(mymap);

function buildMap(data){

        data.forEach( (call) => {

            // console.log(call.sr_location_lat, call.sr_location_long)

            if (parseFloat(call.sr_location_lat) && parseFloat(call.sr_location_long)){

                    let mark = L.marker([parseFloat(call.sr_location_lat), parseFloat(call.sr_location_long)], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                    });

                    mark.addTo(mymap);

            }

        })

};