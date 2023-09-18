var tabla;

_init();

function _init() {
    cargarCategorias();
    cargarProductos();
    cargarInventario();
    imprimir();
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

function cargarProductos() {
    $('#select-categoria').change(function () {
        let id = $('#select-categoria option:selected').val();
        $.ajax({
            // la URL para la petición
            url: urlServidor + 'categorias/listarXidProducto/' + id,
            // especifica si será una petición POST o GET
            type: 'GET',
            // el tipo de información que se espera de respuesta
            dataType: 'json',
            success: function (response) {
                //console.log(response);
                let inicio = '<option value=0>Seleccione un Producto</option>';
                let aux = 0;

                if (response.status) {
                    response.categoria.productos.forEach(element => {
                        aux += `<option value='${element.id}'>${element.nombre}</option>`;
                    });
                    inicio += aux;
                }
                $('#select-productos').html(inicio);
            },
            error: function (jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete: function (jqXHR, status) {
                // console.log('Petición realizada');
            }
        });
    });
}

function cargarInventario() {
    $('#btn-consulta').click(function () {
        let categorias_id = $('#select-categoria option:selected').val();
        let productos_id = $('#select-productos option:selected').val();

        toastr.options = {
            "closeButton": true,
            "preventDuplicates": true,
            "positionClass": "toast-top-right",
        };

        if(categorias_id == 0) {
            toastr["info"]('Debe seleccionar una Categoría');
        }else if(productos_id == 0) {
            toastr["info"]('Debe seleccionar un Producto');     
        }else{
            cargarTablaInventario(productos_id);
        }
    });
}

function cargarTablaInventario(id_producto) {
    tabla = $('#tabla-inventario').dataTable({
        "lengthMenu": [5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "aProcessing": true,//Activamos el procesamiento del datatables
        "aServerSide": true,//Paginación y filtrado realizados por el servidor
        dom: '<Bl<f>rtip>',//Definimos los elementos del control de tabla
        buttons: [],
        "ajax":
        {
            url: urlServidor + 'inventario/verInventario/' + id_producto,
            type: "get",
            dataType: "json",
            error: function (e) {
                console.log(e.responseText);
            }
        },
        "bDestroy": true,
        "iDisplayLength": 10,//Paginación
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
            }
        }//cerrando language
    });
    $('#tabla-reporte-data').removeClass('d-none');
}

function imprimir() {
    $('#btn-imprimir').click(function () {
        let data = $('#body-reporte-data tr');

        toastr.options = {
            "closeButton": true,
            "preventDuplicates": true,
            "positionClass": "toast-top-right",
        };
        if (data.length == 0) {
            toastr["info"]('Debe realizar la consulta primero');
        } else {
            let element = document.getElementById('tabla-reporte-data');

            let opt = {
                margin: 0.5,
                filename: 'Inventario de Productos.pdf',
                image: { type: 'jpeg', quality: 3 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'ledger', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        }
    });
}