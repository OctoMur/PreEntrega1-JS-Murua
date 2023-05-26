const prenda1 = {item: "gorra", precio: 750};
const prenda2 = {item: "remera", precio: 1000};
const prenda3 = {item: "camisa", precio: 1200};
const prenda4 = {item: "campera", precio: 2500};
const prenda5 = {item: "buzo", precio: 2300};
const prenda6 = {item: "pantalon", precio: 1800};
const prenda7 = {item: "zapatillas", precio: 3000};

class Compra{
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

function registrarCompra(compra){
    ventas.push(compra);
}

let ventasTotales = 0;
let ingresosTotales = 0;

function verCompras(){
    ventasTotales = ventas.length;
    
    // for(let i = 0; i < ventas.length-1; i++){
    //     ingresosTotales += ventas[i].montoCompra;
    // }

    for(const venta of ventas){
        ingresosTotales += venta.montoCompra;
    }
}

let opcion = 0;
let cantidad = 0

function comprar(){
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
}

function sistema(){
    let seguirComprando 
    do{
        comprar();
        
        seguirComprando = confirm('Desea seguir comprando?'); //
    }while(seguirComprando === true)

    verCompras();

    alert(`Ventas totales: ${ventasTotales} Ingresos totales del dia: $${ingresosTotales}`);
}

sistema();
