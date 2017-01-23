apitype = null;
lang="lang:FR";
var meteo_url_current 	= "http://api.wunderground.com/api/"+apikey.weather_com+"/conditions/"+lang+"/q/" + meteo.codePays + "/" + meteo.location +".json?callback=?";
var meteo_url_forecast 	= "http://api.wunderground.com/api/"+apikey.weather_com+"/forecast10day/"+lang+"/q/" + meteo.codePays + "/" + meteo.location +".json?callback=?";
var meteo_url_hourly 	= "http://api.wunderground.com/api/"+apikey.weather_com+"/hourly/"+lang+"/q/" + meteo.codePays + "/" + meteo.location +".json?callback=?";

//tradu
var tab_jour	= new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");


//Affiche la meteo du jour dans la page principale
function MeteoDuJour(){
	$.getJSON(meteo_url_current, function(data) {
		//page principale
		document.getElementById('location').innerHTML = meteo.location + ", " + meteo.pays;
		document.getElementById('meteo_condition').innerHTML = data.current_observation.weather;
		document.getElementById('current_temp').innerHTML = Math.trunc(data.current_observation.temp_c);
		document.getElementById('current_weather').src = "./img/weather/"+IconeTypeDeTemps(data.current_observation.icon)+".png";
		//page meteo
		document.getElementById('location_city').innerHTML = meteo.location;
		document.getElementById('location_country').innerHTML = meteo.pays;

		document.getElementById('humidity').innerHTML = data.current_observation.relative_humidity;
		document.getElementById('wind_direction').innerHTML = data.current_observation.wind_dir;
		document.getElementById('wind_speed').innerHTML = data.current_observation.wind_kph;

	});
}

//affiche la meteo des 6 prochains jours
function Meteo10Jours(){
	date= new Date();
	$.getJSON(meteo_url_forecast, function(data) {
		//prévsion du jour
		min_day 	= data.forecast.simpleforecast.forecastday[0].low.celsius;
		max_day		= data.forecast.simpleforecast.forecastday[0].high.celsius;
		icon_day	= data.forecast.txt_forecast.forecastday[0].icon;

		document.getElementById('meteo_oftheday_min').innerHTML = min_day;
		document.getElementById('meteo_oftheday_max').innerHTML = max_day;
		document.getElementById('meteo_oftheday_icon').src = "./img/weather/"+IconeTypeDeTemps(icon_day)+".png" ;
		// 6 jours suivants
		for (var i = 1; i < 7; i++) {
			jour 	= tab_jour[(date.getDay()+i) % (tab_jour.length)];
			low 	= data.forecast.simpleforecast.forecastday[i].low.celsius;
			high 	= data.forecast.simpleforecast.forecastday[i].high.celsius;
			icon 	= data.forecast.simpleforecast.forecastday[i].icon;

			document.getElementById('meteo_day'+i).innerHTML = jour;
			document.getElementById('meteo_day'+i+'_min').innerHTML = low;
			document.getElementById('meteo_day'+i+'_max').innerHTML = high;
			document.getElementById('meteo_day'+i+"_icon").src = "./img/weather/"+IconeTypeDeTemps(icon)+".png";		
		}
	});

}

//matin, aprem ,soiree
function nextMoment(){
	$.getJSON(meteo_url_hourly, function(data) {

		for (var i = 1; i <= 3; i++) {
			moment 	= data.hourly_forecast[i*6].FCTTIME.hour;
			temp 	= data.hourly_forecast[i*6].temp.metric;
			icon 	= data.hourly_forecast[i*6].icon;

			document.getElementById('meteo_moment'+i).innerHTML = moment+":00";
			document.getElementById('meteo_moment'+i+'_temp').innerHTML = temp;
			document.getElementById('meteo_moment'+i+"_icon").src = "./img/weather/"+IconeTypeDeTemps(icon)+".png";		
		}
	});
}

//retourne le temps en francais ex Ensoileillé
function numertypeDeTemps(englishWeather) {

}

//nom icone correspondant 
function IconeTypeDeTemps(englishWeather) {
	valeurDeRetour = null;
	switch (englishWeather) {
	    case "chanceflurries":
	        valeurDeRetour = 16;
	        break;
	    case "chancerain":
	        valeurDeRetour =  9;
	        break;
	    case "chancesleet":
	        valeurDeRetour =  14;
	        break;
	    case "chancesnow":
	        valeurDeRetour = 14;
	        break;
	    case "rain":
	    	valeurDeRetour = 11;
	    	break;
	    case "chancestorms":
	        valeurDeRetour = 38;
	        break;
	    case "clear":
	        valeurDeRetour = 32;
	        break;
	    case "cloudy":
	        valeurDeRetour = 26;
	        break;
	    case "flurries":
	        valeurDeRetour = 11;
	        break;
	    case "fog":
	    	valeurDeRetour =  34;
	    	break;
	    case "hazy":
	        valeurDeRetour = 34;
	        break;
	    case "mostlycloudy":
	        valeurDeRetour = 26;
	        break;
	    case "mostlysunny":
	        valeurDeRetour = 34;
	        break;
	    case "nt_chanceflurries":
	        valeurDeRetour = 45;
	        break;
	    case "nt_chancerain":
	        valeurDeRetour = 45;
	        break;
	    case "nt_chancesleet":
	        valeurDeRetour = 46;
	        break;
	    case "nt_chancesnow":
	        valeurDeRetour = 46;
	        break;
	    case "nt_chancestorms":
	        valeurDeRetour = 47;
	        break;
	    case "nt_clear":
	        valeurDeRetour = 31;
	        break;
	    case "nt_cloudy":
	        valeurDeRetour = 27;
	        break;
	    case "nt_flurries":
	        valeurDeRetour = 45;
	        break;
	    case "nt_fog":
	        valeurDeRetour = 29;
	        break;
	    case "nt_hazy":
	        valeurDeRetour = 33;
	        break;
	    case "nt_mostlycloudy":
	        valeurDeRetour = 27;
	        break;
	    case "nt_mostlysunny":
	        valeurDeRetour = 31;
	        break;
	    case "nt_partlycloudy":
	        valeurDeRetour = 29;
	        break;
	    case "nt_partlysunny":
	        valeurDeRetour = 33;
	        break;
	    case "nt_rain":
	    	valeurDeRetour = 45;
	    	break;
	    case "nt_sleet":
	    	valeurDeRetour = 46;
	    	break;
	    case "nt_snow":
	    	valeurDeRetour = 46;
	    	break;	    	
	    case "nt_sunny":
	    	valeurDeRetour = 31;
	    	break;
	    case "nt_tstorms":
	    	valeurDeRetour = 47;
	    	break;
	    case "partlycloudy":
	    	valeurDeRetour = 30;
	    	break;
	    case "partlysunny":
	    	valeurDeRetour = 28;
	    	break;
	    default:
	    	valeurDeRetour = 44 ;
	    	break;		
		}
		return valeurDeRetour;
	
}


function startMeteo(){
	MeteoDuJour();
	Meteo10Jours();
	nextMoment();
}