var tabla;

_init();

function _init() {
    generarCodigo();
    previewImg();
    cargarCategorias();
    guardarProductos();
    listarTablaProductos();
    editarProductoModal();
    agregarStockProducto();
}

function generarCodigo(){
    $.ajax({
        // la URL para la petición
        url : urlServidor + 'productos/mostrarCodigo/productos',
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) {
           if(response.status){
               $('#codigo-producto').val(response.codigo);
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

function guardarCodigo(){
    let num_codigo = $('#codigo-producto').val();

    let json = {
        codigo: {
            num_codigo: num_codigo,
            tipo: 'productos'
        }
    }

    $.ajax({
        // la URL para la petición
        url : urlServidor + 'productos/guardarCodigo',
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
        },
        complete : function(jqXHR, status) {
            // console.log('Petición realizada');
        }
    });
}

function previewImg() {
    $('#imagen-producto').change(function () {
        readImage(this);
        $('#producto-imagen-preview').removeClass('d-none');
    });
}

function readImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#producto-imagen-preview').attr('src', e.target.result); // Renderizamos la imagen
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function cargarCategorias() {
    $.ajax({
        // la URL para la petición
        url: urlServidor + 'categorias/selectCategoria',
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        success: function (response) {
            if (response.status) {
                let option = '<option value=0>Seleccione una Categoría</option>';

                response.categoria.forEach(element => {
                    option += `<option value=${element.id}>${element.nombre_categoria}</option>`;
                });
                $('#select-categoria').html(option);
                $('#upd-categoria-p').html(option);
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

function guardarProductos() {
    $('#nuevo-productos').submit(function (e) {
        e.preventDefault();

        let categorias_id = $('#select-categoria option:selected').val();
        let codigo = $('#codigo-producto').val();
        let nombre = $('#nombre-producto').val();
        let descripcion = $('#producto-descripcion').val();
        let imagen = $('#imagen-producto')[0].files[0];
        let precio = $('#precio-producto').val();
        let fecha = $('#fecha-producto').val();
        let def = (imagen == undefined) ? 'producto_default.png' : imagen.name;

        toastr.options = {
            "closeButton": true,
            "preventDuplicates": true,
            "positionClass": "toast-top-right",
        };

        if (nombre.length == 0) {
            toastr["info"]('Debe ingresar un nombre');
        } else if (categorias_id == 0) {
            toastr["info"]('Debe seleccionar una categoría');
        } else if (precio.length == 0) {
            toastr["info"]('Debe ingresar un precio');
        } else if (descripcion.length == 0) {
            toastr["info"]('Debe ingresar una descripción');
        } else {
            let json = {
                producto: {
                    categorias_id,
                    codigo,
                    nombre,
                    descripcion,
                    imagen: def,
                    precio,
                    fecha,
                },
            };
            guardandoProducto(json);
        }
    });
}

function guardandoProducto(json) {
    $.ajax({
        // la URL para la petición
        url: urlServidor + 'productos/guardarProducto',
        data: "data=" + JSON.stringify(json),
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        success: function (response) {
            toastr.options = {
                "closeButton": true,
                "preventDuplicates": true,
                "positionClass": "toast-top-right",
            };

            if (response.status) {
                toastr["success"](response.mensaje, "Productos");
                $('#nuevo-productos')[0].reset();
                $('#codigo-producto').val(response.producto.codigo);
                guardarCodigo();
                listarTablaProductos();  
            } else {
                toastr["error"](response.mensaje, "Productos");
            }
        },
        error: function (jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        },
        complete: function (jqXHR, status) {
            // console.log('Petición realizada');
        }
    });

    if (json.producto.imagen == 'producto_default.png') {

    } else {
        let foto = $('#imagen-producto')[0].files[0];
        let formdata = new FormData();
        formdata.append('fichero', foto);

        $.ajax({
            // la URL para la petición
            url: urlServidor + 'productos/subirFotoProducto',
            data: formdata,
            contentType: false,
            processData: false,
            // especifica si será una petición POST o GET
            type: 'POST',
            // el tipo de información que se espera de respuesta
            dataType: 'json',
            success: function (response) {
                //console.log(response);
            },
            error: function (jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete: function (jqXHR, status) {
                // console.log('Petición realizada');
            }
        });
    }
    $('#producto-imagen-preview').attr('src', urlServidor + 'resources/productos/producto_default.png');
}

function listarTablaProductos() {
    tabla = $('#tabla-productos').DataTable({
        "lengthMenu": [5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "aProcessing": true,//Activamos el procesamiento del datatables
        "aServerSide": true,//Paginación y filtrado realizados por el servidor
        "ajax":
        {
            url: urlServidor + 'productos/listarProductoDataTable',
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

function eliminarProducto(id){
    let data = {
        producto: {
            id: id,
        }
    };

    $.ajax({
        // la URL para la petición
        url : urlServidor + 'productos/eliminarProducto',
        // especifica si será una petición POST o GET
        type : 'POST',
        // el tipo de información que se espera de respuesta
        data: {data: JSON.stringify(data)},
        dataType : 'json',
        success : function(response) {
            toastr.options = {
                "closeButton": true,
                "preventDuplicates": true,
                "positionClass": "toast-top-right",
            };

            if(response.status){
                toastr["success"](response.mensaje, "Productos");
                listarTablaProductos();
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

function editarProducto(id){
    $('#modal-editar-producto').modal('show'); 
    cargarProducto(id);  
}

function cargarProducto(id){
    $.ajax({
        url:urlServidor  +'productos/listarProductoId/'+id,
        type:'GET',
        dataType:'json',
        success:function(response){
            console.log(response);
            if(response.status){    
                $('#producto-id').val(response.producto.id);
                $('#upd-codigo-p').val(response.producto.codigo);
                $('#upd-nombre-p').val(response.producto.nombre);
                $('#upd-descripcion-p').val(response.producto.descripcion);
                $('#upd-precio-p').val(response.producto.precio);
                $('#upd-categoria-p').val(response.producto.categorias.id);
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

function editarProductoModal(){
    $('#btn-update').click(function(){

        let id = $('#producto-id').val();
        let nombre = $('#upd-nombre-p').val();
        let descripcion = $('#upd-descripcion-p').val();
        let precio = $('#upd-precio-p').val();
        let categorias_id = $('#upd-categoria-p option:selected').val();
                
        let json = {
            producto: {
                id:id,
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                categorias_id: categorias_id
            }
        };

        $.ajax({
            // la URL para la petición
            url : urlServidor + 'productos/editarProducto',
            type : 'POST',
            data: {data: JSON.stringify(json)},
            dataType : 'json',
            success : function(response){ 
                toastr.options = {
                    "closeButton": true,
                    "preventDuplicates": true,
                    "positionClass": "toast-top-right",
                };

                if(response.status){
                    toastr["success"](response.mensaje, "Productos");
                    $('#modal-editar-producto').modal('hide');
                    listarTablaProductos();
                }else{
                    toastr["error"](response.mensaje, "Productos");
                }
            },
            error : function(jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete : function(jqXHR, status) {
                // console.log('Petición realizada');
            } 
        });
    });
}

function agregarStock(id){
    $('#modal-agregar-stock').modal('show'); 
    cargarStockActual(id);  
}

function cargarStockActual(id) {
    $.ajax({
        url:urlServidor  +'productos/listarProductoId/'+id,
        type:'GET',
        dataType:'json',
        success:function(response){
            if(response.status){   
                $('#producto-stock-id').val(response.producto.id); 
                $('#stock-ac-p').val(response.producto.stock + ' unids');
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

function agregarStockProducto(){
    $('#btn-update-stock').click(function(){

        let id = $('#producto-stock-id').val();
        let stock = $('#upd-stock-p').val();
                
        let json = {
            producto: {
                id:id,
                stock: stock,
            }
        };

        $.ajax({
            // la URL para la petición
            url : urlServidor + 'productos/agregarStock',
            type : 'POST',
            data: {data: JSON.stringify(json)},
            dataType : 'json',
            success : function(response){ 
                toastr.options = {
                    "closeButton": true,
                    "preventDuplicates": true,
                    "positionClass": "toast-top-right",
                };

                if(response.status){
                    toastr["success"](response.mensaje, "Productos");
                    $('#modal-agregar-stock').modal('hide');
                    $('#upd-stock-p').val('');
                    listarTablaProductos();
                }else{
                    toastr["error"](response.mensaje, "Productos");
                }
            },
            error : function(jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete : function(jqXHR, status) {
                // console.log('Petición realizada');
            } 
        });
    });
}