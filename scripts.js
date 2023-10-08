//intitial money
let money = 750;
let techPoint = 0;
let chemRockets = 0;
let firstMoonLander = 0;
let firstRocket = false;
let activeFirstMoonLanderBtn = false;
let firstLandMoonUnlockMarket = false;
let selectedPlanetName = "";
let astronauts = 10;
let worker = 0;
let astronautsOnPlanet = astronauts;
let astronautsOnShip = 0;
let rockets = [];
let chemRArray = [];
let fMoonLanderArray = [];
let currentMoonRockets = [];
let currentRocketId = '';
let currentMoonRocketId = '';
let currentRocket = [];
let fmlLevel = 0;
let fmlCredit = 0;
let fmlCountDownResearchInc = 60000;


//destinations-selections status
let selectMoon = false
let selectMars = false


//scanned status
let moonScanned = false;
let marsScanned = false;


//render on first load
$(document).ready(function () {
  $('.money-amount').append(money);
  $('.tech-amount').append(techPoint);
  $('.chem-rocket-stats-section').hide();
  $('.first-moon-lander-stats-section').hide();
  $("#destination-page").hide();
  $("#market-page").hide();
  $("#moon-page").hide();
  $(".hide-on-first-load").hide();
  $(".show-on-first-land").hide();
  $(".show-after-first-rocket-scan").hide();
  $("#new-moon-lander-btn").hide();
  $("#astro-left-section").hide();
  $("#astro-right-section").hide();
  $("#cargo-left-section").hide();
  $("#cargo-right-section").hide();
  $('#moon-page-btn').hide();
  $('#count-down-fml-ressearch-wrap').hide();
  $('#time-left-m-2-wrap, #time-left-m-3-wrap').hide();
  $('#actions-right-section-m').children().hide();
  })

 
//back-btn action
$(document).ready(function(){
  $(".back-btn").click(function(){
    $("#science-page").hide();
    $("#astro-page").hide();
    $("#destination-page").hide();
    $("#market-page").hide();
    $("#new-rocket-page").hide();
    $("#missions-page").hide();
    $(".main-page-items").show();
  });
});


//show-hide-new-rocket-page
$(document).ready(function(){
  $("#new-rocket-btn").click(function(){
    $(".main-page-items").hide();
    $("#new-rocket-page").show();
    //show moon-lander-btn after research
    if(activeFirstMoonLanderBtn == true){
      $("#new-moon-lander-btn").show();
    }
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


//change new-rocket sub-menus
$(document).ready(function(){
  $("#new-rocket-btn-1").click(function(){
    $(".new-rocket-sections").children().hide();
    $("#left-section-new-rocket-1").show();
    $("#right-section-new-rocket-1").show();
  });
});
$(document).ready(function(){
  $("#new-rocket-btn-2").click(function(){
    $(".new-rocket-sections").children().hide();
    $("#left-section-new-rocket-2").show();
    $("#right-section-new-rocket-2").show();
  });
});
$(document).ready(function(){
  $("#new-rocket-btn-3").click(function(){
    $(".new-rocket-sections").children().hide();
    $("#left-section-new-rocket-3").show();
    $("#right-section-new-rocket-3").show();
  });
});
$(document).ready(function(){
  $("#new-rocket-btn-4").click(function(){
    $(".new-rocket-sections").children().hide();
    $("#left-section-new-rocket-4").show();
    $("#right-section-new-rocket-4").show();
  });
});


//build chem rocket and rerender
$("#chem-rocket-build-btn").on( "click", function() {
  //active other menus after first rocket
  if(firstRocket == false){
    firstRocket = true;
    $(".hide-on-first-load").show();
  }
  //decrease money after building the rocket
  if(money >= 50){
    money -= 50;
    chemRockets += 1;
    //make temp object then push in rockets array
    let chemRocketTemp = {
      id :  randomId(),
      type : "chemRocket",
      crew : 0,
      planet: ""
    };
    rockets.push(chemRocketTemp);
    $("#new-rocket-page").hide();
    $("#missions-page").show();
    $(".mission-sections").children().hide();
    $("#left-section-mission-1").show();
    $("#right-section-mission-1").show();
    $('#no-ship-selected-astro').show();
    $("#astro-left-section").hide();
    $("#astro-right-section").hide();
    if(currentRocketId != ""){
      $('#no-ship-selected-astro').hide();
      $("#astro-left-section").show();
      $("#astro-right-section").show();
    }
    rocketBtnRender();
    showBorder();
  //rerender money amount in main and page
  $('.money-amount').empty().append(money);
  $('#chem-rocket-amount-main').empty().append("Chemical Rocket: " + chemRockets); 
  }
  else{
    $("#chem-rocket-build-btn").css("color", "red");
  }
});


//build first-moon-lander and rerender
$("#moon-lander-build-btn").on( "click", function() {
  //active other menus after first rocket
  if(firstRocket == false){
    firstRocket = true;
    $(".hide-on-first-load").show();
  }
  //decrease money after building the rocket
  if(money >= fmlCredit){
    money -= fmlCredit;
    firstMoonLander += 1;
    //make temp object then push in rockets array
    let fMoonLanderTemp = {
      id :  randomId(),
      type : "First Moon Lander",
      cargo : 3,
      fuel:  8,
      crew: 0,
      availableCrew: 0,
      busyCrew:0,
      seats: 1,
      planet: "Moon",
      landed: false
    };
    rockets.push(fMoonLanderTemp);
    $("#new-rocket-page").hide();
    $("#missions-page").show();
    rocketBtnRender(); 
    showBorder();
  //rerender money amount in main and page
  $('.money-amount').empty().append(money);
  $('#moon-lander-amount-main').empty().append("First Moon Lander: " + firstMoonLander); 
  }
  else{
    $("#moon-lander-build-btn").css("color", "red");
  }
});


//show-hide-missions-page
$(document).ready(function(){
  $("#missions-btn").click(function(){
    $(".main-page-items").hide();
    $("#missions-page").show();
    rocketBtnRender(); 
    missionStatHide();
    showBorder();
  });
});


//go to mission-page from destination-page using missions-btn
$(document).ready(function(){
  $("#missions-page-btn").click(function(){
    $("#destination-page").hide();
    $("#missions-page").show();
    rocketBtnRender();
    showBorder(); 
    missionStatHide();
  });
}); 


//change mission sub-menus 
$(document).ready(function(){
  //show chem-rocket status in missions page / right section
  $("#mission-btn-1").click(function(){
    $(".mission-sections").children().hide();
    $("#left-section-mission-1").show();
    $("#right-section-mission-1").show();
    $('#no-ship-selected-astro').show();
    $("#astro-left-section").hide();
    $("#astro-right-section").hide();
    if(currentRocketId == ""){
      $('.astro-on-planet-header').empty().append(astronautsOnPlanet);
      $('.astro-on-ship-header').empty().append("0");
    }
    //currentRocketId should clear after moon scan
    else if(currentRocketId != ""){
      $('#no-ship-selected-astro').hide();
      $("#astro-left-section").show();
      $("#astro-right-section").show();
      showAstro();
    }
  });
});
$(document).ready(function(){
  $("#mission-btn-2").click(function(){
    $(".mission-sections").children().hide();
    $("#left-section-mission-2").show();
    $("#right-section-mission-2").show();
    $('#no-ship-selected-cargo').show();
    $("#cargo-left-section").hide();
    $("#cargo-right-section").hide();
    if(currentRocketId != ""){
      $('#no-ship-selected-astro').hide();
    }
  });
});
$(document).ready(function(){
  $("#mission-btn-3").click(function(){
    $(".mission-sections").children().hide();
    $("#left-section-mission-3").show();
    $("#right-section-mission-3").show();  
    // show no destination selected
    if(selectedPlanetName == ""){
      $('#no-destination-selected-mission').show();
      $('.destination-selected-mission').hide();
    }
    //show chem-rocket status in missions page / right section
    //edit
    makeRocketArrays();
    for(i=0 ; i < chemRArray.length ; i++){
      let tempId = document.getElementById(chemRArray[i].id);
      $(tempId).click(function(){
        if(selectMoon){
          selectPlanetName();
          $('#no-destination-selected-mission').hide();
          $('#land-first-moon-lander').hide();
          $("#moon-info-mission").show();
          $(".selected-planet-mission").empty().append(selectedPlanetName);
          currentRocketId = this.id;
        }
      });
    }
    for(i=0 ; i < fMoonLanderArray.length ; i++){
      let tempId = document.getElementById(fMoonLanderArray[i].id);
      $(tempId).click(function(){
        if(selectMoon){
          selectPlanetName(); 
          $('#no-destination-selected-mission').hide();
          $('#land-first-moon-lander').show();
          $("#moon-info-mission").hide();
          $(".selected-planet-mission").empty().append(selectedPlanetName);
          currentRocketId = this.id;
          $('#land-first-moon-lander-btn').hide();
          // show land btn and show no astronuat on board for fml
          for(i = 0; i < rockets.length; i++){
            if(rockets[i].id == currentRocketId){
              if(rockets[i].crew > 0){
                $('#land-first-moon-lander-btn').show();
                $('#no-astro-fml').hide();
              }
            else{
              $('#land-first-moon-lander-btn').hide();
              $('#no-astro-fml').show();
          }}}
        }
      });
    }
  });   
});


//go to science page from main menu
$(document).ready(function(){
  $("#science-btn").click(function(){
    $(".main-page-items").hide();
    $("#science-page").show();
    $('#fml-credit').empty().append(fmlCredit);
  });
  //show selected btn details and hide other in a submenu
  $(".research-single-rocket-detail").hide();
  $("#science-chem-rocket-btn").focus(function(){
    $(".research-single-rocket-detail").hide();
    $("#research-chem-rocket-detail").show();
  });
  $("#science-ion-rocket-btn").focus(function(){
    $(".research-single-rocket-detail").hide();
    $("#research-ion-rocket-detail").show();
  });
  $("#science-first-moon-lander-btn").focus(function(){
    $(".research-single-rocket-detail").hide();
    $("#research-moon-lander-detail").show();
  });
  //research first moon lander then active button in new rocket page
  $("#research-moon-lander-btn").click(function(){
    if(activeFirstMoonLanderBtn == false){
      activeFirstMoonLanderBtn = true;  
    }
  });
}); 


//science page btns
//first moon lander research 
$(document).ready(function(){
  $('#research-moon-lander-btn').click(function(){
    if(fmlLevel <= 8 && money >= fmlCredit){ //fml level max is 8
      if(fmlLevel > 0){
        $('#research-moon-lander-btn').hide();
        $('#count-down-fml-ressearch-wrap').show();
        countDownTimer(fmlCountDownResearchInc, "count-down-fml-ressearch");
        setTimeout(function(){
          money -= fmlCredit;
          fmlCredit += 25;
          fmlLevel += 1;
          $('#fml-credit').empty().append(fmlCredit);
          $('#fml-level').empty().append(fmlLevel);
          $('.money-amount').empty().append(money);
          $('#research-moon-lander-btn').show();
          $('#count-down-fml-ressearch-wrap').hide();
        }, fmlCountDownResearchInc);
        fmlCountDownResearchInc += 60000; //increase time for next level research
      }
      else{
        //decrease money then increase research cost for next time
        money -= fmlCredit;
        fmlCredit += 25;
        fmlLevel += 1;
        $('#fml-credit').empty().append(fmlCredit);
        $('#fml-level').empty().append(fmlLevel);
        $('.money-amount').empty().append(money);
      }
    }
  });
});


//show science sub-menus
$(document).ready(function(){
  $("#science-btn-1").click(function(){
    $(".science-sections").children().hide();
    $("#left-section-science-1").show();
    $("#right-section-science-1").show();
  });
});
$(document).ready(function(){
  $("#science-btn-2").click(function(){
    $(".science-sections").children().hide();
    $("#left-section-science-2").show();
    $("#right-section-science-2").show();
  });
});
$(document).ready(function(){
  $("#science-btn-3").click(function(){
    $(".science-sections").children().hide();
    $("#left-section-science-3").show();
    $("#right-section-science-3").show();
  });
});
$(document).ready(function(){
  $("#science-btn-4").click(function(){
    $(".science-sections").children().hide();
    $("#left-section-science-4").show();
    $("#right-section-science-4").show();
  });
});
$(document).ready(function(){
  $("#science-btn-5").click(function(){
    $(".science-sections").children().hide();
    $("#left-section-science-5").show(); 
    $("#right-section-science-5").show();
  });
});



//move and remove astro
$(document).ready(function(){
  $('#addAstroWrap').on('click','button',function(){
    moveAstronaut();
  });
});

$(document).ready(function(){
  $('#removeAstroWrap').on('click','button', function(){
    removeAstronaut();
  });
});


//go to astro-page from main menu
$(document).ready(function(){
  $("#astro-btn").click(function(){
    $(".main-page-items").hide();
    $("#astro-page").show();
    //show astro and hide worker
    $('#astronaut-wrap').show();
    $('#worker-wrap').hide();
  });
  //render info for sections
  $("#astro-amount-center").empty().append(astronauts);
  $("#worker-amount-center").empty().append(worker);
  $(".money-astro-center").empty().append(money);
  //click top btn and show info
  $('#astro-btn-top').click(function(){
    $('#astronaut-wrap').show();
    $('#worker-wrap').hide();
  });
  $('#worker-btn-top').click(function(){
    $('#worker-wrap').show();
    $('#astronaut-wrap').hide();
  });
  //hire astronauts
  $('#hire-astro-btn').click(function(){
    if(money >= 1200){
      astronauts +=1;
      money -= 1200;
      astronautsOnPlanet +=1;
      $("#astro-amount-center").empty().append(astronauts);
      $(".money-astro-center").empty().append(money);
    }
  });
  //hire workers
  $('#hire-worker-btn').click(function(){
    if(money >= 100){
      worker +=1;
      money -= 100;
      $("#worker-amount-center").empty().append(worker);
      $(".money-astro-center").empty().append(money);
    }
  });
}); 


//go to destination page from missions
$(document).ready(function(){
  $(".set-destination-btn").click(function(){
    $("#missions-page").hide();
    $(".main-page-items").hide();
    $("#destination-page").show();
    if(currentMoonRockets.length > 0 ){
      $('#moon-page-btn').show();
    }
  });
}); 


//destination page back-btn
$(document).ready(function(){
  $("#dest-page-back-btn").click(function(){
    $("#destination-page").hide();
    $(".main-page-items").show();
  });
}); 


//go to destination from main menu
$(document).ready(function(){
  $("#destinations-btn").click(function(){
    $(".main-page-items").hide();
    $("#destination-page").show();
    if(currentMoonRockets.length > 0 ){
      $('#moon-page-btn').show();
    }
  });
}); 


//select destination
$(document).ready(function(){
  $("#planet-moon").click(function(){
    falseSelectPlanet();
    selectMoon = true;  
    $('.planets-btn').removeClass('planet-selected');
    $("#planet-moon").addClass('planet-selected');
  });
  $("#planet-mars").click(function(){
    falseSelectPlanet();
    selectMars = true;
    $('.planets-btn').removeClass('planet-selected');
    $("#planet-mars").addClass("planet-selected");
  });
}); 


//go to market from main menu
$(document).ready(function(){
  $("#market-btn").click(function(){
    $(".main-page-items").hide();
    $("#market-page").show();
  });
});


//market page back-btn
$(document).ready(function(){
  $("#market-page-back-btn").click(function(){
    $("#market-page").hide();
    $(".main-page-items").show();
  });
}); 

//scan moon btn
$(document).ready(function(){
  $("#scan-moon-btn").click(function(){
    //show science menu after first scan
    if(firstRocket == true){
      $(".show-after-first-rocket-scan").show();
    }
    //change moon selection status and delete btn in current page
    selectMoon = false;
    $("#planet-moon").removeClass("planet-selected");
    //change chem rocket-amount and rerender amount in main page
    chemRockets -= 1;
    //
    rockets = rockets.filter(deleteCurrentRocket);
    //
    if(chemRockets > 0){
      $('#chem-rocket-amount-main').empty().append("Chemical Rocket: " + chemRockets); 
    }
    else{
      $('#chem-rocket-amount-main').empty();
    }
    //change moon scan status to prevent further science acquistion
    if(moonScanned == false){
      moonScanned = true;
      money += 70;
      $('.money-amount').empty().append(money);
    }
    // change select planet name to empty
    selectedPlanetName = "";
    //hide 3 sections of the missions-page beacuse they should be selected before shown
    $(".chem-rocket-stats-section").hide();
    $(".first-moon-lander-stats-section").hide();
    $("#moon-info-mission").hide();
    $(".no-ship-selected").show();
    //hide missions-page and show main-page
    $("#missions-page").hide();
    $(".main-page-items").show();
  });
}); 


//land first-moon-lander btn
$(document).ready(function(){
  $('#land-first-moon-lander').on('click','#land-first-moon-lander-btn',function(){
    //change moon selection status and delete btn in current page
    selectMoon = false;
    $("#planet-moon").removeClass("planet-selected");
    //change f-moon-lander-amount and rerender amount in main page
    if(firstMoonLander > 0){
      firstMoonLander -= 1 ;
      $('#moon-lander-amount-main').empty().append("First moon lander: " + firstMoonLander);
      if(firstMoonLander == 0){
        $('#moon-lander-amount-main').empty();
      } 
    }
    else{
      $('#moon-lander-amount-main').empty();
    }
    //change status of rockets to landed
    for(i=0; i<rockets.length; i++){
      if(rockets[i].id == currentRocketId){
        rockets[i].landed = !rockets[i].landed;
    }}
    //creat rockets on moon array
    makeFmlArray();
    //render current moon rockets btn on top area
    $('#moon-rockets-btns').empty();
    for(i=0 ; i < currentMoonRockets.length ; i++){
      if(currentMoonRockets[i].type == 'First Moon Lander'){
        $('#moon-rockets-btns').append("<button class='menu-btn moon-btns fmlIcon' id='temporalIdMoon'></button>" );
        $('#temporalIdMoon').attr('id', currentMoonRockets[i].id);
      }    
    }
    rocketsOnMoonBtnFocus();
    // change select planet name to empty to deselect it
    selectedPlanetName = "";
    //hide 3 sections of the missions-page beacuse they should be selected before shown
    $(".chem-rocket-stats-section").hide();
    $(".first-moon-lander-stats-section").hide();
    $("#moon-info-mission").hide();
    $('#right-section-mission-3').hide();
    $(".no-ship-selected").show();
    //hide missions-page and show main-page
    $("#missions-page").hide();
    $('#moon-page').show();
    $('.moon-sections').children().hide();
    $('#left-section-moon-1').show();
    $('#right-section-moon-1').show();
    $('.no-ship-selected-m').show();
    $('.moon-section-sub-1').hide();
    if(firstLandMoonUnlockMarket == false){
      firstLandMoonUnlockMarket = true;
      $(".show-on-first-land").show();
    }
  });
}); 

//show moon-page
$(document).ready(function(){
  $('#moon-page-btn').click(function(){
    $("#destination-page").hide();
    $('#moon-page').show();
    $('.moon-sections').children().hide();
    rocketsOnMoonBtnFocus();
  });
});

//moon-page sub-menus
$(document).ready(function () {
  $('#moon-btn-1').click(function(){
    $('.moon-sections').children().hide();
    $('#left-section-moon-1 , #right-section-moon-1').show();
    $('#actions-right-section-m').children().hide();
    if(currentMoonRocketId != ''){
      $('.no-ship-selected-m').hide();
      $('.moon-section-sub-1').show();
    }
    else{
      $('.no-ship-selected-m').show();
      $('.moon-section-sub-1').hide();
    } 
  });
  $('#moon-btn-2').click(function(){
    $('.moon-sections').children().hide();
    $('#left-section-moon-2 , #right-section-moon-2').show();
    if(currentMoonRocketId != ''){
      $('.no-ship-selected-m').hide();
      $('.moon-section-sub-2').show();
    }
    else{
      $('.no-ship-selected-m').show();
      $('.moon-section-sub-2').hide();
    }
  });
  $('#moon-btn-3').click(function(){
    $('.moon-sections').children().hide();
    $('#left-section-moon-3 , #right-section-moon-3').show();
    if(currentMoonRocketId != ''){
      $('.no-ship-selected-m').hide();
      $('.moon-section-sub-3').show();
    }
    else{
      $('.no-ship-selected-m').show();
      $('.moon-section-sub-3').hide();
    }
  });
  $('#moon-btn-4').click(function(){
    $('.moon-sections').children().hide();
    $('#left-section-moon-4 , #right-section-moon-4').show();
    if(currentMoonRocketId != ''){
      $('.no-ship-selected-m').hide();
      $('.moon-section-sub-4').show();
    }
    else{
      $('.no-ship-selected-m').show();
      $('.moon-section-sub-4').hide();
    }
  });
  $('#moon-btn-5').click(function(){
    $('.moon-sections').children().hide();
    $('#left-section-moon-5 , #right-section-moon-5').show();
    if(currentMoonRocketId != ''){
      $('.no-ship-selected-m').hide();
      $('.moon-section-sub-5').show();
    }
    else{
      $('.no-ship-selected-m').show();
      $('.moon-section-sub-5').hide();
    }
  });
});


//moon-page sub-btns
$(document).ready(function(){
  //sub menus
  $("#ship-actions-m-left-1-btn").click(function(){
    $('#actions-right-section-m').children().hide();
    $("#ship-actions-m-right-1").show();
  });
  //
  $("#ship-actions-m-left-2-btn").click(function(){
    $('#actions-right-section-m').children().hide();
    $("#ship-actions-m-right-2").show();
    //show hide req not met if new crew available
    for(i=0; i<rockets.length; i++){
      if(currentMoonRocketId == rockets[i].id){
        if(rockets[i].availableCrew > 0){
          $('#req-not-met-m-2').hide();
          $('#ship-actions-m-right-2-btn').show();
        }
        else{
          $('#req-not-met-m-2').show();
          $('#ship-actions-m-right-2-btn').hide();
        }
    }}  
    //
  });
  //
  $("#ship-actions-m-left-3-btn").click(function(){
    $('#actions-right-section-m').children().hide();
    $("#ship-actions-m-right-3").show();
    //show hide req not met if new crew available
    for(i=0; i<rockets.length; i++){
      if(currentMoonRocketId == rockets[i].id){
        if(rockets[i].availableCrew > 0){
          $('#req-not-met-m-3').hide();
          $('#ship-actions-m-right-3-btn').show();
        }
        else{
          $('#req-not-met-m-2').show();
          $('#ship-actions-m-right-3-btn').hide();
        }
    }}  
    //
  });
  //
  $("#ship-actions-m-left-4-btn").click(function(){
    $('#actions-right-section-m').children().hide();
    $("#ship-actions-m-right-4").show();
  });
  //
  $("#ship-actions-m-left-5-btn").click(function(){
    $('#actions-right-section-m').children().hide();
    $("#ship-actions-m-right-5").show();
  });
  //
  $("#ship-actions-m-left-6-btn").click(function(){
    $('#actions-right-section-m').children().hide();
    $("#ship-actions-m-right-6").show();
  });
  //
  $("#ship-actions-m-left-7-btn").click(function(){
    $('#actions-right-section-m').children().hide();
    $("#ship-actions-m-right-7").show();
  });
  //
  $("#ship-actions-m-left-8-btn").click(function(){
    $('#actions-right-section-m').children().hide();
    $("#ship-actions-m-right-8").show();
  });
}); 

//moon-page sub sub 1
$(document).ready(function () { 
  $('#ship-actions-m-right-2-btn').click(function(){
    for(i=0; i<rockets.length; i++){
      if(rockets[i].id == currentMoonRocketId){
        if(rockets[i].availableCrew > 0){
          $(this).hide();
          rockets[i].availableCrew -= 1;
          rockets[i].busyCrew += 1;
          $('#available-crew').empty().append(rockets[i].availableCrew);
          $('#busy-crew').empty().append(rockets[i].busyCrew);
          $('#time-left-m-2-wrap').show();
          $('#time-needed-m-2').hide();
          countDownTimer(10000, "time-left-m-2");
          setTimeout(function () {
            money += 150;
            $('.money-amount').empty().append(money);
            $('#time-left-m-2-wrap').hide();
            $('#ship-actions-m-left-2-btn').hide();
            $('#ship-actions-m-right-2').hide();
            for(i=0; i<rockets.length; i++){
              if(rockets[i].id == currentMoonRocketId){
                rockets[i].availableCrew += 1;
                rockets[i].busyCrew -= 1;
                $('#available-crew').empty().append(rockets[i].availableCrew);
                $('#busy-crew').empty().append(rockets[i].busyCrew);
              }
            }
          },10000);
    }}}
  });
  //
  $('#ship-actions-m-right-3-btn').click(function(){
    for(i=0; i<rockets.length; i++){
      if(rockets[i].id == currentMoonRocketId){
        if(rockets[i].availableCrew > 0){
          $(this).hide();
          rockets[i].availableCrew -= 1;
          rockets[i].busyCrew += 1;
          $('#available-crew').empty().append(rockets[i].availableCrew);
          $('#busy-crew').empty().append(rockets[i].busyCrew);
          $('#time-left-m-3-wrap').show();
          $('#time-needed-m-3').hide();
          countDownTimer(30000, "time-left-m-3");
          setTimeout(function () {
            money += 50;
            techPoint += 1;
            $('.money-amount').empty().append(money);
            $('.tech-amount').empty().append(techPoint);
            $('#time-left-m-3-wrap').hide();
            $('#ship-actions-m-left-3-btn').hide();
            $('#ship-actions-m-right-3').hide();
            for(i=0; i<rockets.length; i++){
              if(rockets[i].id == currentMoonRocketId){
                rockets[i].availableCrew += 1;
                rockets[i].busyCrew -= 1;
                $('#available-crew').empty().append(rockets[i].availableCrew);
                $('#busy-crew').empty().append(rockets[i].busyCrew);
            }}
          },10000);
    }}}
  });
 });


//moon-page back-btn
$(document).ready(function(){
  $("#moon-page-back-btn").click(function(){
    $("#moon-page").hide();
    $(".main-page-items").show();
  });
}); 


function rocketsOnMoonBtnFocus(){
  for(i=0; i<currentMoonRockets.length; i++){
    let tempId = document.getElementById(currentMoonRockets[i].id);
    $('#moon-rockets-btns').on('click', tempId, function(){
      currentMoonRocketId  = $(tempId).attr('id');
      for(j=0; j<currentMoonRockets.length; j++){
        if(currentMoonRockets[j].id == currentMoonRocketId){
          $('#available-crew').empty().append(currentMoonRockets[j].availableCrew);
          $('#busy-crew').empty().append(currentMoonRockets[j].busyCrew); 
        }
      }
    });
}}


//build rocket btn for mission-page
function rocketBtnRender() {
  $('#chem-rocket-mission-btn-topbar').empty();
  makeRocketArrays();
  //make btn for each rocket type base on prev arrays
  for(i=0 ; i < chemRArray.length ; i++){
    $('#chem-rocket-mission-btn-topbar').append("<button class='menu-btn rocket-btns chemRocketIcon' id='temporalId' ></button>" );
    $('#temporalId').attr('id', chemRArray[i].id);
  }
  //
  $('#moon-lander-mission-btn-topbar').empty();
  for(i=0 ; i < fMoonLanderArray.length ; i++){
    $('#moon-lander-mission-btn-topbar').append("<button class='menu-btn rocket-btns fmlIcon' id='temporalId' ></button>" );
    $('#temporalId').attr('id', fMoonLanderArray[i].id);
  } 
  chemRocketBtnFocus();
  firstMoonLanderBtnFocus();
}

//Show stats of chem-rocket when its btn is selected and hide others / left section
function chemRocketBtnFocus(){
  makeRocketArrays(); //REDUNDUNT
  for(i=0 ; i < chemRArray.length ; i++){
    let tempId = document.getElementById(chemRArray[i].id);
    $(tempId).click(function(){
      $('.no-ship-selected').hide();
      $('.first-moon-lander-stats-section').hide();
      $('.chem-rocket-stats-section').show();
      currentRocketId = this.id;
    });
  }
}

//Show stats of chem-rocket when its btn is selected
function firstMoonLanderBtnFocus(){
  makeRocketArrays(); //REDUNDUNT
  for(i=0 ; i < fMoonLanderArray.length ; i++){
    let tempId = document.getElementById(fMoonLanderArray[i].id);
    $(tempId).click(function(){
      $('.no-ship-selected').hide();
      $('.chem-rocket-stats-section').hide();
      $('.first-moon-lander-stats-section').show();
      currentRocketId = this.id;
    });
  }
}


//show current astro on planet and current ship
function showAstro(){
  currentRocket = rockets.filter(chooseCurrentRocket);
  $('.astro-on-planet-header').empty().append(astronautsOnPlanet);
  // console.log(currentRocket[0].crew);
  if(currentRocket[0].crew != undefined ||currentRocket[0].crew != null ){
    $('.astro-on-ship-header').empty().append(currentRocket[0].crew);
  }
  else{
    $('.astro-on-ship-header').empty().append(0);
  }
}

function chooseCurrentRocket(tempRocket){
  return tempRocket.id == currentRocketId ;
}


//astro btn render on mission page /left section
function moveAstronaut() {
  for(i = 0 ; i < rockets.length ; i++){
    if(rockets[i].id == currentRocketId){
      if(rockets[i].type == "First Moon Lander"){
        if(rockets[i].crew < 1){  //crew capacity of first-moon-lander is 1
          astronautsOnPlanet -= 1 ;
          rockets[i].crew += 1;
          rockets[i].availableCrew += 1;
          $('.astro-on-planet-header').empty().append(astronautsOnPlanet);
          $('.astro-on-ship-header').empty().append(rockets[i].crew);
        }
      }}
    } 
}


//astro btn render on mission page /right section
function removeAstronaut() {
  for(i = 0 ; i < rockets.length ; i++){
    if(rockets[i].id == currentRocketId){
      if(rockets[i].type == "First Moon Lander"){
        if(rockets[i].crew > 0){  //crew capacity of first-moon-lander is 1
          astronautsOnPlanet += 1 ;
          rockets[i].crew -= 1;
          rockets[i].availableCrew -= 1;
          $('.astro-on-planet-header').empty().append(astronautsOnPlanet);
          $('.astro-on-ship-header').empty().append(rockets[i].crew);
        }
      }}
    } 
} 


//show no ship selected when needed
function missionStatHide(){
  $('.chem-rocket-stats-section').hide();
  $('.first-moon-lander-stats-section').hide();
  $('.no-ship-selected').show(); 
}


function selectPlanetName(){
  if(selectMoon){
    if(moonScanned){
      selectedPlanetName = "Moon";
    }
    else{
      selectedPlanetName = "???"
    }
  }
  else if(selectMars){
    if(moonScanned){
      selectedPlanetName = "Mars";
    }
    else{
      selectedPlanetName = "???"
    }
  }
  else{
    selectedPlanetName = "No planet is selected.";
  }
}


//make random id
function randomId(){
  return Math.floor((Math.random() * 10000) + 1);
}


//make rocket arrays
function makeRocketArrays(){
  //make filter array for each type of rocket
  chemRArray = rockets.filter(isChemRocket);
  fMoonLanderArray = rockets.filter(isfMoonLander);
}

function isChemRocket(chemR){
  return chemR.type === "chemRocket";
}

function isfMoonLander(fMoonLander){
  return fMoonLander.type === "First Moon Lander" && fMoonLander.landed == false;
}

//check if rocket is a first moon lander then render it for moon page
function makeFmlArray(){
  return currentMoonRockets = rockets.filter(isFML);
}

function isFML(fmlOnMoon){
  return fmlOnMoon.planet === "Moon" && fmlOnMoon.landed == true;
}


//delete rocekt
function deleteCurrentRocket(currentRocket){
  return currentRocket.id != currentRocketId;
}


//show border for rocket-btn
function showBorder(){  
  for(i=0 ; i < rockets.length ; i++){
    let tempId = document.getElementById(rockets[i].id);
    $(tempId).click(function(){
      $('.rocket-btns').removeClass("selected-btn-border");
      $(tempId).addClass("selected-btn-border");
    });
  }
}


//change planets selection to false to deselect all
function falseSelectPlanet(){
  selectMoon = false;
  selectMars = false;
}


//function count down timer
function countDownTimer(inputTime,timerId){
  // Set the date we're counting down to
  var tempNow = new Date().getTime();
  countDownDate = tempNow + inputTime;
  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;
          
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
    // Output the result in an element with id=timerId
    document.getElementById(timerId).innerHTML =  hours + "h "
    + minutes + "m " + seconds + "s ";

    if(hours){
      document.getElementById(timerId).innerHTML =  hours + "h " + minutes + "m " + seconds + "s ";
    }
    else{
      document.getElementById(timerId).innerHTML =  minutes + "m " + seconds + "s ";
    }
          
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById(timerId).innerHTML = "";
    }
  }, 1000);
}

//
let usernameT = "hi";

$(function() {
    $("#save").click(function(e) {
        e.preventDefault();
        alert("usernameT");
        $.ajax({
            type: "POST",
            url: "update.php",
           
            data: 'usernameT='+usernameT,
            dataType:'json',
            success: function(data)
                {
                    if(!data.error)
                    {
                        $("#success").fadeIn(200).show();
                        $("#error").fadeOut(200).hide();
                    }
                    else
                    {
                        alert(data.error);
                    }
                }
            });
        return false;
    }); 
}); 