
/*
	Home Portal App - Design concent
	Designed to Raspberry Pi 2

	Note: you can switch back to home if you slide to right the page

	For more information follow me on Twitter @Icebobcsi
	https://twitter.com/Icebobcsi

	Icons: http://fontawesome.io/
	Animation: http://greensock.com/gsap
	Weather icons: http://vclouds.deviantart.com/art/VClouds-Weather-Icons-179152045
	Home screen inspired by: https://www.behance.net/gallery/20006383/PORTAL-Inspire-Greatness
 */

(function() {
  var mapLoaded, showMap, showPage;

  mapLoaded = false;

  showPage = function(pageName, cb) {
    var $page, $prevPage, tl;
    $page = $(".page.page-" + pageName);
    $prevPage = $(".page:visible");
    if ($prevPage.attr("class") === $page.attr("class")) {
      return $page;
    }
    tl = new TimelineLite({
      paused: true,
      onComplete: function() {
        if (!mapLoaded && pageName === "map") {
          showMap();
          mapLoaded = true;
        }
        if (cb) {
          return cb();
        }
      }
    });
    if ($prevPage.length > 0) {
      tl.to($prevPage, 0.5, {
        x: 800,
        ease: Power3.easeIn,
        clearProps: "scale",
        onComplete: function() {
          return $prevPage.hide();
        }
      });
    }
    tl.from($page, 0.5, {
      scale: 0.6,
      delay: 0.2,
      ease: Power3.easeOut,
      onStart: function() {
        return $page.show();
      }
    });
    if (pageName === "home") {
      tl.from(".page-home .panel-time", 0.6, {
        x: -400,
        ease: Power3.easeOut
      });
      tl.from(".page-home .panel-weather", 0.6, {
        x: "+=400",
        ease: Power3.easeOut
      }, '-=0.3');
      tl.staggerFrom(".page-home .panel-functions .icon", 1.5, {
        y: 150,
        clearProps: "opacity, scale",
        ease: Elastic.easeOut
      }, 0.2, "-=0.4");
      tl.staggerFrom(".page-home .panel-calendar li", 1.5, {
        x: -400,
        ease: Power3.easeOut
      }, 0.2, "-=2");
      tl.staggerFrom(".page-home .panel-tasks li", 1.5, {
        x: 400,
        ease: Power3.easeOut
      }, 0.2, "-=1.8");
    }
    if (pageName === "weather") {
      tl.from(".page-weather .panel-now", 0.6, {
        x: -500,
        ease: Power3.easeOut
      });
      tl.from(".page-weather .panel-today", 0.6, {
        x: -500,
        ease: Power3.easeOut
      }, '-=0.2');
      tl.from(".page-weather .panel-location", 0.4, {
        x: "+=400",
        ease: Power3.easeOut
      }, '-=0.5');
      tl.staggerFrom(".page-weather .panel-forecast .box", 1.2, {
        y: 150,
        delay: 0.5,
        ease: Elastic.easeOut
      }, 0.1, "-=0.5");
    }
    if (pageName === "calendar") {
      tl.staggerFrom(".page-calendar .panel-calendar", 1.0, {
        y: -150,
        autoAlpha: 0,
        ease: Power3.easeOut
      }, 0.3);
      tl.staggerFrom(".page-calendar .panel-calendar li", 1.0, {
        y: 150,
        autoAlpha: 0,
        ease: Power3.easeOut
      }, 0.1, "-=0.6");
    }
    if (pageName === "tasks") {
      tl.staggerFrom(".page-tasks .panel-tasklist", 1.0, {
        y: -150,
        autoAlpha: 0,
        ease: Power3.easeOut
      }, 0.3, "-=0.2");
      tl.staggerFrom(".page-tasks .panel-tasklist li", 1.0, {
        y: 150,
        autoAlpha: 0,
        ease: Power3.easeOut
      }, 0.1, "-=0.8");
    }
    tl.play();
    return $page;
  };

  $(function() {
    var bigIndex, smallIndex, stopBigNews, stopSmallNews;
    $('.page').each(function(i, page) {
      var mc, type;
      if ($(page).hasClass("page-home")) {
        return;
      }
      mc = new Hammer(page, {
        preventDefault: true
      });
      type = "pan";
      mc.get(type).set({
        direction: Hammer.DIRECTION_HORIZONTAL,
        threshold: 10
      });
      return mc.on(type + 'right', function(ev) {
        mc.get(type).set({
          enable: false
        });
        console.log(ev);
        return showPage("home", function() {
          return mc.get(type).set({
            enable: true
          });
        });
      });
    });
    $(".page-home .panel-functions .icon").on("click", function() {
      TweenLite.to($(this), 0.5, {
        scale: 2.0,
        clearProps: "opacity, scale",
        opacity: 0
      });
      return showPage($(this).attr('data-page'));
    });
    $(".page-home .panel-weather").on("click", function() {
      return showPage("weather");
    });
    $(".page-home .panel-tasks").on("click", function() {
      return showPage("tasks");
    });
    $(".page-home .panel-tasks li .check").on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      return $(this).closest("li").toggleClass("checked");
    });
    $(".page-home .panel-calendar").on("click", function() {
      return showPage("calendar");
    });
    $(".page-tasks .panel-tasklist li").on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      var a = $(this).toggleClass("checked");
      return a;
    });
    $(".page-tasks .newItem .text").on("click", function(e) {
      var div;
      div = $(e.target).closest(".newItem");
      div.find(".text").hide();
      return div.find("input").val('').show().focus();
    });
    $(".page-tasks .newItem input").on("keypress", function(e) {
      var div, newLI, ul, value;
      if (e.keyCode === 13) {
        value = $(e.target).val();
        div = $(e.target).closest(".newItem");
        div.find(".text").show();
        div.find("input").hide();
        ul = div.parent().find("ul");
        newLI = $("<li/>").append([$("<div/>").addClass("check"), $("<div/>").addClass("title").text(value)]);
        ul.prepend(newLI);
        var aReturn = TweenMax.from(newLI, 1.2, {
          y: -50,
          ease: Elastic.easeOut
        });
        return aReturn;
      }
    });
    $(".page-tasks .newItem input").on("blur", function(e) {
      var div;
      div = $(e.target).parent();
      div.find(".text").show();
      return div.find("input").hide();
    });
    stopBigNews = false;
    $(".page-news .panel-newslist-big").on("mouseenter", function() {
      return stopBigNews = true;
    }).on("mouseleave", function() {
      return stopBigNews = false;
    });
    bigIndex = 1;
    setInterval(function() {
      if (stopBigNews) {
        return;
      }
      TweenLite.to(".page-news .panel-newslist-big ul", 1.5, {
        scrollTo: {
          x: bigIndex * (370 + 4)
        },
        ease: Power2.easeInOut
      });
      bigIndex++;
      if (bigIndex >= $(".page-news .panel-newslist-big li").length) {
        return bigIndex = 0;
      }
    }, 4000);
    stopSmallNews = false;
    $(".page-news .panel-newslist-small").on("mouseenter", function() {
      return stopSmallNews = true;
    }).on("mouseleave", function() {
      return stopSmallNews = false;
    });
    smallIndex = 1;
    return setInterval(function() {
      var li, top, top0;
      if (stopSmallNews) {
        return;
      }
      li = $(".page-news .panel-newslist-small li:eq(" + smallIndex + ")");
      top = li.offset().top;
      top0 = $(".page-news .panel-newslist-small li:eq(0)").offset().top;
      TweenLite.to(".page-news .panel-newslist-small", 1.5, {
        scrollTo: {
          y: top - top0
        },
        ease: Power2.easeInOut
      });
      smallIndex++;
      if (smallIndex >= $(".page-news .panel-newslist-small	li").length) {
        return smallIndex = 0;
      }
    }, 3000);
  });

  showMap = function() {
    var map, mapOptions, trafficLayer;
    mapOptions = {
      center: {
        lat: carte.lat,
        lng: carte.long
      },
      zoom: 12,
      styles: [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [
            {
              'invert_lightness': false
            }, {
              'saturation': 20
            }, {
              'lightness': 10
            }, {
              'gamma': 0.5
            }, {
              'hue': '#90C2DC'
            }
          ]
        }, {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            {
              'visibility': 'off'
            }
          ]
        }
      ]
    };
    map = new google.maps.Map($(".page-map .map").get(0), mapOptions);
    trafficLayer = new google.maps.TrafficLayer();
    return trafficLayer.setMap(map);
  };

}).call(this);
