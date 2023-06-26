const carrito = JSON.parse(localStorage.getItem("carrito")) || []; //en caso de haber un carrito guardado en el LS lo toma y continua desde ahi
const ventas = JSON.parse(localStorage.getItem("ventas")) || []; //toma el registro de todas las ventas realizadas y guardadas en el LS.
const ingresosTotales = JSON.parse(localStorage.getItem("ingresosTotales")) || 0; //toma el valor de todas las ventas realizadas y guardas en LS

const containerCards = document.getElementById("containerCards");

const btnComprar = document.getElementById("btnComprar");
const btnVerCompras = document.getElementById("btnVerCompras");


function confirmarCompra(){
    Swal.fire({ //alert que pregunta si quieres concretar la compra
        title: 'Seguro quieres terminar la compra?',
        text: "Si confirmas no podras volver atras!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, lo quiero!'
        })
        .then((result) =>  { return result.isConfirmed })
        .catch(err => { console.log(err); return false; });
};

function recargoTarjeta(){
    Swal.fire({ //una vez confirmada la genera un alert que pregunta si quieres pagar con tarjeta
        title: 'Quieres pagar con tarjeta?',
        text: "Si lo haces tendras un 10% de recargo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
        })
        .then((result) => { return result.isConfirmed })
        .catch(err => { console.log(err); return false; });
}

function comprar(){ //crea un objeto compra, calcula el monto final de la compra (con o sin recargo), guarda la compra en el array de ventas, lo almacena en el LS y finalmente vacia el carrito para una nueva compra.

    if(confirmarCompra()){
        const compra = new Compra(carrito); //a partir de aca, concreta la compra copiando el carrito al objeto compra

        compra.calcularTotal(recargoTarjeta()); //calcula el monto final
        registrarCompra(compra); //registra la compra en un array de compras realizadas
        localStorage.setItem("ventas", JSON.stringify(ventas)) //convierte el array anterior en un json y lo guarda en el local storage
    
        carrito.splice(0,carrito.length) //vacia el carrito y lo deja en 0 para realizar una nueva compra
        localStorage.setItem("carrito", JSON.stringify(carrito)); //carga el nuevo carrito al local, actualizandolo
    }
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

