function player(name, position) {
  this.name = name;
  this.position = position;
}

function game() {
}

game.prototype.start = function() {
  console.log("MUCH STARTING! MANY GO! WOW!")
}

game.prototype.finish = function() {
  console.log("GAME OVER! MUCH WIN. MANY HAPPY. WOW.")
  this.duration = Date.now() - this.duration;
}

// function countDown(count) {
//   console.log('countdown has fired')
//   var check = function() {
//     console.log("check function");
//     console.log(count);
//     if (count === -1) {
//       $("#giant-doge").html("");
//       $("#go").html("");
//       fireEverything();
//     } else if(count === 0){
//       $("#countdown").html("");
//       $("#go").html("GO!");
//       setTimeout(check,1000);
//       count --;
//     } else {
//       $("#countdown").html(count);
//       setTimeout(check,1000);
//       count --;
//     }
//   }
//   check();
// }

$(document).ready(function() {
  currentGame = new game();
  var player1
  var player2

  $('#submit').on('click', function(e){

    var player1Name = $('#player1').val();
    var player2Name = $('#player2').val();

    player1 = new player(player1Name, 1);
    player2 = new player(player2Name, 2);
  });

  $(document).keyup(function(event) {
    console.log("WHASSSSSSSUP KEYUP SOMETHING")
    if(event.keyCode == 81){update_player_position("player1"); console.log("P1 moves");}
    if(event.keyCode == 80){update_player_position("player2"); console.log("P2 moves");}
      // Detect which key was pressed and call the appropriate function
      // Google "jquery keyup what key was pressed" if you don't know how
      if($("#player1_strip #second-box").hasClass("active")) {
        $('#game-start').css('display','none');
      }
      if($("#player1_strip .last-box").hasClass("active")) {
        // Maybe send duration to endGame function alongside winning player...
        console.log("P1 wins");
        currentGame.finish();
        console.log(currentGame.duration);
        endGame(player1);
      } else if($("#player2_strip .last-box").hasClass("active")) {
        console.log("P1 wins");
        currentGame.finish();
        console.log(currentGame.duration);
        endGame(player2);
      }
    });
  // fireEverything
  // console.log("one line before countdown");
  // countDown(3);
  // console.log("one line after countdown");
});

fireEverything = function() {

}

var update_player_position = function (player) {
  $("#" + player + "_strip .active").next().addClass('active');
  $("#" + player + "_strip .active").prev().removeClass('active');
}

var endGame = function(player) {
  $('#announce-win').css('display','inline');
  $('#announce-win').html(player.name + " WINS!!!");
  $("td").removeClass("last-box");
};
