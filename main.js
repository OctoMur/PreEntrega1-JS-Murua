let montoCompra = 0, prenda, cantidad;
let salida;

do {
    salida = parseInt(prompt("Ingrese un numero segun el producto deseado (0 para terminar la compra)"));
    switch (salida) {
        case 1:
            prenda = 1500;
            break;
        case 2:
            prenda = 1000;
            break;
        case 3:
            prenda = 1000;
            break
        case 4:
            prenda = 800;
        break;
        case 5:
            prenda = 1500;
        break;
        case 6:
            prenda = 2000;
        break;
        case 7:
            prenda = 600;
        break;
        
        default:
            break;
    }

    if(salida != 0){
        cantidad = parseInt(prompt("cuantas prendas desea agregar?"));
        montoCompra += prenda * cantidad;
    }

} while (salida != 0);

///////////////////////////////////////////////////////
function recargo(){
    montoCompra += montoCompra * 0.10;
}
///////////////////////////////////////////////////////

if(prompt("Desea pagar con tarjeta? escriba SI (10% de recargo) o NO").toLowerCase() == "si")
{
    montocompra = recargo();
}

alert(`Monto final: ${montoCompra}`);