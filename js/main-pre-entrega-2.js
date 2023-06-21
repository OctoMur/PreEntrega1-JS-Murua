const carritoInLocalStorage = JSON.parse(localStorage.getItem("carrito")); //en caso de haber un carrito guardado en el LS lo toma y continua desde ahi
let carrito = carritoInLocalStorage || []; // crear un carrito nuevo, dependiendo de si hay un carrito en el local storage, y si no crea uno nuevo sin productos agregados

const ventasInLocalStorage = JSON.parse(localStorage.getItem("ventas")); //toma el registro de todas las ventas realizadas y guardadas en el LS.
let ventas = ventasInLocalStorage || []; //crea un array donde se basa en el array de ventas guardado en el LS y sino crea uno nuevo sin ventas registradas

const ingresosTotalesInLocalStorage = JSON.parse(localStorage.getItem("ingresosTotales")); //toma el valor de todas las ventas realizadas y guardas en LS
let ingresosTotales = ingresosTotalesInLocalStorage || 0; //asigna un valor de ingresos totales si es que se efectuaron ventas, o inicia en 0

const containerCards = document.getElementById("containerCards");

const btnComprar = document.getElementById("btnComprar");
const btnVerCompras = document.getElementById("btnVerCompras");



function comprar(){ //crea un objeto compra, calcula el monto final de la compra (con o sin recargo), guarda la compra en el array de ventas, lo almacena en el LS y finalmente vacia el carrito para una nueva compra.
    const compra = new Compra(carrito);

    const tarjeta = confirm('Desea pagar con tarjeta? (+10% de recargo)');
    compra.calcularTotal(tarjeta);
    registrarCompra(compra);
    localStorage.setItem("ventas", JSON.stringify(ventas))
    // console.log(ventas);

    carrito.splice(0,carrito.length)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    // console.log(carrito);
}

function registrarCompra(compra){ //guarda un objeto compra en el vector de "ventas".
    ventas.push(compra);          


    ingresosTotales = 0;
    for(const venta of ventas){
        ingresosTotales += venta.montoCompra;   //calcula la ultima venta y la suma al resto de ventas realizada (solo el monto).
    }
    
    localStorage.setItem("ingresosTotales", ingresosTotales); //actualiza el monto total vendido y lo guarda en el localstorage
    // console.log(localStorage);
}

function verCompras(){ //metodo para ver la cantidad de ventas y el monto total de todas ellas
    const cantidadVentas = JSON.parse(localStorage.getItem("ventas"));
    
    ventasTotales = cantidadVentas.length;
    ingresosTotales = localStorage.getItem("ingresosTotales");

    alert(`Ventas totales: ${ventasTotales} Ingresos totales del dia: $${ingresosTotales}`);
}



btnComprar.addEventListener("click", comprar);
btnVerCompras.addEventListener("click", verCompras);


