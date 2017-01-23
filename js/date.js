function startDate(){
	var today 	= new Date();
    var numJour = today.getDate();
    var annee 	= today.getFullYear();
    
    switch (new Date().getDay()) {
    case 0:
        jour = "Dimanche";
        break;
    case 1:
        jour = "Lundi";
        break;
    case 2:
        jour = "Mardi";
        break;
    case 3:
        jour = "Mercredi";
        break;
    case 4:
        jour = "Jeudi";
        break;
    case 5:
        jour = "Vendredi";
        break;
    case 6:
        jour = "Samedi";
	}


    switch (new Date().getMonth()) {
    case 0:
        mois = "Janvier";
        break;
    case 1:
        mois = "Février";
        break;
    case 2:
        mois = "Mars";
        break;
    case 3:
        mois = "Avril";
        break;
    case 4:
        mois = "Mai";
        break;
    case 5:
        mois = "Juin";
        break;
    case 6:
        mois = "Juillet";
        break;
    case 7:
        mois = "Août";
        break;
    case 8:
        mois = "Septembre";
        break;
    case 9:
        mois = "Octobre";
        break;
    case 10:
        mois = "Novembre"    
        break;
    case 11:
        mois = "Décembre"
        break;
    }

	document.getElementById('date').innerHTML = jour + " " + numJour + " " + mois + " " + annee;
}