var tabla;

_init();

function _init() {
    guardarCategorias();
    listarTablaCategorias();
    editarCategoriaModal();
}

function guardarCategorias(){
    $('#nueva-categoria').click(function(){
        let nombre_categoria = $('#texto-categoria').val();

        toastr.options = {
            "closeButton": true,
            "preventDuplicates": true,
            "positionClass": "toast-top-right",
        };

        if(nombre_categoria.length == 0){
            toastr["info"]('Debe ingresar el nombre de una categoría');
        }else{
            let json ={
                categoria:{
                    nombre_categoria,
                }
            }
            guardandocategorias(json);
        }       
    });
}

function guardandocategorias(json){
    $.ajax({
        url:urlServidor  +'categorias/guardar',
        type:'POST',
        data: 'data=' + JSON.stringify(json),
        dataType:'json',
        success:function(response){
            toastr.options = {
                "closeButton": true,
                "preventDuplicates": true,
                "positionClass": "toast-top-right",
            };

            if(response.status){
                toastr["success"](response.mensaje, "Categorías");
                $('#texto-categoria').val('');
                listarTablaCategorias();
            } else{
                toastr["error"](response.mensaje, "Categorías");
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

function listarTablaCategorias() {
    tabla = $('#tabla-categorias').DataTable({
        "lengthMenu": [5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "aProcessing": true,//Activamos el procesamiento del datatables
        "aServerSide": true,//Paginación y filtrado realizados por el servidor
        "ajax":
        {
            url: urlServidor + 'categorias/listarCategoriasDataTable',
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
            }

        }//cerrando language
    });
}

function eliminarCategoria(id) {
    let data = {
        categoria: {
            id: id,
        }
    };

    $.ajax({
        // la URL para la petición
        url: urlServidor + 'categorias/eliminar',
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        data: { data: JSON.stringify(data) },
        dataType: 'json',
        success: function (response) {
            toastr.options = {
                "closeButton": true,
                "preventDuplicates": true,
                "positionClass": "toast-top-right",
            };

            if (response.status) {
                toastr["success"](response.mensaje, "Categorías");
                listarTablaCategorias();
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

function editarCategoria(id) {
    $('#modal-editar-categoria').modal('show');
    cargarCategoria(id);
}

function cargarCategoria(id) {
    $.ajax({
        url: urlServidor + 'categorias/listarId/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.status) {
                $('#upd-categoria-id').val(response.categoria.id);
                $('#upd-nombre-categoria').val(response.categoria.nombre_categoria);
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

function editarCategoriaModal() {
    $('#btn-update').click(function () {

        let id = $('#upd-categoria-id').val();
        let nombre_categoria = $('#upd-nombre-categoria').val();

        let json = {
            categoria: {
                id: id,
                nombre_categoria: nombre_categoria
            }
        };

        $.ajax({
            // la URL para la petición
            url: urlServidor + 'categorias/editar',
            type: 'POST',
            data: { data: JSON.stringify(json) },
            dataType: 'json',
            success: function (response) {
                toastr.options = {
                    "closeButton": true,
                    "preventDuplicates": true,
                    "positionClass": "toast-top-right",
                };

                if (response.status) {
                    toastr["success"](response.mensaje, "Categorías");
                    $('#modal-editar-categoria').modal('hide');
                    listarTablaCategorias();
                } else {
                    toastr["error"](response.mensaje, "Categorías");
                }
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