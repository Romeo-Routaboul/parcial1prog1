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

// creamos la funcion que mostrara los naipes
function mostrarNaipes(array){
  let i = 0                           // creamos el indice
  for(let naipe of array){             //recorremos la lista de los 3 naipes 
    document.querySelector("#naipe-"+ i).src = "baraja/" + naipe.palo + naipe.valor + ".png";  // rellenamos el src del naipe correspondiente con los datos del naipe iterado
    i++
  }
}

function calcularPuntaje (array){
  if (array[0].palo == "oro" && array[1].palo == "oro" && array[2].palo == "oro"){
    return 100
  }
  suma = 0;
  for (let naipe of array){
    if (naipe.palo == "oro"){
      suma = suma + naipe.valor * 2
    } else {
      suma = suma + naipe.valor
    }
  }
  return suma
}

// creamos el evento al tocar el boton que activa la fucncion que devuelve una array con tres naipes
let boton = document.querySelector("#mesa button");
let anterior = document.querySelector("#anterior");
let actual = document.querySelector("#actual");
boton.addEventListener('click', (e)=>{
  let arrayNaipesSorteados = repartirTresNaipes();
  mostrarNaipes(arrayNaipesSorteados);
  let puntaje = calcularPuntaje(arrayNaipesSorteados); // ahora cada vez que se haga click, la varable puntaje contendra un int con el puntaje obtenido
  console.log(puntaje);

  anterior.textContent = parseInt(actual.textContent)
  actual.textContent = puntaje

  if (parseInt(anterior.textContent) >= parseInt(actual.textContent)){
    boton.disabled = true
    boton.textContent = "No se puede repartir de nuevo"
    actual.textContent = 0
    console.log("perdiste")
  } else {
    boton.textContent = "Repartir nuevamente"
    console.log("seguis jugando")
  }
})
