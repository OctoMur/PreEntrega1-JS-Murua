const prenda1 = {item: "gorra", precio: 750};
const prenda2 = {item: "remera", precio: 1000};
const prenda3 = {item: "camisa", precio: 1200};
const prenda4 = {item: "campera", precio: 2500};
const prenda5 = {item: "buzo", precio: 2300};
const prenda6 = {item: "pantalon", precio: 1800};
const prenda7 = {item: "zapatillas", precio: 3000};

class Compra{// clase de objeto compra
    constructor(){
        this.prendas = [];
        this.montoCompra = 0;
    }

    agregarProducto(prenda, cantidad) {        
        
        for(let i = 0; i < cantidad; i++){
            this.prendas.push(prenda);
        }
    }

    calcularTotal(tarjeta){
        for(const producto of this.prendas){
            this.montoCompra += producto.precio;
        }

        if(tarjeta === true){
            this.montoCompra += this.montoCompra * 0.1;
        }
    }
}

let ventas = [];
let ventasTotales = 0;
let ventasTotalesHistorial;


function registrarCompra(compra){ //guarda un objeto compra en el vector de "ventas".
    ventas.push(compra);          


    ingresosTotales = 0;
    for(const venta of ventas){
        ingresosTotales += venta.montoCompra;   //calcula la ultima venta y la suma al resto de ventas realizada (solo el monto).
    }
    
    localStorage.setItem("montoVendido", ingresosTotales); //actualiza el monto total vendido durante el dia y lo guarda en el localstorage
    console.log(localStorage);
}

let ingresosTotales = 0;

function verCompras(){ //metodo para ver la cantidad de ventas y el total de todas realizadas en lo que va del dia
    ventasTotales = ventas.length;

    alert(`Ventas totales: ${ventasTotales} Ingresos totales del dia: $${ingresosTotales}`);
}

let opcion = 0;
let cantidad = 0

function comprar(){ //toma las opciones ingresadas por el usuario y realiza la compra
    const compra = new Compra();
    let agregar;
    let tarjeta;
    do{
        opcion = parseInt(prompt('Ingrese la opcion de prenda deseada')) ; //
        cantidad = parseInt(prompt('Cuantas prendas de estas desea?')); //

        switch(opcion){
            case 1:
                compra.agregarProducto(prenda1, cantidad)
                break;
            case 2:
                compra.agregarProducto(prenda2, cantidad)
                break;
            case 3:
                compra.agregarProducto(prenda3, cantidad)
                break;
            case 4:
                compra.agregarProducto(prenda4, cantidad)
                break
            case 5:
                compra.agregarProducto(prenda5, cantidad)
                break
            case 6:
                compra.agregarProducto(prenda6, cantidad)
                break
            case 7:
                compra.agregarProducto(prenda7, cantidad)
                break
        }

        agregar = confirm('Seguir agregando productos?'); //

    }while(agregar === true);

    tarjeta = confirm('Desea pagar con tarjeta? (+10% de recargo)'); //

    compra.calcularTotal(tarjeta);
    registrarCompra(compra);
    alert(`Total ${compra.montoCompra}`)
}
function cerrar(){ //un intento de simular que cierra la caja y crea un json de cuanto se vendio ese dia
    console.log(JSON.stringify(ingresosTotales));
}
function verHistorial(){ //un intento de mostrar lo que registro en el json, pero en consola 
    console.log(JSON.parse(ingresosTotales));
}


//si algo no queda clar durante la evaluacion, comuniquese conmigo, a estas alturas estaba medio quemado e intentaba aplicar todo incluido el json.


let btnComprar = document.getElementById("btnComprar");
let btnVerCompras = document.getElementById("btnVerCompras");
let btnCerrarCaja = document.getElementById("btnCerrarCaja")
let btnVerVentasanterior = document.getElementById("btnHistorial")

btnComprar.addEventListener("click", comprar);
btnVerCompras.addEventListener("click", verCompras);
btnCerrarCaja.addEventListener("click", cerrar);
btnVerVentasanterior.addEventListener("click", verHistorial)
