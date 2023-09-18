var tabla;

_init();

function _init() {
    guardarClientes();
    changecedula();
    cargarTablaClientes();
    editarClienteModal();
}

function validarcedula(cedula) {
    if (cedula.length == 10) {

        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0, 2);

        //Pregunto si la region existe ecuador se divide en 24 regiones
        if (digito_region >= 1 && digito_region <= 24) {

            // Extraigo el ultimo digito
            var ultimo_digito = cedula.substring(9, 10);

            //Agrupo todos los pares y los sumo
            var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

            //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
            var numero1 = cedula.substring(0, 1);
            var numero1 = (numero1 * 2);
            if (numero1 > 9) { var numero1 = (numero1 - 9); }

            var numero3 = cedula.substring(2, 3);
            var numero3 = (numero3 * 2);
            if (numero3 > 9) { var numero3 = (numero3 - 9); }

            var numero5 = cedula.substring(4, 5);
            var numero5 = (numero5 * 2);
            if (numero5 > 9) { var numero5 = (numero5 - 9); }

            var numero7 = cedula.substring(6, 7);
            var numero7 = (numero7 * 2);
            if (numero7 > 9) { var numero7 = (numero7 - 9); }

            var numero9 = cedula.substring(8, 9);
            var numero9 = (numero9 * 2);
            if (numero9 > 9) { var numero9 = (numero9 - 9); }

            var impares = numero1 + numero3 + numero5 + numero7 + numero9;

            //Suma total
            var suma_total = (pares + impares);

            //extraemos el primero digito
            var primer_digito_suma = String(suma_total).substring(0, 1);

            //Obtenemos la decena inmediata
            var decena = (parseInt(primer_digito_suma) + 1) * 10;

            //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
            var digito_validador = decena - suma_total;

            //Si el digito validador es = a 10 toma el valor de 0
            if (digito_validador == 10)
                var digito_validador = 0;

            //Validamos que el digito validador sea igual al de la cedula
            if (digito_validador == ultimo_digito) {
                return true;
            } else {
                return false;
            }

        } else {
            // imprimimos en consola si la region no pertenece
            return false;
        }
    } else {
        //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
        return false;
    }

}

function changecedula() {
    $('#new-cli-cedula').blur(function () {
        let cedula = $('#new-cli-cedula').val();

        if (!validarcedula(cedula)) {
            toastr["info"]('La cédula ingresada es incorrecta');
        } else {
            toastr["success"]('La cédula ingresada es correcta');
        }
    });
}

function guardarClientes() {
    $('#nuevo-clientes').submit(function (e) {
        e.preventDefault();

        let cedula = $('#new-cli-cedula').val();
        let nombre = $('#new-cli-nombre').val();
        let apellido = $('#new-cli-apellido').val();
        let celular = $('#new-cli-celular').val();
        let direccion = $('#new-cli-direccion').val();
        //datos de Usuario Cliente
        let usuario = $('#new-cli-usuario').val();
        let correo = $('#new-cli-correo').val();
        let imagen = $('#new-img-cliente')[0].files[0];
        let def = (imagen == undefined) ? 'cliente_default.jpg' : imagen.name;

        let json = {
            persona: {
                cedula,
                nombre,
                apellido,
                celular,
                direccion
            },
            usuario: {
                usuario,
                correo,
                imagen: def
            }
        };

        //validacion para datos de cliente
        if (!validarData(json)) {
            console.log('llene los datos de cliente');
        } else {
            guardandocliente(json);
        }
    });
}

function validarData(json) {
    let persona = json.persona;

    toastr.options = {
        "closeButton": true,
        "preventDuplicates": true,
        "positionClass": "toast-top-right",
    };

    if (persona.cedula.length == 0) {
        toastr["info"]('Debe ingresar una cedula');
        return false;
    } else if (persona.nombre.length == 0) {
        toastr["info"]('Debe ingresar un nombre');
        return false;
    } else if (persona.apellido.length == 0) {
        toastr["info"]('Debe ingresar un apellido');
        return false;
    } else if (persona.celular.length == 0) {
        toastr["info"]('Debe ingresar un # celular');
        return false;
    } else if (persona.direccion.length == 0) {
        toastr["info"]('Debe ingresar una dirección');
        return false;
    } else if (persona.cedula.length < 10 || persona.nombre.length < 2 || persona.apellido.length < 2) {
        return false;
    } else if (persona.length == 0) {
        return false;
    } else if (!validarcedula(persona.cedula)) {
        toastr["info"]('La cédula ingresada es incorrecta');
        return false;
    } else {
        return true;
    }
}

function guardandocliente(json) {
    $.ajax({
        url: urlServidor + 'clientes/guardarCliente',
        type: 'POST',
        data: 'data=' + JSON.stringify(json),
        dataType: 'json',
        success: function (response) {
            toastr.options = {
                "closeButton": true,
                "preventDuplicates": true,
                "positionClass": "toast-top-right",
            };

            if (response.status) {
                toastr["success"](response.mensaje, "Clientes");
                $('#nuevo-clientes')[0].reset();
                cargarTablaClientes();
            } else {
                toastr["error"](response.mensaje, "Clientes");
            }
        },
        error: function (jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        },
        complete: function (jqXHR, status) {
            // console.log('Petición realizada');
        }
    });

    if (json.usuario.imagen == 'cliente_default.jpg') {

    } else {
        let imagen = $('#new-img-cliente')[0].files[0];
        let formData = new FormData();
        formData.append('fichero', imagen);

        $.ajax({
            // la URL para la petición
            url: urlServidor + 'clientes/subirFoto',
            // especifica si será una petición POST o GET
            type: 'POST',
            // el tipo de información que se espera de respuesta
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (responseImg) {
                if (responseImg.status) {

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
}

function cargarTablaClientes() {
    tabla = $('#tabla-clientes').DataTable({
        "lengthMenu": [5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "aProcessing": true,//Activamos el procesamiento del datatables
        "aServerSide": true,//Paginación y filtrado realizados por el servidor
        "ajax":
        {
            url: urlServidor + 'clientes/listarTable',
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

function eliminarCliente(id) {
    let data = {
        cliente: {
            id: id,
        }
    };

    $.ajax({
        // la URL para la petición
        url: urlServidor + 'clientes/eliminarCliente',
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
                toastr["success"](response.mensaje, "Clientes");
                cargarTablaClientes();
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

function editarCliente(id) {
    $('#modal-editar-cliente').modal('show');
    cargarCliente(id);
}

function cargarCliente(id) {
    $.ajax({
        url: urlServidor + 'clientes/listarId/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.status) {
                $('#cliente-id').val(response.cliente.id);
                $('#persona-id').val(response.cliente.personas.id);
                $('#upd-cli-cedula').val(response.cliente.personas.cedula);
                $('#upd-cli-nombre').val(response.cliente.personas.nombre);
                $('#upd-cli-apellido').val(response.cliente.personas.apellido);
                $('#upd-cli-celular').val(response.cliente.personas.celular);
                $('#upd-cli-direccion').val(response.cliente.personas.direccion);
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

function editarClienteModal() {
    $('#btn-update').click(function () {

        let id = $('#cliente-id').val();
        let personas_id = $('#persona-id').val();
        let nombre = $('#upd-cli-nombre').val();
        let apellido = $('#upd-cli-apellido').val();
        let celular = $('#upd-cli-celular').val();
        let direccion = $('#upd-cli-direccion').val();

        toastr.options = {
            "closeButton": true,
            "preventDuplicates": true,
            "positionClass": "toast-top-right",
        };

        let json = {
            cliente: {
                id: id,
                personas_id: personas_id,
                nombre: nombre,
                apellido: apellido,
                celular: celular,
                direccion: direccion,
            }
        };

        $.ajax({
            // la URL para la petición
            url: urlServidor + 'clientes/editarCliente',
            type: 'POST',
            data: { data: JSON.stringify(json) },
            dataType: 'json',
            success: function (response) {
                if (response.status) {
                    toastr["success"](response.mensaje, "Clientes");
                    $('#modal-editar-cliente').modal('hide');
                    cargarTablaClientes();
                } else {
                    toastr["error"](response.mensaje, "Clientes");
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