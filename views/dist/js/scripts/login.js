$(function () {

    init();

    function init() {
        let sesion = JSON.parse(sessionStorage.getItem("sesion"));

        if (sesion) {
            redirigir(sesion.rol_id);
        } else {
            loguearse();
        }
    }

    function loguearse() {
        $('#btn-ingresar').click(function (e) {
            e.preventDefault();

            let usuario = $('#dato-user').val();
            let clave = $('#dato-clave').val();
            let captcha = $('.g-recaptcha-response').val();

            let json = {
                "login": {
                    "usuario": usuario,
                    "clave": clave,
                    "captcha": captcha
                }
            };

            if (validar(usuario, clave)) {
                ajax(json);
                console.log(json);
            } else {
                //console.log('error');
            }
        });
    }

    function ajax(data) {
        $.ajax({
            url: urlServidor + 'usuarios/login',
            data: "data=" + JSON.stringify(data),
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                toastr.options = {
                    "closeButton": true,
                    "preventDuplicates": true,
                    "positionClass": "toast-top-right",
                };
                if (response.status) {
                    toastr["success"](response.mensaje, "Login Exitoso");

                    let sesion = response.usuario;
                    let sesion_cliente = response.cliente;
                    console.log(sesion_cliente);
                    
                    sessionStorage.setItem('sesion', JSON.stringify(sesion));
                    sessionStorage.setItem('sesion-cliente', JSON.stringify(sesion_cliente));
                    
                    redirigir(sesion.roles.id);
                } else {
                    toastr["error"](response.mensaje, "Usuario");
                }
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema');
            },
            complete: function (xhr, status) {
                // console.log('Petición realizada');
            }
        });
    }

    function validar(usuario, clave) {
        toastr.options = {
            "closeButton": true,
            "preventDuplicates": true,
            "positionClass": "toast-top-right",
        };
        if (usuario.length == 0) {
            toastr["info"]('Ingrese Usuario', "Login");
            return false;
        } else if (clave.length == 0) {    
            toastr["info"]('Ingrese su contraseña', "Login");
            return false;
        } else {
            return true;
        }
    }

    function redirigir(rol) {
        switch (rol) {
            case 1:
                window.location = urlCliente + 'inicio/administrador';
                break;
            case 2:
                window.location = urlCliente + 'ventas/nueva';
                break;
            case 3:
                window.location = urlCliente + 'ventas/clientes';
                break;
            default:
                window.location = urlCliente + 'inicio/administrador';
                break;
        }
    }

});