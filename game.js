var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".button-iniciar").click(function() {
 if (!started) {
  $("#level-title").text("Nivel " + 1);
  setTimeout(function() {
    nextSequence();
  }, 1000);
  started = true;
 }
});

$(".btn").click(function() {
    var buttonPressed = $(this).attr("id");
    userClickedPattern.push(buttonPressed);
    playSounds(buttonPressed);
    animacion(buttonPressed);
    chekearPatron(userClickedPattern.length-1);
})

function chekearPatron(buttonActual) {
    if(userClickedPattern[buttonActual] === gamePattern[buttonActual]) {
       console.log("sucesos");
       if(userClickedPattern.length === gamePattern.length) {
         setTimeout(function() {
            nextSequence();
         }, 500);
       }
    } else {
        playSounds("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Presione El Boton Para Reiniciar.");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 500);
        restablecer();
    }
}

function nextSequence(valor) {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Nivel " + level);
    var numberRandom = Math.floor(Math.random() * 4);
    var userChanseColor = buttonColours[numberRandom];
    gamePattern.push(userChanseColor);
    $("#" + userChanseColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSounds(userChanseColor);
}

function playSounds(valor) {
    var audio = new Audio("sounds/" + valor + ".mp3")
    audio.play();
}

function animacion(colorSelect) {
    $("#" + colorSelect).addClass("pressed");
    setTimeout(function() {
        $("#" + colorSelect).removeClass("pressed");
    }, 200);
}

function restablecer() {
    gamePattern = [];
    level = 0;
    started = false;
}



