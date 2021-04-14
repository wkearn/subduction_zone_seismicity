var mymap = L.map('map',{
    center: [0,100],
    zoom: 5,
});

var wmsLayer = L.tileLayer.wms('https://www.gmrt.org/services/mapserver/wms_merc?',{
    layers: 'GMRT',
    attribution: "Global Multi-Resolution Topography, v3.9"
}).addTo(mymap);


var colorScale = ["#FFFFFF","#FFDFDF","#FFBFBF","#FF9F9F","#FF8080","#FF6060","#FF4040","#FF2020","#FF0000"]
//var colorScale = ["#E69F00", "#56B4E9", "#009E73", "#F0E442", "#0072B2", "#D55E00", "#CC79A7", "#000000"];

function getColor(z) {

    var i = 0;
    if (z < 12) {
	i = 0;
    } else if (z < 20) {
	i = 1;
    } else if  (z < 25) {
	i = 2;
    } else if (z < 30) {
	i = 3;
    } else if (z < 33) {
	i = 4;
    } else if (z < 40) {
	i = 5;
    } else if (z < 55) {
	i = 6;
    } else if (z < 95) {
	i = 7;
    } else {
	i = 8;
    }
    
    return colorScale[i];
}

function onEachFeature(feature,layer) {
    var popupContent = "<p>Date: " + feature.properties.Month + "/" + feature.properties.Day + "/" + feature.properties.Year + "</p>";
    popupContent += "<p>Magnitude: " + feature.properties.Mag + "</p>";
    popupContent += "<p>Depth: " + feature.properties.Depth + "km </p>";
    layer.bindPopup(popupContent);
}

var earthquakes1 = L.geoJSON(earthquakes_geoJSON,{
    pointToLayer: function (feature,latlng) {
	var R = 4 * (feature.properties.Mag - 4.0);
	var C = getColor(feature.properties.Depth);
	return L.circleMarker(latlng,{
	    radius: R,
	    weight: 1.0,
	    opacity: 1.0,
	    color: "#000",
	    fillOpacity: 1.0,
	    fillColor: C
	});
    },
    filter: function (feature) {	
	return (feature.properties.Group == 1);
    },
    onEachFeature: onEachFeature,
    attribution: "Earthquake data from USGS/IRIS"
});

var earthquakes2 = L.geoJSON(earthquakes_geoJSON,{
    pointToLayer: function (feature,latlng) {
	var R = 4 * (feature.properties.Mag - 4.0);
	var C = getColor(feature.properties.Depth);
	return L.circleMarker(latlng,{
	    radius: R,
	    weight: 1.0,
	    opacity: 1.0,
	    color: "#000",
	    fillOpacity: 1.0,
	    fillColor: C,
	});
    },
    filter: function (feature) {	
	return (feature.properties.Group == 2);
    },
    onEachFeature: onEachFeature,
    attribution: "Earthquake data from USGS/IRIS"
})

var earthquakes3 = L.geoJSON(earthquakes_geoJSON,{
    pointToLayer: function (feature,latlng) {
	var R = 4 * (feature.properties.Mag - 4.0);
	var C = getColor(feature.properties.Depth);
	return L.circleMarker(latlng,{
	    radius: R,
	    weight: 1.0,
	    opacity: 1.0,
	    color: "#000",
	    fillOpacity: 1.0,
	    fillColor: C
	});
    },
    filter: function (feature) {	
	return (feature.properties.Group == 3);
    },
    onEachFeature: onEachFeature,
    attribution: "Earthquake data from USGS/IRIS"
})

var earthquakes4 = L.geoJSON(earthquakes_geoJSON,{
    pointToLayer: function (feature,latlng) {
	var R = 4 * (feature.properties.Mag - 4.0);
	var C = getColor(feature.properties.Depth);
	return L.circleMarker(latlng,{
	    radius: R,
	    weight: 1.0,
	    opacity: 1.0,
	    color: "#000",
	    fillOpacity: 1.0,
	    fillColor: C
	});
    },
    filter: function (feature) {	
	return (feature.properties.Group == 4);
    },
    onEachFeature: onEachFeature,
    attribution: "Earthquake data from USGS/IRIS"
})

function group_button (id) {
    switch (id) {
    case 0:
	mymap.removeLayer(earthquakes2);
	mymap.removeLayer(earthquakes3);
	mymap.removeLayer(earthquakes4);
	mymap.removeLayer(earthquakes1);
	break;
    case 1:
	mymap.removeLayer(earthquakes2);
	mymap.removeLayer(earthquakes3);
	mymap.removeLayer(earthquakes4);
	mymap.addLayer(earthquakes1);
	break;
    case 2:
	mymap.removeLayer(earthquakes1);
	mymap.removeLayer(earthquakes3);
	mymap.removeLayer(earthquakes4);
	mymap.addLayer(earthquakes2);
	break;
    case 3:
	mymap.removeLayer(earthquakes1);
	mymap.removeLayer(earthquakes2);
	mymap.removeLayer(earthquakes4);
	mymap.addLayer(earthquakes3);
	break;
    case 4:
	mymap.removeLayer(earthquakes1);
	mymap.removeLayer(earthquakes2);
	mymap.removeLayer(earthquakes3);
	mymap.addLayer(earthquakes4);
	break;
    default:
	mymap.addLayer(earthquakes1);
	mymap.addLayer(earthquakes2);
	mymap.addLayer(earthquakes3);
	mymap.addLayer(earthquakes4);
    }
}

legend = L.control.Legend({
    position: "bottomleft",
    collapsed: true,
    legends: [{
	label: "Depth ≤ 12 km",
	type: "rectangle",
	fillColor: colorScale[0],
	fillOpacity: 1.0
    }, {
	label: "12 km < Depth ≤ 20 km",
	type: "rectangle",
	fillColor: colorScale[1],
	fillOpacity: 1.0
    }, {
	label: "20 km < Depth ≤ 25 km",
	type: "rectangle",
	fillColor: colorScale[2],
	fillOpacity: 1.0
    }, {
	label: "25 km < Depth ≤ 30 km",
	type: "rectangle",
	fillColor: colorScale[3],
	fillOpacity: 1.0
    }, {
	label: "30 km < Depth ≤ 33 km",
	type: "rectangle",
	fillColor: colorScale[4],
	fillOpacity: 1.0
    }, {
	label: "33 km < Depth ≤ 40 km",
	type: "rectangle",
	fillColor: colorScale[5],
	fillOpacity: 1.0
    }, {
	label: "40 km < Depth ≤ 55 km",
	type: "rectangle",
	fillColor: colorScale[6],
	fillOpacity: 1.0
    }, {
	label: "55 km < Depth ≤ 95 km",
	type: "rectangle",
	fillColor: colorScale[7],
	fillOpacity: 1.0
    }, {
	label: "95 km < Depth",
	type: "rectangle",
	fillColor: colorScale[8],
	fillOpacity: 1.0	
    }]
}).addTo(mymap);
