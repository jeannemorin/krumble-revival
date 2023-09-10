'use client';

import L from 'leaflet';
import 'leaflet-geocoder-ban/dist/leaflet-geocoder-ban.min.css';
import 'leaflet-geocoder-ban/dist/leaflet-geocoder-ban.js';


var map = L.map('mapid').setView([45.853459, 2.349312], 6)
 
L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
attribution: 'map attribution'}).addTo(map)

//var geocoder = L.geocoderBAN().addTo(map)
