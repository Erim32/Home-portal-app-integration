var calendar_url = "https://www.googleapis.com/calendar/v3/calendars/"+calendrier.calendarId+"/events?alwaysIncludeEmail=false&key="+apikey.google_calendar;
//var tab_jour=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
var tab_mois=new Array("Décembre", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin","Juillet","Août","Septembre","Octobre","Novembre");
var tabEvent = [ ];
var evenements;

var now 		=	new Date;
var now_year 	=	now.getFullYear();
var now_month 	=	now.getMonth();
var now_day		= 	now.getDate();
var now_hour 	= 	now.getHours();
var now_mins 	= 	now.getMinutes();


function compare(a,b) {
  if (a.start.timestamp > b.start.timestamp)
    return 1;
  return 0;
}


function afficher_eventslist(tab){
		var cpt = 0;
		var max = tabEvent.length;
		var finPremierJour = Boolean(0); //false
		var finSecondJour = Boolean(0);	 //false
		var nbrJourDifference;
		var titre_col1;

		if(cpt < max){
			nbrJourDifference = (tabEvent[cpt].start.timestamp  - now)/(86400 *1000);
			
			if(nbrJourDifference < 1) titre_col1 = "Aujourd'hui";
			else{
				if(nbrJourDifference < 2) titre_col1 = "Demain";
				else{
					if(nbrJourDifference < 7) titre_col1 ="Dans "+nbrJourDifference+" jours.";
					else titre_col1 = "Prochainement";
				}
			}
			document.getElementById('planning_col1_title').innerHTML = titre_col1;
			document.getElementById('planning_col1_date').innerHTML = tabEvent[0].start.day +" " + 	tab_mois[tabEvent[0].start.month] +" "+tabEvent[0].start.year;
		}
		while((cpt < max ) && (!finPremierJour)){
			if(tabEvent[cpt].start.day == tabEvent[0].start.day){
				//ajouter au planning premiere colonne planning_col1_ul
				 var ul = document.getElementById("planning_col1_ul");
 				 var li = document.createElement("li");
 				 var div1 = document.createElement('div');
 				 var div2 = document.createElement('div');

 				 //ajout des heures  aux div
	 		 	div1.className = "time";
	 		 	div1.innerHTML = tabEvent[cpt].start.hour+":"+tabEvent[cpt].start.mins+" - "+tabEvent[cpt].end.hour+":"+tabEvent[cpt].end.mins;;
	 		 	div2.className = "title";
	 		 	div2.innerHTML = tabEvent[cpt].title;

	 		 	li.appendChild(div1);
	 		 	li.appendChild(div2);
	  			ul.appendChild(li);

	  			//ajout a la page principale
	  			if((cpt < 3)  && (tabEvent[cpt].start.year == now_year) && (tabEvent[cpt].start.month == now_month) &&(tabEvent[cpt].start.day == now_day)){
					var ul = document.getElementById("liste_event_day");
		 			var li = document.createElement("li");
		 			var div1 = document.createElement('div');
		 			var div2 = document.createElement('div');
		 		 	
		 		 	//ajout des heures  aux div
		 		 	div1.className = "time";
		 		 	div1.innerHTML = tabEvent[cpt].start.hour+":"+tabEvent[cpt].start.mins+" - "+tabEvent[cpt].end.hour+":"+tabEvent[cpt].end.mins;;
		 		 	div2.className = "title";
		 		 	div2.innerHTML = tabEvent[cpt].title;

		 		 	li.appendChild(div1);
		 		 	li.appendChild(div2);
		  			ul.appendChild(li);
				}
	  			//incrementation
				cpt += 1;
			}else{
				finPremierJour=Boolean(1);
			}
		}



		var titre_col2;
		var indiceSecondJour = cpt;
		if(cpt < max){
			nbrJourDifference = (tabEvent[cpt].start.timestamp  - now)/(86400 *1000);
			if(nbrJourDifference < 2) titre_col2 = "Demain";
			else{
					if(nbrJourDifference < 7) titre_col2 ="Dans "+nbrJourDifference+" jours.";
					else titre_col2 = "Prochainement";
			}
			
			document.getElementById('planning_col2_title').innerHTML = titre_col2;
			document.getElementById('planning_col2_date').innerHTML = tabEvent[cpt].start.day +" " + 	tab_mois[tabEvent[cpt].start.month] +" "+tabEvent[cpt].start.year;
		}

		//second tableau
		while((cpt < max ) && (!finSecondJour)){
			if(tabEvent[cpt].start.day == tabEvent[indiceSecondJour].start.day){
				//ajouter au planning premiere colonne planning_col1_ul
				 var ul = document.getElementById("planning_col2_ul");
 				 var li = document.createElement("li");
 				 var div1 = document.createElement('div');
 				 var div2 = document.createElement('div');
 				 //ajout des heures  aux div
	 		 	div1.className = "time";
	 		 	div1.innerHTML = tabEvent[cpt].start.hour+":"+tabEvent[cpt].start.mins+" - "+tabEvent[cpt].end.hour+":"+tabEvent[cpt].end.mins;;
	 		 	div2.className = "title";
	 		 	div2.innerHTML = tabEvent[cpt].title;

	 		 	li.appendChild(div1);
	 		 	li.appendChild(div2);
	  			ul.appendChild(li);
				cpt += 1;
			}else{
				finSecondJour=Boolean(1);
			}
		}

}	

function refreshCalendar() {


	$.getJSON(calendar_url, function(data) {
		data.items.forEach(function(event) {
		  	var date = new Date(Date.parse(event.start.dateTime));

			//si le event n'est pas passé	
			if(date >= now){
				//recup variables
				event_t =  date;
				event_title 	=  event.summary;
		  		event_s_y 		=  date.getFullYear();
				event_s_m 		=  date.getMonth();
				event_s_d 		=  date.getDate();
				event_s_h 		=  date.getHours();
				event_s_mins 	=  date.getMinutes();

				event_e_t 		= new Date(Date.parse(event.end.dateTime));
		  		event_e_y 		=  event_e_t.getFullYear();
				event_e_m 		=  event_e_t.getMonth();
				event_e_d 		=  event_e_t.getDate();
				event_e_h 		=  event_e_t.getHours();
				event_e_mins 	=  event_e_t.getMinutes();
				if(event_s_mins < 10) event_s_mins = "0"+event_s_mins;
				if(event_e_mins < 10) event_e_mins = "0"+event_e_mins;

				evenements  = {
					title : event.summary,
					start : {
								timestamp : event_t,
								year      : event_s_y,
								month     : event_s_m,
								day       : event_s_d,
								hour      : event_s_h,
								mins      : event_s_mins
					},
					end   :	{
								timestamp : event_e_t,
								year      : event_e_y,
								month     : event_e_m,
								day       : event_e_d,
								hour      : event_e_h,
								mins      : event_e_mins
					}
				};


				tabEvent.push(evenements);

			}
			});
		tabEvent.sort(compare);
		afficher_eventslist(tabEvent);
	});
}


function startCalendar(){
	refreshCalendar();
}