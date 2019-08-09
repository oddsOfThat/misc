//Create Map, Iss Icon and Marker
const mymap = L.map('mapid').setView([0, 0], 3);

const myIcon = L.icon({
    iconUrl: 'iss.svg',
    iconSize: [40, 28],
    iconAnchor: [20, 14],
});
const iss = L.marker([0,0], {icon: myIcon}).addTo(mymap);

//Get tiles for Map
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ',
{attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',}
).addTo(mymap);

//Get and update data
const apiurl="https://api.wheretheiss.at/v1/satellites/25544"
setInterval(getData, "5000");


async function getData() {

   const raw = await fetch(apiurl);
   const data = await raw.json();
   const {latitude, longitude}= data;
   document.querySelector("#lat").innerText = latitude;
   document.querySelector("#lon").innerText = longitude;

   const circle = L.circle([latitude, longitude], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

   iss.setLatLng([latitude, longitude]);
//   return {data.latitude, data.longitude}
}
