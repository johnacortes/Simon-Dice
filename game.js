var colorButton = ["green", "yellow", "red", "blue"];
var patronJuego = [];
var patronClick = [];
var nivel = 0;
var inicio = false;

document.querySelector("button").addEventListener("click", function () {
  if (!inicio) {
    setTimeout(function () {
      proximaSecuencia();
      document.querySelector(".button-iniciar").innerHTML = "REINICIAR";
    }, 1000);
  } else if (inicio) {
    reiniciar();
    setTimeout(function () {
      proximaSecuencia();
    }, 1000);
  }
  inicio = true;
});

for (var i = 0; i < 4; i++) {
  document
    .querySelectorAll(".btn")
    [i].addEventListener("click", function (event) {
      var buttonPresionado = this.getAttribute("id");
      if (inicio) {
        patronClick.push(buttonPresionado);
        playSonido(buttonPresionado);
        animation(buttonPresionado);
        verificarPatron(patronClick.length - 1);
      }
    });
}

function verificarPatron(buttonActual) {
  if (patronJuego[buttonActual] === patronClick[buttonActual]) {
    console.log("suceso");
    if (patronJuego.length === patronClick.length) {
      setTimeout(function () {
        proximaSecuencia();
      }, 500);
    }
  } else {
    document.querySelector("body").classList.add("game-over");
    document.querySelector("#level-title").innerHTML =
      "Game over, Presione El Boton Para Reiniciar";
    playSonido("wront");
    inicio = false;
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 500);
    document.querySelector(".button-iniciar").innerHTML = "REINICIAR";
    reiniciar();
  }
}

function proximaSecuencia(buttonActual) {
  patronClick = [];
  nivel++;
  document.querySelector("#level-title").innerHTML = "Nivel " + nivel;
  var numRandom = Math.floor(Math.random() * 4);
  var usarCambioColor = colorButton[numRandom];
  patronJuego.push(usarCambioColor);
  document.querySelector("#" + usarCambioColor).classList.add("efecto");
  setTimeout(function () {
    document.querySelector("#" + usarCambioColor).classList.remove("efecto");
  }, 200);
  playSonido(usarCambioColor);
}

function playSonido(buttonActual) {
  var audio = new Audio("sounds/" + buttonActual + ".mp3");
  audio.play();
}

function animation(buttonActual) {
  document.querySelector("#" + buttonActual).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("#" + buttonActual).classList.remove("pressed");
  }, 200);
}

function reiniciar() {
  patronJuego = [];
  patronClick = [];
  inicio = false;
  nivel = 0;
}
