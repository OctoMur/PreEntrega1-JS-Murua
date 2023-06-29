const modal = document.getElementById("modalLayer");

const carritoInLocalStorage = JSON.parse(localStorage.getItem("carrito")); //en caso de haber un carrito guardado en el LS lo toma y continua desde ahi
let carrito = carritoInLocalStorage || []; // crear un carrito nuevo, dependiendo de si hay un carrito en el local storage, y si no crea uno nuevo sin productos agregados

const ventasInLocalStorage = JSON.parse(localStorage.getItem("ventas")); //toma el registro de todas las ventas realizadas y guardadas en el LS.
let ventas = ventasInLocalStorage || []; //crea un array donde se basa en el array de ventas guardado en el LS y sino crea uno nuevo sin ventas registradas

const ingresosTotalesInLocalStorage = JSON.parse(localStorage.getItem("ingresosTotales")); //toma el valor de todas las ventas realizadas y guardas en LS
let ingresosTotales = ingresosTotalesInLocalStorage || 0; //asigna un valor de ingresos totales si es que se efectuaron ventas, o inicia en 0

const containerCards = document.getElementById("containerCards");
const mainCart = document.getElementById("mainCart");
const footerCart = document.getElementById("footerCart");

const btnComprar = document.getElementById("btnComprar");
const btnVerCompras = document.getElementById("btnVerCompras");
const btnVerCarrito = document.getElementById("btnVerCarrito");


function comprar(){ //crea un objeto compra, calcula el monto final de la compra (con o sin recargo), guarda la compra en el array de ventas, lo almacena en el LS y finalmente vacia el carrito para una nueva compra.
    let tarjeta = false;
    let confirmarCompra = false;

    Swal.fire({ //alert que pregunta si quieres concretar la compra
        title: 'Seguro quieres terminar la compra?',
        text: "Si confirmas no podras volver atras!",
        icon: 'warning',
        background: 'white',
        showCancelButton: true,
        confirmButtonColor: '#888',
        cancelButtonColor: '#CCCCCC',
        confirmButtonText: 'Si, lo quiero!' 
        }).then((result) => { //evalua el resultado del alert y re asigna el valor booleando del parametro "confirmarCompra"
        if (result.isConfirmed) {
            confirmarCompra = true;
        }
        if(confirmarCompra){
            Swal.fire({ //una vez confirmada la genera un alert que pregunta si quieres pagar con tarjeta
                title: 'Quieres pagar con tarjeta?',
                text: "Si lo haces tendras un 10% de recargo!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#888',
                cancelButtonColor: '#CCCCCC',
                confirmButtonText: 'Si!',
                cancelButtonText: 'No!'
                }).then((result) => {
                if (result.isConfirmed) { //reasigna en caso de ser necesario el valor booleando de "tarjeta"
                    tarjeta = true;
                }


                const compra = new Compra(carrito); //a partir de aca, concreta la compra copiando el carrito al objeto compra
    
                compra.calcularTotal(tarjeta); //calcula el monto final
                registrarCompra(compra); //registra la compra en un array de compras realizadas
                localStorage.setItem("ventas", JSON.stringify(ventas)) //convierte el array anterior en un json y lo guarda en el local storage
            
                carrito.splice(0,carrito.length) //vacia el carrito y lo deja en 0 para realizar una nueva compra
                localStorage.setItem("carrito", JSON.stringify(carrito)); //carga el nuevo carrito al local, actualizandolo
            })
            }
    
    })
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
    modal.style.display = "visible";
    const cantidadVentas = JSON.parse(localStorage.getItem("ventas"));
    
    ventasTotales = cantidadVentas.length;
    ingresosTotales = localStorage.getItem("ingresosTotales");

    alert(`Ventas totales: ${ventasTotales} Ingresos totales del dia: $${ingresosTotales}`);
}

function verCarrito(){
    limpiarCarritoHtml();
    const productosCargados = JSON.parse(localStorage.getItem("carrito"));
    let total = 0;
    productosCargados.forEach(producto => {
        const cardProductInCart = document.createElement('div');

        cardProductInCart.classList.add("mainCartProduct")
        cardProductInCart.innerHTML =`
        <h4>${producto.item}</h4>
        <span>${producto.cantidad}</span>
        <span>${producto.subtotal}</span>`

        mainCart.append(cardProductInCart);
        total += producto.subtotal;
    });

    const totalValorCarrito = document.createElement('span');

    totalValorCarrito.classList.add("mainCartProduct");
    totalValorCarrito.innerText = `$${total}`;

    footerCart.append(totalValorCarrito);

    modal.style.display = 'block';
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function limpiarCarritoHtml(){
    while(mainCart.firstChild){
        mainCart.removeChild(mainCart.firstChild);
    }

    footerCart.removeChild(footerCart.lastChild);
}
btnVerCarrito.addEventListener("click", verCarrito);
btnComprar.addEventListener("click", comprar);
btnVerCompras.addEventListener("click", verCompras);

