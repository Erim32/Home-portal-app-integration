function loadTodoList() {
  var content = " ";
 
  	//get content 
  	  $.ajax({
	    type:     "GET",
	    url:      todolist.url_fichier_sauvegarde,
        cache:false,
        contentType: "text/plain; charset=utf-8",
	    success: function(data){
	    	//pour chague ligne
	        var lignes = data.split('\n');
			for(var i = 0;i < lignes.length;i++){;
			    content = content+lignes[i];
			}	    	
			document.getElementById("todo-liste-insert").innerHTML = content;
			changeMainPageTodo(content);
		}
	});
}


function changeMainPageTodo(chaine){
 text = chaine.split('panel panel-tasklist"'); 
 text = text[todolist.colonne_home + 1].split('<ul style="height: 290px">')[1].split('</ul>')[0];
 document.getElementById("app_liste_taches").innerHTML = text;
}


function writeTodoList() {
 	var data = $("#todo-liste-insert").html();
 	//get content 
  	 var xmlhttp;
		if (window.XMLHttpRequest)
		 {// code for IE7+, Firefox, Chrome, Opera, Safari
		 xmlhttp=new XMLHttpRequest();
		 }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.open("POST",todolist.url_fichier_php,true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("content="+data);
		console.log("POST to "+todolist.url_fichier_php)

		}


function resetTodoList() {
 	//var contenu = "";
 	
  	//get data 
  	  $.ajax({
	    type:     "GET",
	    url:      todolist.url_fichier_original,
        cache:false,
        contentType: "text/plain; charset=utf-8",
	    success: function(content){	
	    	var xmlhttp;
			if (window.XMLHttpRequest)
		 	{// code for IE7+, Firefox, Chrome, Opera, Safari
		 		xmlhttp=new XMLHttpRequest();
		 	}
			else
		  	{// code for IE6, IE5
		  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  	}
			xmlhttp.open("POST",todolist.url_fichier_php,true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("content="+content);

		}
		});
  	}