import './style.css';
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(mostra_mappa);
}else{
  console.log('La geo-localizzazione NON è possibile');
}

function mostra_mappa(posizione) {

  var punto = new google.maps.LatLng(posizione.coords.latitude, posizione.coords.longitude),

  opzioni = {
    zoom: 15,
    center: punto,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  },
  contenitore = document.getElementById("mia_mappa"),
  mappa = new google.maps.Map(contenitore, opzioni),
  marker = new google.maps.Marker({
    position: punto,
    map: mappa,
    title: "Tu sei qui!"
  });
}



prova.onclick = function(){
  let apiKey = process.env.API_KEY;
  let city = document.getElementById('city').value;
  let uri = "http://api.waqi.info/feed/"+city+"/?token="+apiKey;

  var request = new XMLHttpRequest();
  request.open('GET', uri, true);
  request.onload = function(){

    var data = JSON.parse(this.response);
    var aria = data.data.aqi;
    var comm = document.getElementById('comm').innerHTML= "La qualità dell'aria è " +aria;

    try {
  var  pm2 = document.getElementById('pm2').innerHTML= data.data.iaqi.pm25.v;
  var  pm1 = document.getElementById('pm1').innerHTML= data.data.iaqi.pm10.v;
  var  no = document.getElementById('no').innerHTML= parseInt(data.data.iaqi.no2.v);
  var  so = document.getElementById('so').innerHTML= parseInt(data.data.iaqi.so2.v);
  var  o3 = document.getElementById('o3').innerHTML= parseInt(data.data.iaqi.o3.v);
  } catch(err){
  };

    try {
  var  w = document.getElementById('w').innerHTML= parseInt(data.data.iaqi.w.v) +" km/h";
  var  h = document.getElementById('h').innerHTML= parseInt(data.data.iaqi.h.v);
  var  t = document.getElementById('t').innerHTML= parseInt(data.data.iaqi.t.v) +" °";
  var  p = document.getElementById('p').innerHTML= parseInt(data.data.iaqi.p.v) +" mmHg";
  } catch(err){
  };

      var text
      switch(true){
        case (aria < 50):
        text ="Buona";
        break;
        case (aria >= 50 && aria <= 100):
        text ="Moderata";
        break;
        case (aria > 100 && aria <= 150):
        text ="Insalubre per gruppi sensibili";
        break;
        case (aria > 150 && aria <= 200):
        text ="Insalubre";
        break;
        case (aria > 200 && aria <= 300):
        text ="Molto insalubre";
        break;
        case (aria > 300 && aria > 500):
        text ="Pericolosa";
        break;
      }
document.getElementById('ri').innerHTML= text;
 }
  request.send();
}
