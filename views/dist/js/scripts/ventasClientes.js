_init();

let carrito = [];
const tbody = document.querySelector('.listprovent');

function _init() {
    generarCodigo()
    mostrarIva();
    cargarProductos();
    guardarVentas();
    //listarTablasVentas();
    //imprimir();
}

function generarCodigo() {
    $.ajax({
        // la URL para la petición
        url: urlServidor + 'ventas/mostrarCodigoVentaCliente/ventasCliente',
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        success: function (response) {
            //console.log(response);
            if (response.status) {
                $('#codigo-venta').val(response.codigo);
            }
        },
        error: function (jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        }
    });
}

function guardarCodigo(){
    let num_codigo = $('#codigo-venta').val();

    let json = {
        codigo: {
            num_codigo: num_codigo,
            tipo: 'ventasCliente'
        }
    }

    $.ajax({
        // la URL para la petición
        url : urlServidor + 'ventas/guardarCodigoVentaCliente',
        // especifica si será una petición POST o GET
        type : 'POST',
        data : "data=" + JSON.stringify(json),
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) {
            //console.log(response); 
            generarCodigo();
        },
        error : function(jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        }
    });
}

function mostrarIva(){
    $.ajax({
        // la URL para la petición
        url : urlServidor + 'configuraciones/listarConfiguracionesxId/' + 1,
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) { 
            if(response.status){
                $('#acu-valor-iva').text(response.configuracion.iva);
            }
        },
        error : function(jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        }
    });
}

function cargarProductos() {
    $.ajax({
        url: urlServidor + 'productos/listarProducto',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            let div = '';
            if (response.status) {
                response.producto.map(p => {
                    let i = 0;
                    div += `<div class="col-6 col-md-3">
                                <div class="card card-solid" id="card-prod">
                                    <div class="box-img d-flex justify-content-center">
                                        <img src="${urlServidor}resources/productos/${p.imagen}" class="img-lg">
                                    </div>
                                    <div class="card-body text-center">
                                        <medium>${p.nombre}</medium><br>
                                        <b>Stock:  <small class="badge badge-info">${p.stock} </small> </b>
                                        <div class="row d-flex justify-content-between">Precio: <b><medium>$ ${p.precio}</medium></b> </div>
                                        <button class="btn btn-info btn-sm mt-1" onclick="agregarAlCarrito(${p.id})">
                                            <i class="fa fa-cart-plus mr-2"></i>Agregar Al Carrito
                                        </button>
                                    </div>
                                </div>
                            </div>`;
                    i++;
                });
            }
            $('#cardProducto').html(div);
        },
        error: function (jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        }
    });
}

function agregarAlCarrito(id) {
    $.ajax({
        url: urlServidor + 'productos/listarProductoxIdMasCantidad/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.length > 0) {
                response.map((p) => {
                    let id = p.producto.id;
                    let nombre = p.producto.nombre;
                    let cantidad = p.cantidad;
                    let precio = p.producto.precio;
                    let stock = p.producto.stock;
                    let imagen = p.producto.imagen;

                    const newObjec = {
                        id: id,
                        nombre: nombre,
                        precio: precio,
                        cantidad: cantidad,
                        stock: stock,
                        imagen: imagen
                    }

                    addItemCarrito(newObjec);
                    pintardetalleCarrito();
                    carritoTotal();
                });
            }
        },
        error: function (jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        }
    });
}

function addItemCarrito(newObjec) {
    toastr.options = {
        "closeButton": true,
        "preventDuplicates": true,
        "positionClass": "toast-top-center",
    }; 

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === newObjec.id) {
            carrito[i].cantidad++; //aumenta la cantidad repetida x el id del producto
            carritoTotal();
            return null;
        }
    }
    carrito.push(newObjec);
    toastr["success"]('El producto ' + newObjec.nombre + ' se agrego al carrito');
    pintardetalleCarrito();
}

function pintardetalleCarrito() {
    tbody.innerHTML = '';

    if (carrito === undefined) {
        carrito = [];
    } else {
        carrito.map(item => {
            const tr = document.createElement('tr');
            tr.classList.add('ItemCarrito');

            let total_producto = Number((parseInt(item.cantidad) * parseFloat(item.precio)));
            let totalp = total_producto.toFixed(2);
            let preciof = item.precio;
            let precio = preciof.toFixed(2);

            const Content = `
                            <td><i class="fas fa-star-of-life"></i></td>
                            <td><div class="box-img-producto"><img src="${urlServidor}resources/productos/${item.imagen}"></div></td>
                            <td>${item.nombre}</td>
                            <td>${item.cantidad}</td>
                            <td>${precio}</td>
                            <td class="total_producto">${totalp}</td>
                            <td>
                                <button class="btn btn-primary btn-sm">
                                    <i class="fa fa-plus"></i>
                                </button>
                                <button class="btn btn-dark btn-sm">
                                <i class="fa fa-minus"></i>
                                </button>
                            </td>
                            <th>
                                <div>
                                    <button class="btn btn-info delete">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </th>
                            <th style="display:none;" class="id">${item.id}</th>
                            <th style="display:none;" class="stock">${item.stock}</th>`;

            tr.innerHTML = Content;
            tbody.append(tr);
            tr.querySelector('.delete').addEventListener('click', borrarItemCarrito);
            tr.querySelector('.btn-primary').addEventListener('click', aumentar);
            tr.querySelector('.btn-dark').addEventListener('click', disminuir);
            $('#detalle-prod').removeClass('d-none');
        });
    }
}

function carritoTotal() {
    let url = urlServidor + 'configuraciones/listarConfiguracionesxId/' + 1;
    fetch(url, {
        method: 'GET'
    })
        .then(data => data.json())
        .then((response) => {
            if (response.status) {
                let ivaApi = response.configuracion.iva;
                let subIva = parseInt(ivaApi);
                let subTotalProducto = 0; let subtotal = 0; let iva = 0; let total = 0;
                const classSubtotal = document.querySelector('.classSubtotal');
                const classSubIva = document.querySelector('.classSubIva');
                const classTotal = document.querySelector('.classTotal');

                carrito.map((item) => {
                    subTotalProducto = Number((subTotalProducto + (parseFloat(item.precio) * (parseInt(item.cantidad))))),
                        subtotal = subTotalProducto.toFixed(2);
                    iva = Number(((parseFloat(subtotal)) * ((subIva) / 100)).toFixed(2));
                    total = Number(((parseFloat(subtotal)) + (iva)).toFixed(2));
                });
                $('#venta-subtotal').val(Number(parseFloat(subtotal)));
                $('#venta-iva').val(Number(parseFloat(iva)));
                $('#venta-totalg').val(Number(parseFloat(total)));

                classSubtotal.innerHTML = subtotal;
                classSubIva.innerHTML = iva;
                classTotal.innerHTML = total;
                addLocalStorage();
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function borrarItemCarrito(e) {
    const buttonDelete = e.target;
    const trPadre = buttonDelete.closest('.ItemCarrito');

    const classId = trPadre.querySelector('.id').innerHTML;
    let id = Number(classId);

    for (let j = 0; j < carrito.length; j++) {
        if (carrito[j].id === id) {
            carrito.splice(j, 1);
        }
    }
    trPadre.remove();
    carritoTotal();
    let data = $('#listProdVentas tr');
    if (data.length == 0) {
        $('#detalle-prod').addClass('d-none');
    }
}

function aumentar(e) {
    const buttonAumentar = e.target;
    const trPadre = buttonAumentar.closest('.ItemCarrito');
    const classId = trPadre.querySelector('.id').innerHTML;
    let id = Number(classId);
    toastr.options = {
        "closeButton": true,
        "preventDuplicates": true,
        "positionClass": "toast-top-right",
    }; 

    if (e.target.classList.contains('btn-primary')) {
        carrito.forEach((c) => {
            if (c.id === id) {
                c.cantidad++;
                if (c.cantidad > c.stock) {
                    const btnbloq = trPadre.querySelector('.btn-primary').disabled = true;
                    toastr["info"]('La cantidad excede al stock actual');
                    return btnbloq;
                }
                pintardetalleCarrito();
                carritoTotal();
            }
        });
    }
}

function disminuir(e) {
    const buttonDisminuir = e.target;
    const trPadre = buttonDisminuir.closest('.ItemCarrito');
    const classId = trPadre.querySelector('.id').innerHTML;
    let id = Number(classId);

    for (let m = 0; m < carrito.length; m++) {
        if (carrito[m].id === id) {
            carrito[m].cantidad--;

            if (carrito[m].cantidad === 0) {
                carrito.splice(m, 1);
            }
            pintardetalleCarrito();
            carritoTotal();
        }
    }

    let data = $('#listProdVentas tr');
    if (data.length == 0) {
        $('#detalle-prod').addClass('d-none');
    }
}

function guardarVentas() {
    $('#guardar-venta').click(function(){
        let usuarios_id = JSON.parse(sessionStorage.getItem('sesion')).id;
        let clientes_id = JSON.parse(sessionStorage.getItem('sesion-cliente'));
        let codigo = $('#codigo-venta').val();
        let subtotal = $('#venta-subtotal').val();
        let iva = $('#venta-iva').val();
        let total = $('#venta-totalg').val();
    
        let object = arrayDetalleVenta();
        let validacionStock = validarStock();

        toastr.options = {
            "closeButton": true,
            "preventDuplicates": true,
            "positionClass": "toast-top-right",
        };

        if(clientes_id.length == 0){
            toastr["info"]('Debe seleccionar un cliente');
        }else if(object == false){
            toastr["info"]('Debe seleccionar al menos un Producto');
        }else if(validacionStock == false){
            toastr["info"]('La cantidad excede el stock actual');
        }else{
            let json = {
                venta:{
                    usuarios_id,
                    clientes_id,
                    codigo,
                    subtotal,
                    iva,
                    total,
                },
                detalle_venta:object.detalle_venta 
            }
            guardandoventas(json);
        }
    });
}

function arrayDetalleVenta() {
    const storageCarrito = JSON.parse(localStorage.getItem('carrito'));
    
    if(storageCarrito === null){
        return false;
    }else{
        if(storageCarrito.length == 0){
            return false;
        }else{
            let detalle_venta = [];  let json = {};

            for(let i=0; i < storageCarrito.length; i++){
                let productos_id = storageCarrito[i].id;
                let cantidad = storageCarrito[i].cantidad;
                let precio = storageCarrito[i].precio;
                let totalg = (cantidad * precio).toFixed(2);
                let total = Number(totalg);

                let object = {productos_id,cantidad,precio,total};//almacenamos en un objeto
                detalle_venta.push(object);// el objeto lo almacenamos en un array
                json = {detalle_venta}
            }
            return json;
        }
    }
}

function validarStock() {
    let jsonS = {};
    const storageCarritoStock = JSON.parse(localStorage.getItem('carrito'));
    
    if(storageCarritoStock === null){
        return false;
    }else{
        if(storageCarritoStock.length == 0){
            return false;
        }else{
            for (let j = 0; j < storageCarritoStock.length; j++) {
                const element = storageCarritoStock[j];
                let cantidad = element.cantidad;
                let stock = element.stock;
    
                if(cantidad > stock){
                    return false;
                }else{
                    let oj = {cantidad,stock};
                    jsonS={oj};
                }
            }
            return jsonS;
        }
    }
}

function guardandoventas(json) {
    $.ajax({
        // la URL para la petición
        url : urlServidor + 'ventas/guardarVenta',
        // especifica si será una petición POST o GET
        type : 'POST',
        data : "data=" + JSON.stringify(json),
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) {
            toastr.options = {
                "closeButton": true,
                "preventDuplicates": true,
                "positionClass": "toast-top-right",
            }; 
            if(response.status){
                toastr["success"](response.mensaje, "Ventas");
                guardarCodigo();
                vaciarCarritoDelLocalStorage();
                cargarProductos();
                pintardetalleCarrito();
                carritoTotal();
                $('#detalle-prod').addClass('d-none');
                //listarTablasVentas();
            }else{
                toastr["error"](response.mensaje, "Ventas");
            }     
        },
        error : function(jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        }
    }); 
}

function vaciarCarritoDelLocalStorage() {
    let car = localStorage.getItem('carrito');

    if(car){
        let vaciarCar = localStorage.removeItem('carrito');
        carrito = vaciarCar;
    }
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));   
}

window.onload = () => {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        pintardetalleCarrito();
        carritoTotal();
    }  
}