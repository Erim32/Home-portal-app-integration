var tabArticlesRSS=[];


function comparaison(a,b) {
  if (a.date > b.date){
  return 1;
  }
  return 0;
}
	
function RssMain(i){
    document.getElementById('rss_main_titre').innerHTML= tabArticlesRSS[i].title;
    document.getElementById('rss_main_content').innerHTML = tabArticlesRSS[i].content;
    document.getElementById('rss_main_source').innerHTML = tabArticlesRSS[i].source;
    document.getElementById('rss_main_date').innerHTML = tabArticlesRSS[i].date;

    if(tabArticlesRSS[i].url_image != "undefined"){
      	 document.getElementById('rss_main_bg').style.display = "block";
         document.getElementById('rss_main_bg').style.background = "url('"+tabArticlesRSS[i].url_image+"')";
       }else{
       	 document.getElementById('rss_main_bg').style.display = "none";
       }   
}

function afficheRssListe(){


    //liste colonne 2
    for (var i = 0; i < tabArticlesRSS.length; i++) {
                var ul = document.getElementById("rss_liste_ul");
                var li = document.createElement("li");
               
                var div1 = document.createElement('div');
                var div2 = document.createElement('div');
                var div3 = document.createElement('div');
              //  var div4 = document.createElement('div');
                                  //ajout des heures  aux div
                div1.className = "source";
                div1.innerHTML = tabArticlesRSS[i].source;
                div2.className = "time";
                div2.innerHTML = tabArticlesRSS[i].date;
                li.appendChild(div1);

                

                div3.className = "title";
           //     div4.className = "description";
                div3.innerHTML = tabArticlesRSS[i].title;
          //      div4.innerHTML = tabArticlesRSS[i].content;

                if(tabArticlesRSS[i].url_image != "undefined"){
                    var div0 = document.createElement('div');
                    div0.className="image";
                    div0.style.background = "url('"+tabArticlesRSS[i].url_image+"')";
                    li.appendChild(div0);
                }
                li.appendChild(div3);
            //    li.appendChild(div4);
                li.appendChild(div2);
                ul.appendChild(li);
                (function(i){
                li.addEventListener("click", function() {
                    RssMain(i);
                }, false);})(i);
 
    }
    

}

function refreshRSS() {
    var urls = rss.liste_urls;

    urls.forEach(function(Query){
    $.ajax({
      type: "GET",
      url: 'http://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(Query),
      error: function () {
      alert('Impossible de charcher le flux, Url invalide ou erreur de flux.');
      },
      success: function(xml) {
    //--Target ID's By content_1/2

    var Content=parseInt(urls.indexOf(Query))+1;
      //  $("#content_"+Content).html(''); 

      var source = xml.feed.title;
        $.each(xml.items, function(idx, value){
            var url_image = "undefined";
            if (typeof value.enclosure != "undefined") {
                url_image = value.enclosure.link;
            }

            contentRss = {
                    title : value.title,
                    content: value.description,
                    date : value.pubDate,
                    url_image:  url_image,
                    source: source,
                    link: value.link
                };
            tabArticlesRSS.push(contentRss);    
             RssMain(0);   
      }); //end foreach
        //trier puis afficher
         tabArticlesRSS.sort(comparaison);

        afficheRssListe();

    }


    });
    });
      
}


function startRSS(){
    //Call GetFeeds every 5 seconds.
  //  setInterval(refreshRSS,5000);
    //Page is ready, get feeds.
    refreshRSS();
}