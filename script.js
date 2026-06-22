function repartirNaipe() {
  // NO ELIMINAR NI MODIFICAR ESTA FUNCIÓN
  const palos = ["basto", "copa", "espada", "oro"];
  let valor = 8;
  let palo;
  while (valor == 8 || valor == 9) {
    valor = Math.floor(Math.random() * 12) + 1;
    palo = palos[Math.floor(Math.random() * 4)];
  }
  return {"valor": valor, "palo": palo}
}


// Esta función retorna un array de 3 objetos que representan 3 naipes.
//
// Esta función ya está hecha, solamente hay que invocarla.
function repartirTresNaipes() {
  // NO ELIMINAR NI MODIFICAR ESTA FUNCIÓN
  naipeA = repartirNaipe();
  naipeB = repartirNaipe();
  naipeC = repartirNaipe();
  if (JSON.stringify(naipeA) == JSON.stringify(naipeB) || JSON.stringify(naipeA) == JSON.stringify(naipeC) || JSON.stringify(naipeB) == JSON.stringify(naipeC)) {
      // Si hay repetidos, reiteramos el proceso:
      return repartirTresNaipes();
  } else {
      console.log([naipeA, naipeB, naipeC]);
      return [naipeA, naipeB, naipeC];
  }
}

// 1 Ejecutamos la funcion para repartir naipes
// repartirTresNaipes()

// 2 mostramos las imagenes correspondientes a la carta sorteada

// asignamos a variables los elementos html que vamos a modificar
let tresCartas = document.querySelector("#naipes"); // en esta variable almacenamos el div en el que estan las tres etiquetas img 
let resultadoAnterior = document.querySelector("#anterior")
let resultadoActual = document.querySelector("#actual")

function mostrarcartas () {
  // modificamos el div "naipes" para que muestre las las cartas almacenadas en la variable naipesSorteados
  tresCartas.innerHTML = `<img id="naipe-0" src="baraja/${naipeA.palo}${naipeA.valor}.png" alt="naipe"> <img id="naipe-1" src="baraja/${naipeB.palo}${naipeB.valor}.png" alt="naipe"><img id="naipe-2" src="baraja/${naipeC.palo}${naipeC.valor}.png" alt="naipe"></img>`
}

// mostrarcartas()

// 3 Calcular el puntaje obtenido

let puntajeAnterior = 0;
let puntaje = 0
function calcularPuntaje (arrayNaipesSorteados){ // la funcion recibirá la lista de naipes sorteados 
  resultadoAnterior.textContent = puntajeAnterior
  if (naipeA.palo === "oro" && naipeB.palo === "oro" && naipeC.palo === "oro"){ // si todas las cartas son de oro
    puntaje = puntaje + 100}                                                    // sumamos 100 puntos.
  else {                                        // si NO todas las cartas son de oro entonces ..
    for (naipe of arrayNaipesSorteados){             // ejecutamos el for en donde,
      if (naipe.palo === "oro"){                // si la carta iterada es de oro 
        naipe.valor = naipe.valor * 2;          // multiplicamos el valor *2
        puntaje = puntaje + naipe.valor;        // y sumamos al puntaje.
      }
      else {                                    // si la carta iterada NO es de oro
        puntaje = puntaje + naipe.valor;        // la sumamos al puntaje normalmente
      }
    }
  }
  puntajeAnterior = puntaje; // antes de finalizar la funcion asignamos a PuntajeAnterior el resultado actual pero no lo mostramos
  resultadoActual.textContent = puntaje
  puntaje = 0;
}


// creamos el listener en el que se ejecutan las funciones. ser reparten los naipes, se muestran y se calcula el puntaje
let boton = document.querySelector("button")
boton.addEventListener("click", (e) => {
  let naipesSorteados = repartirTresNaipes();
  mostrarcartas()
  calcularPuntaje(naipesSorteados)
})
