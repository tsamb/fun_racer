function player(name) {
  this.name = name;
  position = 1;
}

function game(id) {
  this.id = id;
}

game.prototype.start = function() {
  console.log("MUCH STARTING! MANY GO! WOW!")
  this.duration = Date.now();
}

game.prototype.finish = function() {
  console.log("GAME OVER! MUCH WIN. MANY HAPPY. WOW.")
  this.duration = Date.now() - this.duration;
}

function countDown(count) {
  console.log('countdown has fired')
  var check = function() {
    console.log("check function");
    console.log(count);
    if (count === -1) {
      $("#giant-doge").html("");
      $("#go").html("");
      fireEverything();
    } else if(count === 0){
      $("#countdown").html("");
      $("#go").html("GO!");
      setTimeout(check,1000);
      count --;
    } else {
      $("#countdown").html(count);
      setTimeout(check,1000);
      count --;
    }
  }
  check();
}

$(document).ready(function() {
  console.log("one line before countdown");
  countDown(3);
  console.log("one line after countdown");
});

fireEverything = function() {
  currentGame = new game(1);

    currentGame.start();
    $(document).keyup(function(event) {
      if(event.keyCode == 81){update_player_position("player1");}
      if(event.keyCode == 80){update_player_position("player2");}
      // Detect which key was pressed and call the appropriate function
      // Google "jquery keyup what key was pressed" if you don't know how
      if($("#player1_strip #second-box").hasClass("active")) {
        $('#game-start').css('display','none');
      }
      if($("#player1_strip .last-box").hasClass("active")) {
        // Maybe send duration to endGame function alongside winning player...
        currentGame.finish();
        console.log(currentGame.duration);
        endGame(1, currentGame.duration);
      } else if($("#player2_strip .last-box").hasClass("active")) {
        currentGame.finish();
        console.log(currentGame.duration);
        endGame(1, currentGame.duration);
      }
    });
}

var update_player_position = function (player) {
  $("#" + player + "_strip .active").next().addClass('active');
  $("#" + player + "_strip .active").prev().removeClass('active');
}

var endGame = function(player, duration) {
  $('#game-end').css('display','inline');
  $.post("/end_game",{player:player, duration:duration}, function(results_page) {
    window.location.href = results_page;
  });
  $("td").removeClass("last-box");
};
