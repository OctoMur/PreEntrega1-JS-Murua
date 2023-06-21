class Compra{
    constructor(carrito){
        this.prendas = [...carrito];
        this.montoCompra = 0;
        this.tarjeta = false;
    }

    calcularTotal(tarjeta){
        for(const producto of this.prendas){
            this.montoCompra += producto.subtotal;
        }

        if(tarjeta === true){
            this.montoCompra += this.montoCompra * 0.1;
            this.tarjeta = tarjeta;
        }
    }
}