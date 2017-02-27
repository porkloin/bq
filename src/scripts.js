var canvas;
var ctx;
var confettiHandler;
//canvas dimensions
var W;
var H;
var mp = 50; //max particles
var particles = [];
var datelock = false;

$(document).ajaxStart(function(){
    console.log("ajax started");
});

$(document).ajaxStart(function(){
    console.log("ajax stopped");
});

$(document).ready(function(){
//});
var map = L.map('map', {
  'center': [25, -100],
  'zoom': 3,
  'zoomControl': false,
  'minZoom': 3,
  'maxZoom': 3,
  'worldCopyJump': true,
  'dragging': false,
  //'maxBounds': [[90, -180], [-90, 180]],
  'layers': [
    //L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //  'attribution': 'Map data &copy; OpenStreetMap contributors'
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
    //L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	//attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
    //L.tileLayer.provider('Stamen.Watercolor')
	subdomains: ['a', 'b', 'c'],
	buffer: 8
    })
  ]
});
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    //canvas dimensions
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;


    for (var i = 0; i < mp; i++) {
        particles.push({
            x: Math.random() * W, //x-coordinate
            y: Math.random() * H, //y-coordinate
            r: randomFromTo(5, 30), //radius
            d: (Math.random() * mp) + 10, //density
            color: "rgba(" + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", 0.7)",
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: (Math.random() * 0.07) + .05,
            tiltAngle: 0
        });
    }
$('#continue').click($('#shade').hide);
$('#textcontent').css({top: window.innerHeight * .1});
//var controls = L.control.zoom({position: 'bottomleft'});
//controls.addTo(map);
//var legend = L.control({position: 'topright'});
//legend.onAdd = function (map) {
    //var div = L.DomUtil.create('div', 'info legend');
    //div.innerHTML = '<form><input id="datepicker"></form>';
    //div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    //return div;
//};
//legend.addTo(map);

var dateMin;
var rMin;
var rMax;
var url;
var myMarker;
var minrange = 0;
var maxrange = 1;
var response;
$('#datepicker').datepicker({
  yearRange:"1930:c", minDate: '-90y',
  changeMonth: true,
  changeYear: true,
  dateFormat: "yy-mm-dd",
  maxDate: '0',
  onSelect: function( selectedDate ) {
	StopConfetti();
    	$('.shade').show();
	datelock = false;
	var quakearray = new Array;
//    	$('body').addClass("loading");
	while (datelock == false){
		//console.log(quakearray);
		if(this.id == 'datepicker'){
	      		dateMin = $('#datepicker').datepicker("getDate");
			rMin = new Date(dateMin.getFullYear(), dateMin.getMonth(),dateMin.getDate() - minrange).toISOString("short");
             		rMax = new Date(dateMin.getFullYear(), dateMin.getMonth(),dateMin.getDate() + maxrange).toISOString("short");
 		}
		var orderBy = "&orderby=magnitude";
   		var endDate = moment(rMax).format('YYYY-MM-DD');
		var startDate = moment(rMin).format('YYYY-MM-DD');
		//var startDate = moment($("#datepicker").datepicker("getDate").toISOString("short")).format('YYYY-MM-DD');
		var baseurl = 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&';
		url = baseurl + 'starttime=' + startDate + '&endtime=' + endDate + orderBy;
		console.log(url);
		$.ajax({
			url: url,
			dataType: 'json',
			async: false,
			data: response,
			success: function(response){
//		$.getJSON(url, async: false, function (response) {
			//quakearray.push(response.features);
			quakearray = response.features;
			//quakearray = quakearray[0];
			console.log(quakearray);
			//if (quakearray[0].length > 0) {
			//	console.log(quakearray[0] + "inside while loop with a length of" + quakearray.length[0]);
			}
		});
		if (quakearray.length > 0) {
			datelock = true;
    			//$('body').removeClass("loading");
		}
		else {
			maxrange++;
			minrange--;
		}
	};
    	$('.shade').hide();
//end while
	/*function onEachFeature(feature, layer) {
		var quake = feature;
		var popupContent = feature.properties.title + "<br /> <br />" + feature.properties.mag;
		//quakearray.push(quake);
		mag = feature.properties.mag;
		layer.bindPopup(popupContent);
	}
	//L.geoJson(quakearray,{
	//		onEachFeature: onEachFeature,
	//});
	*/
	if (typeof myMarker != "undefined") {
		myMarker.clearLayers();
	}
	myMarker = L.geoJson(quakearray[0], {
		onEachFeature: function(feature, layer) {
			layer.bindPopup(feature.properties.title);
		}
	}).addTo(map);
	console.log(quakearray);
	var currMarker = quakearray[0];
	$('.descript1').removeClass('inactive');
	var derp = quakearray[0].geometry.coordinates;
	console.log(derp);
	StartConfetti();
	setTimeout(StopConfetti, 30000);
	$('.ribbon').show();
	$('.huzzah').show();
	$('.descript').show();
	$('.descript1').text('1) ' + quakearray[0].properties.title);
	$('.descript1').click(function(){
		if (currMarker != quakearray[0]){
			StopConfetti();
			myMarker.clearLayers();
			myMarker = L.geoJson(quakearray[0], {
				onEachFeature: function(feature, layer) {
					layer.bindPopup(feature.properties.title);
				}
			}).addTo(map);
			derp = quakearray[0].geometry.coordinates;
			$('.descript1').removeClass('inactive');
			$('.descript2').addClass('inactive');
			$('.descript3').addClass('inactive');
			map.setView([derp[1], derp[0]]);
			StartConfetti();
			setTimeout(StopConfetti, 30000);
			currMarker = quakearray[0];
		}
	});
	$('.descript2').text('2) ' + quakearray[1].properties.title);
	$('.descript2').addClass('inactive');
	$('.descript2').click(function(){
		if (currMarker != quakearray[1]){
			StopConfetti();
			myMarker.clearLayers();
			myMarker = L.geoJson(quakearray[1], {
				onEachFeature: function(feature, layer) {
					layer.bindPopup(feature.properties.title);
				}
			}).addTo(map);
			derp = quakearray[1].geometry.coordinates;
			$('.descript1').addClass('inactive');
			$('.descript2').removeClass('inactive');
			$('.descript3').addClass('inactive');
			map.setView([derp[1], derp[0]]);
			StartConfetti();
			setTimeout(StopConfetti, 30000);
			currMarker = quakearray[1];
		}
	});
	$('.descript3').text('3) ' + quakearray[2].properties.title);
	$('.descript3').addClass('inactive');
	$('.descript3').click(function(){
		if (currMarker != quakearray[2]){
			StopConfetti();
			myMarker.clearLayers();
			myMarker = L.geoJson(quakearray[2], {
				onEachFeature: function(feature, layer) {
					layer.bindPopup(feature.properties.title);
				}
			}).addTo(map);
			derp = quakearray[2].geometry.coordinates;
			$('.descript1').addClass('inactive');
			$('.descript2').addClass('inactive');
			$('.descript3').removeClass('inactive');
			map.setView([derp[1], derp[0]]);
			StartConfetti();
			setTimeout(StopConfetti, 30000);
			currMarker = quakearray[2];
		}
	});
	$('.intro').hide();
	$('#shade').hide();
	$('#datepicker').css({background: 'rgba(255,255,255,0.75', color: 'black'});
	$('#textcontent').css('pointer-events', 'none');
	$('.share').show();
	map.setView([derp[1], derp[0]]);
	map.on('click', function(){
			//myMarker.clearLayers();
			//StopConfetti();
			//$('.huzzah').hide();
			//$('.intro').css({show();
			//map.setZoom(3);
	});
		/*L.geoJson(features.features[0],{
			onEachFeature: onEachFeature,
		}).addTo(map);
		*/

	//});

	$('.nameinput').show();
	$('.nameinput').select().focus();
	$('i.fa-print').show();
	$('i.fa-print').on('click', function(){
		window.print();
	});
  }
});

});



function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < mp; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;  // Green path
        ctx.moveTo(p.x + p.tilt + (p.r / 4), p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + (p.r / 4));
        ctx.stroke();  // Draw it
    }

    update();
}
function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}
var TiltChangeCountdown = 5;
//Function to move the snowflakes
//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
var angle = 0;
var tiltAngle = 0;
function update() {
    angle += 0.01;
    tiltAngle += 0.1;
    TiltChangeCountdown--;
    for (var i = 0; i < mp; i++) {

        var p = particles[i];
        p.tiltAngle += p.tiltAngleIncremental;
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) / 2;
        p.x += Math.sin(angle);
        //p.tilt = (Math.cos(p.tiltAngle - (i / 3))) * 15;
        p.tilt = (Math.sin(p.tiltAngle - (i / 3))) * 15;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
            if (i % 5 > 0 || i % 2 == 0) //66.67% of the flakes
            {
                particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngle: p.tiltAngle, tiltAngleIncremental: p.tiltAngleIncremental };
            }
            else {
                //If the flake is exitting from the right
                if (Math.sin(angle) > 0) {
                    //Enter from the left
                    particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngleIncremental: p.tiltAngleIncremental };
                }
                else {
                    //Enter from the right
                    particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngleIncremental: p.tiltAngleIncremental };
                }
            }
        }
    }
}
function StartConfetti() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    confettiHandler = setInterval(draw, 15);
}
function StopConfetti() {
    clearTimeout(confettiHandler);
    if (ctx == undefined) return;
    ctx.clearRect(0, 0, W, H);
}
//animation loop
