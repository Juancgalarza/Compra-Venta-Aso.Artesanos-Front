_init();

let carrito = [];
const tbody = document.querySelector('.listprovent');

function _init() {
    generarCodigo()
    mostrarIva();
    cargarProductos();
    cargarClientes();
    guardarVentas();
    listarTablasVentas();
    imprimir();
}

function generarCodigo() {
    $.ajax({
        // la URL para la petición
        url: urlServidor + 'ventas/mostrarCodigo/ventas',
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
            tipo: 'ventas'
        }
    }

    $.ajax({
        // la URL para la petición
        url : urlServidor + 'ventas/guardarCodigo',
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

function cargarClientes() {
    tabla = $('#tabla-clientes-venta').DataTable({
        "lengthMenu": [5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "aProcessing": true,//Activamos el procesamiento del datatables
        "aServerSide": true,//Paginación y filtrado realizados por el servidor
        "ajax":
        {
            url: urlServidor + 'clientes/listarClienteDataTableVenta',
            type: "get",
            dataType: "json",
            error: function (e) {
                console.log(e.responseText);
            }
        },
        destroy: true,
        "iDisplayLength": 5,//Paginación
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",

            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },

            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },

        }//cerrando language
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
        let clientes_id = $('#cliente-id').val();
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
                reset();
                guardarCodigo();
                vaciarCarritoDelLocalStorage();
                cargarProductos();
                pintardetalleCarrito();
                carritoTotal();
                $('#detalle-prod').addClass('d-none');
                listarTablasVentas();
            }else{
                toastr["error"](response.mensaje, "Ventas");
            }     
        },
        error : function(jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        }
    }); 
}

function seleccionarCliente(id) {
    $.ajax({
        url: urlServidor + 'clientes/listarId/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.status) {
                $('#cliente-id').val(response.cliente.id);
                $('#v-cli-cedula').val(response.cliente.personas.cedula);
                $('#v-cli-nombre').val(response.cliente.personas.nombre);
                $('#v-cli-apellidos').val(response.cliente.personas.apellido);
                $('#v-cli-celular').val(response.cliente.personas.celular);
                $('#v-cli-direccion').val(response.cliente.personas.direccion);
                $('#modal-cliente').modal('hide');
            }
        },
        error: function (jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        },
        complete: function (jqXHR, status) {
            // console.log('Petición realizada');
        }
    });
}

function reset() {
    $('#cliente-id').val('');
    $('#v-cli-cedula').val('');
    $('#v-cli-nombre').val('');
    $('#v-cli-apellidos').val('');
    $('#v-cli-celular').val('');
    $('#v-cli-direccion').val('');   
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

function listarTablasVentas(){
    tabla=$('#tabla-ventas').dataTable({
        "lengthMenu": [ 5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "aProcessing": true,//Activamos el procesamiento del datatables
        "aServerSide": true,//Paginación y filtrado realizados por el servidor
        dom: '<Bl<f>rtip>',//Definimos los elementos del control de tabla
        buttons: [		          
                ],
        "ajax":
                {
                    url:  urlServidor + 'ventas/listarDataTable', 
                    type : "get",
                    dataType : "json",						
                    error: function(e){
                        console.log(e.responseText);	
                    }
                },
        "bDestroy": true,
        "iDisplayLength": 10,//Paginación

        "language": {

            "sProcessing":     "Procesando...",
         
            "sLengthMenu":     "Mostrar _MENU_ registros",
         
            "sZeroRecords":    "No se encontraron resultados",
         
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
         
            "sInfo":           "Mostrando un total de _TOTAL_ registros",
         
            "sInfoEmpty":      "Mostrando un total de 0 registros",
         
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
         
            "sInfoPostFix":    "",
         
            "sSearch":         "Buscar:",
         
            "sUrl":            "",
         
            "sInfoThousands":  ",",
         
            "sLoadingRecords": "Cargando...",
         
            "oPaginate": {
         
                "sFirst":    "Primero",
         
                "sLast":     "Último",
         
                "sNext":     "Siguiente",
         
                "sPrevious": "Anterior"
         
            },
         
            "oAria": {
         
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
         
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
         
            }

           }//cerrando language
    });
}

function verComprobante(id){
    $('#modal-comprobante').modal('show');
    $.ajax({
        // la URL para la petición
        url : urlServidor + 'ventas/listarxId/' + id,
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) {
            console.log(response);
            let tr = '';
            if(response.status){
                let venta_id = response.venta.id;
                let fecha_ventas = response.venta.fecha_venta;
                
                let codigo_venta = response.venta.codigo;
                let clientes_venta = response.venta.clientes.personas.nombre + ' ' + response.venta.clientes.personas.apellido;
                
                let venta_subtotal = response.venta.subtotal;
                let subtotal = venta_subtotal.toFixed(2);
                let venta_iva = response.venta.iva;
                let iva = venta_iva.toFixed(2);
                let venta_total = response.venta.total;
                let total = venta_total.toFixed(2);
                
                $('#venta-id').text(venta_id);
                $('#codigo-ventas').text(codigo_venta);
                $('#cliente-venta').text(clientes_venta);
                $('#fecha-ventas').text(fecha_ventas);
                
                $('#venta_subtotal').text('$ '+ subtotal);
                $('#venta_iva').text('$ '+ iva);
                $('#venta_total').text('$ '+ total);
                
                response.venta.detalle_venta.forEach((element, i) => {
                    let preciod = element.productos.precio;
                    let precio = preciod.toFixed(2);
                    let totald = element.total;
                    let total = totald.toFixed(2);
                    tr += `<tr>
                                <td style="color: black;">${i+1} </td>
                                <td style="color: black;">${element.productos.nombre}</td>
                                <td style="color: black;">${element.cantidad}</td>
                                <td style="color: black;">${precio}</td>
                                <td style="color: black;">${total}</td>
                            </tr>`;
                });
                $('#body_detalle_venta').html(tr);
            }
        },
        error : function(jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        },
        complete : function(jqXHR, status) {
            // console.log('Petición realizada');
        }
    });
}

function imprimir(){
    $('#btn-imprimir').click(function(){
        let element = document.getElementById('comprobante-venta');

            let opt = {
            margin:       0.5,
            filename:     'Comprobante De Venta.pdf',
            image:        { type: 'jpeg', quality: 3 },
            html2canvas:  { scale: 1.5 },
            jsPDF:        { unit: 'mm', format: 'ledger', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
    });
}
