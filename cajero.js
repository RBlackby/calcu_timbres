//El algoritmo tiene como objetivo entregar la menor cantidad de billetes
// The algorithm aims to deliver the least amount of bills

class Billete {
  constructor(v, c) {
    this.valor = v;
    this.cantidad = c;
    this.imagen = new Image();
    this.imagen.width = 100;
    this.imagen.src = imagenes[this.valor];
  }
}
const boleta = 3850;

function entregarDinero() { 
  
  
  
  // funcion disparada al hacer click a extraer
  resultado.innerHTML = "";
  entregado = [];
  var t = document.getElementById("dinero"); // el valor q ingreso en el input de lo q quiero retirar
  dinero = parseInt(t.value); // convierto ese string a numero entero
 

  if(isNaN(dinero) || dinero < boleta){
    resultado.innerHTML = "<b class='titulo'>Debes escribir el monto MAYOR al precio de la boleta</b>";
    return;
  }

  dinero = dinero - boleta;

  for (const bi of caja) { // itera los billetes de la caja (recorro los elem de caja)
    if (dinero > 0) { 
      div = Math.floor(dinero / bi.valor); //  Redondea hacia abajo. dinero /valor del billete q estoy iterando de la caja
      papeles = (div > bi.cantidad) ? bi.cantidad : div  // if(div > bi.cantidad) {}
      // si es mayor papeles = bi.cantidad (no tengo esa cantidad para entregar), si no papeles = div (si puedo entregar esa cantidad de billetes de x denominacion)

      entregado.push(new Billete(bi.valor, papeles)); //cantidad de billetes q voy a entregar del valor o denominacion x en la q va la iteracion
      dinero -= (bi.valor * papeles); // a dinero le resto lo q entregue anteriormente
      bi.cantidad -= papeles; // para saber q cantidad de papeles (billetes) de x denominacion me quedan
    } 
  }

  if (dinero > 0) { // despues de las iteraciones vuelvo a preguntar si dinero > 0 (porque de pronto pedi mas de lo que el me puede dar)
    resultado.innerHTML = "Solo montos con boleta incluida"; //es como un document.write
  } else { // si tenia el dinero suficiente para entregar entonces muestro lso billetes
    mostrarBilletes(); 
  }
}

function mostrarBilletes() {
  resultado.innerHTML += "<b class='titulo'>1</b> boleta de <b class='titulo'>3850</b>";
  resultado.innerHTML += '<br />'
  for (const e of entregado) { //recorro cada instancia de e (entregado)
    if (e.cantidad > 0) { // para que no me muestre cero billetes de x denominacion
      resultado.innerHTML += "<b class='titulo'>" + e.cantidad + "</b> Timbre de ";
      resultado.appendChild(e.imagen)
      resultado.innerHTML += '<br />'
    }
  }
}

var total = 0;


document.getElementById('borrar').onclick = function borra() {
  //Esta funciona hace que cuando apretas el boton "Borrar" se borra el resultado y billetes entregados
  resultado.innerHTML = "";
  entregado = [];
  document.getElementById("dinero").focus();
}

var imagenes = {};
imagenes["8000"] = "8000.png";
imagenes["1000"] = "1000.png";
imagenes["700"] = "700.png";
imagenes["100"] = "100.png";

var caja = [];
var entregado = []; //billetes q le entrego al ususario
caja.push(new Billete(8000, 200)); // agregandole billetes a caja
caja.push(new Billete(1000, 200));
caja.push(new Billete(700, 200));
caja.push(new Billete(100, 200));

var dinero; // lo que voy a retirar 
var div = 0; // resultado de la division c/vez q iteramos
var papeles = 0; //cantidad de papeles 

var resultado = document.getElementById("resultado");  // la etiqueta p q creamos para reemplazar document.write
var b = document.getElementById("extraer"); // boton de retirar
b.addEventListener("click", entregarDinero);

document.getElementById('limpiar').onclick = function borra() {
  //Esta funciona hace que cuando apretas el boton "Borrar" se borra el resultado y billetes entregados
  resultado.innerHTML = "";
  entregado = [];
  document.getElementById("dinero").value = "";
  document.getElementById("dinero").focus();
}



