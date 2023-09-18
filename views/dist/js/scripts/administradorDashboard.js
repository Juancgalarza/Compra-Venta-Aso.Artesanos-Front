
_init();

function _init() {
    cargarData();
    cargarGrafica1();
    cargarGrafica2();
    cargarGrafica3();
}

function cargarData() {
    cantidadUsuarios();
    function cantidadUsuarios() {
        $.ajax({
            url: urlServidor + 'usuarios/contar',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.status) {
                    $('#cantidad-usuarios').text(response.cantidad);
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

    cantidadClientes();
    function cantidadClientes() {
        $.ajax({
            url: urlServidor + 'clientes/contar',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.status) {
                    $('#cantidad-clientes').text(response.cantidad);
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

    cantidadProducto();
    function cantidadProducto() {
        $.ajax({
            url: urlServidor + 'productos/contar',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.status) {
                    $('#cantidad-productos').text(response.cantidad);
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

    totalventasxmes();
    function totalventasxmes() {
        $.ajax({
            url: urlServidor + 'ventas/totales',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.status) {
                    $('#total-ventas').text('$' + response.total);
                    $('#mes-ventas').text('Ventas' + ' - ' + response.mes);
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

function cargarGrafica1() {
    $.ajax({
        // la URL para la petición
        url: urlServidor + 'ventas/graficatotalxmes',
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        success: function (response) {
            toastr.options = {
                "closeButton": true,
                "preventDuplicates": true,
                "positionClass": "toast-top-right",
            };

            if (response.data.length > 0) {
                $('#anio-venta').text(response.anio);
                Highcharts.chart('ventas-mensual', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Ventas - ' + response.anio
                    },
                    xAxis: {
                        type: 'category',
                        labels: {
                            rotation: -45,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Cantidad en $'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Ventas',
                        data: response.data,
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y:.2f}', // one decimal
                            y: 10, // 10 pixels down from the top
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    }]
                });
            } else {
                toastr["info"]('No hay informacion disponible', "Dashboard");
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

function cargarGrafica2() {
    $.ajax({
        // la URL para la petición
        url: urlServidor + 'ventas/graficaDiarias',
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        success: function (response) {
            toastr.options = {
                "closeButton": true,
                "preventDuplicates": true,
                "positionClass": "toast-top-right",
            };

            if (response.data.length > 0) {
                Highcharts.chart('ventas-diarias', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Ventas Diarias'
                    },
                    xAxis: {
                        type: 'category',
                        labels: {
                            rotation: -45,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Cantidad en $'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Ventas',
                        data: response.data,
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y:.2f}', // one decimal
                            y: 10, // 10 pixels down from the top
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    }]
                });
            } else {
                toastr["info"]('No hay informacion disponible', "Dashboard");
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

function cargarGrafica3() {
    $.ajax({
        // la URL para la petición
        url: urlServidor + 'productos/graficoStockProductos',
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        success: function (response) {
            toastr.options = {
                "closeButton": true,
                "preventDuplicates": true,
                "positionClass": "toast-top-right",
            };

            if (response.data.length > 0) {
                Highcharts.chart('productos-stock', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Stock de Productos Por Categoría'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.y}'
                            }
                        }
                    },
                    series: [{
                        name: 'Stock',
                        colorByPoint: true,
                        data: response.data
                    }]
                });
            } else {
                toastr["info"]('No hay informacion disponible', "Dashboard");
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
