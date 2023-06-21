    const renderizarObjetos = async () =>{
        const response = await fetch("../articulos.json");
        const data = await response.json();

        let articulos = data;

        articulos.forEach(producto => {
            const divProduct = document.createElement("div"); //card producto
            
            divProduct.classList.add("card")
            divProduct.innerHTML = `
            <h3>${producto.item}</h3>
            <p>Precio: $${producto.precio}</p>`
            
            containerCards.append(divProduct);

            const btnAgregarU = document.createElement("button"); //boton agregar unidades
            btnAgregarU.classList.add("btnCard")
            btnAgregarU.innerHTML = `<span>Agregar</span>`;
            divProduct.append(btnAgregarU);

            btnAgregarU.addEventListener("click", () => {
                const agregado = carrito.some((productoAgregado) => productoAgregado.item === producto.item )

                if(agregado){
                    carrito.map((productoAgregado) => {
                        if(producto.item === productoAgregado.item){
                            productoAgregado.cantidad += 1;
                            productoAgregado.subtotal = productoAgregado.precio * productoAgregado.cantidad;
                        }
                    })
                }
                else{
                    carrito.push({
                        item: producto.item,
                        precio: producto.precio,
                        cantidad: 1,
                        subtotal: producto.precio
                    })
                }
                console.log(carrito);

                localStorage.setItem("carrito", JSON.stringify(carrito));
            })

            const btnQuitarU = document.createElement("button"); //boton quitar unidades
            btnQuitarU.classList.add("btnCard")
            btnQuitarU.innerHTML = `<span>Quitar</span>`;
            divProduct.append(btnQuitarU);

            btnQuitarU.addEventListener("click", () => {
            carrito.map((productoAgregado) => {
                if(producto.item === productoAgregado.item){
                    if(productoAgregado.cantidad > 1){
                        productoAgregado.cantidad -= 1;
                        productoAgregado.subtotal = productoAgregado.precio * productoAgregado.cantidad;
                    }
                    else if(productoAgregado.cantidad === 1){
                        const eliminarProducto = carrito.indexOf(productoAgregado);
                        if(productoAgregado != -1){
                            carrito.splice(eliminarProducto, 1);
                        }
                    }
                    }
                
            })
            // console.log(carrito);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            // console.log(localStorage);
        })
    })
}

renderizarObjetos();
