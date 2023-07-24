//intitial money
let money=100;
let techPoint=0;
let chemRockets=0;


//destinations-selections status
let selectMoon = false


//scanned status
let moonScanned = false;


//render on first load
$(document).ready(function () {
  $('.money-amount').append(money);
  $('#tech-point-page').append(techPoint);
  $('.chem-rocket-stats-section').hide();
  $("#destination-page").hide();
  $("#moon-info-mission").hide();
  $("#scan-moon-btn").hide();
  })
  

//show-hide-new-rocket-page
$(document).ready(function(){
  $("#new-rocket-btn").click(function(){
    $(".main-page-items").hide();
    $("#new-rocket-page").show();
  });
  //show selected btn details and hide other in a submenu
  $("#new-chem-rocket-detail").hide();
  $("#moon-lander-detail").hide();
  $("#new-chem-sat-btn").focus(function(){
    $("#new-chem-rocket-detail").show();
    $("#moon-lander-detail").hide();
  });
  $("#new-moon-lander-btn").focus(function(){
    $("#moon-lander-detail").show();
    $("#new-chem-rocket-detail").hide();
  });

});


//back-btn action
$(document).ready(function(){
    $(".back-btn").click(function(){
      $("#science-page").hide();
      $("#destination-page").hide();
      $("#new-rocket-page").hide();
      $("#missions-page").hide();
      $(".main-page-items").show();
    });
  });


//build chem rocket and rerender
$( "#chem-rocket-build-btn" ).on( "click", function() {
  if(money>=50){
    money-=50;
    chemRockets+=1;
    $("#new-rocket-page").hide();
    $("#missions-page").show();
    chemRocketBtnRender();
  //rerender money amount in main and page
  $('.money-amount').empty().append(money);
  $('#chem-rocket-amount-main').empty().append("Chemical Rocket: " + chemRockets); 
  }
  else{
    $("#chem-rocket-build-btn").css("color", "red");
  }
} );


//show-hide-missions-page
$(document).ready(function(){
  $("#missions-btn").click(function(){
    $(".main-page-items").hide();
    $("#missions-page").show();
    chemRocketBtnRender(); 
    chemRocketStatHide();
  });
});


//change sub-menus-science # show right-sidebar and hide other when clicking a left-sidebar btn
$(document).ready(function(){
  $("#science-btn-1").click(function(){
    $("#left-section-science-1").show();
    $("#left-section-science-2").hide();
    $("#left-section-science-3").hide();
    $("#left-section-science-4").hide();
    $("#left-section-science-5").hide();
    $("#right-section-science-1").show();
    $("#right-section-science-2").hide();
    $("#right-section-science-3").hide();
    $("#right-section-science-4").hide();
    $("#right-section-science-5").hide();
  });
});
$(document).ready(function(){
  $("#science-btn-2").click(function(){
    $("#left-section-science-2").show();
    $("#left-section-science-1").hide();
    $("#left-section-science-3").hide();
    $("#left-section-science-4").hide();
    $("#left-section-science-5").hide();
    $("#right-section-science-2").show();
    $("#right-section-science-1").hide();
    $("#right-section-science-3").hide();
    $("#right-section-science-4").hide();
    $("#right-section-science-5").hide();
  });
});
$(document).ready(function(){
  $("#science-btn-3").click(function(){
    $("#left-section-science-3").show();
    $("#left-section-science-1").hide();
    $("#left-section-science-2").hide();
    $("#left-section-science-4").hide();
    $("#left-section-science-5").hide();
    $("#right-section-science-3").show();
    $("#right-section-science-1").hide();
    $("#right-section-science-2").hide();
    $("#right-section-science-4").hide();
    $("#right-section-science-5").hide();
  });
});
$(document).ready(function(){
  $("#science-btn-4").click(function(){
    $("#left-section-science-4").show();
    $("#left-section-science-1").hide();
    $("#left-section-science-2").hide();
    $("#left-section-science-3").hide();
    $("#left-section-science-5").hide();
    $("#right-section-science-4").show();
    $("#right-section-science-1").hide();
    $("#right-section-science-2").hide();
    $("#right-section-science-3").hide();
    $("#right-section-science-5").hide();
  });
});
$(document).ready(function(){
  $("#science-btn-5").click(function(){
    $("#left-section-science-5").show();
    $("#left-section-science-1").hide();
    $("#left-section-science-2").hide();
    $("#left-section-science-3").hide();
    $("#left-section-science-4").hide();
    $("#right-section-science-5").show();
    $("#right-section-science-1").hide();
    $("#right-section-science-2").hide();
    $("#right-section-science-3").hide();
    $("#right-section-science-4").hide();
  });
});


//change sub-menus-new-rocket
$(document).ready(function(){
  $("#new-rocket-btn-1").click(function(){
    $("#left-section-new-rocket-1").show();
    $("#left-section-new-rocket-2").hide();
    $("#left-section-new-rocket-3").hide();
    $("#left-section-new-rocket-4").hide();
    $("#right-section-new-rocket-1").show();
    $("#right-section-new-rocket-2").hide();
    $("#right-section-new-rocket-3").hide();
    $("#right-section-new-rocket-4").hide();
  });
});
$(document).ready(function(){
  $("#new-rocket-btn-2").click(function(){
    $("#left-section-new-rocket-2").show();
    $("#left-section-new-rocket-1").hide();
    $("#left-section-new-rocket-3").hide();
    $("#left-section-new-rocket-4").hide();
    $("#right-section-new-rocket-2").show();
    $("#right-section-new-rocket-1").hide();
    $("#right-section-new-rocket-3").hide();
    $("#right-section-new-rocket-4").hide();
  });
});
$(document).ready(function(){
  $("#new-rocket-btn-3").click(function(){
    $("#left-section-new-rocket-3").show();
    $("#left-section-new-rocket-1").hide();
    $("#left-section-new-rocket-2").hide();
    $("#left-section-new-rocket-4").hide();
    $("#right-section-new-rocket-3").show();
    $("#right-section-new-rocket-1").hide();
    $("#right-section-new-rocket-2").hide();
    $("#right-section-new-rocket-4").hide();
  });
});
$(document).ready(function(){
  $("#new-rocket-btn-4").click(function(){
    $("#left-section-new-rocket-4").show();
    $("#left-section-new-rocket-1").hide();
    $("#left-section-new-rocket-2").hide();
    $("#left-section-new-rocket-3").hide();
    $("#right-section-new-rocket-4").show();
    $("#right-section-new-rocket-1").hide();
    $("#right-section-new-rocket-2").hide();
    $("#right-section-new-rocket-3").hide();
  });
});


//change sub-menus-mission
$(document).ready(function(){
  $("#mission-btn-1").click(function(){
    $("#left-section-mission-1").show();
    $("#left-section-mission-2").hide();
    $("#left-section-mission-3").hide();
    $("#left-section-mission-4").hide();
    $("#right-section-mission-1").show();
    $("#right-section-mission-2").hide();
    $("#right-section-mission-3").hide();
    $("#right-section-mission-4").hide();
  });
});
$(document).ready(function(){
  $("#mission-btn-2").click(function(){
    $("#left-section-mission-2").show();
    $("#left-section-mission-1").hide();
    $("#left-section-mission-3").hide();
    $("#left-section-mission-4").hide();
    $("#right-section-mission-2").show();
    $("#right-section-mission-1").hide();
    $("#right-section-mission-3").hide();
    $("#right-section-mission-4").hide();
  });
});
$(document).ready(function(){
  $("#mission-btn-3").click(function(){
    $("#left-section-mission-3").show();
    $("#left-section-mission-1").hide();
    $("#left-section-mission-2").hide();
    $("#left-section-mission-4").hide();
    $("#right-section-mission-3").show();
    $("#right-section-mission-1").hide();
    $("#right-section-mission-2").hide();
    $("#right-section-mission-4").hide();
  });
});
$(document).ready(function(){
  $("#mission-btn-4").click(function(){
    $("#left-section-mission-4").show();
    $("#left-section-mission-1").hide();
    $("#left-section-mission-2").hide();
    $("#left-section-mission-3").hide();
    $("#right-section-mission-4").show();
    $("#right-section-mission-1").hide();
    $("#right-section-mission-2").hide();
    $("#right-section-mission-3").hide();
    //show btn and status in missions page
    if(selectMoon && chemRockets>0){
      $("#scan-moon-btn").show();
      $("#moon-info-mission").show();
    }
  });
});


//go to destination page from missions
$(document).ready(function(){
  $("#set-destination-btn").click(function(){
    $("#missions-page").hide();
    $(".main-page-items").hide();
    $("#destination-page").show();
  });
}); 


//destination page back-btn
$(document).ready(function(){
  $("#dest-page-back-btn").click(function(){
    $("#destination-page").hide();
    $("#header-bar").show();
    $("#inventory-info").show();
    $("#main-menu").show();
    
  });
}); 


//go to destination from main menu
$(document).ready(function(){
  $("#destinations-btn").click(function(){
    $(".main-page-items").hide();
    $("#destination-page").show();
  });
}); 


//select destination
$(document).ready(function(){
  $("#planet-moon").click(function(){
    selectMoon = true;
    $("#planet-moon").addClass("planet-selected");
  });
}); 


//scan moon btn
$(document).ready(function(){
  $("#scan-moon-btn").click(function(){
    //change moon selection status and delete btn in current page
    selectMoon = false;
    $("#planet-moon").removeClass("planet-selected");
    //hide scan-btn
    $("#scan-moon-btn").hide();
    //change chem rocket-amount and rerender amount in main page
    chemRockets-=1;
    if(chemRockets>0){
      $('#chem-rocket-amount-main').empty().append("Chemical Rocket: " + chemRockets); 
    }
    else{
      $('#chem-rocket-amount-main').empty();
    }
    //change moon scan status to prevent further science acquistion
    if(moonScanned == false){
      moonScanned = true;
      money+=70;
      $('.money-amount').empty().append(money);
    }
    //hide 2 sections of the missions-page beacuse they should be selected before shown
    $(".chem-rocket-stats-section").hide();
    $("#moon-info-mission").hide();
    //hide missions-page and show main-page
    $("#missions-page").hide();
    $(".main-page-items").show();
  });
}); 


//go to missions-page from destination-page using missions-btn
$(document).ready(function(){
  $("#missions-page-btn").click(function(){
    $("#destination-page").hide();
    $("#missions-page").show();
    chemRocketBtnRender();
    chemRocketStatHide();
  });
}); 


//go to science page from main menu
$(document).ready(function(){
  $("#science-btn").click(function(){
    $(".main-page-items").hide();
    $("#science-page").show();
  });
}); 



//build chem-rock btn for mission-page
function chemRocketBtnRender() {
  $('#chem-rocket-mission-btn-topbar').empty();
  for(tempChemR=chemRockets ; tempChemR>0 ; tempChemR-=1){
    $('#chem-rocket-mission-btn-topbar').append("<button class='chem-rocket-btn'>Chem Rocket</button>" );
  } 
  chemRocketBtnFocus();
}


//Show stats of chem-rocket when its btn is selected
function chemRocketBtnFocus(){
  $(".chem-rocket-btn").focus(function(){
    $('.no-ship-selected').hide();
    $('.chem-rocket-stats-section').show();
  });
}


//show stat of chem rocket when chem-rocket-btn is focused
function chemRocketStatHide(){
  $('.chem-rocket-stats-section').hide();
  $('.no-ship-selected').show(); 
}


