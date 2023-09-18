_init();

function _init() {
    cargarData();
    imprimir();
}

function cargarData() {
    $('#btn-consulta').click(function () {
        let fecha_inicio = $('#fecha-inicio-r-m').val();
        let fecha_fin = $('#fecha-fin-r-m').val();
        let limite = $('#limite option:selected').val();

        toastr.options = {
            "closeButton": true,
            "preventDuplicates": true,
            "positionClass": "toast-top-right",
        };

        if (fecha_inicio.length == 0) {
            toastr["info"]('Debe seleccionar un desde');
        } else
            if (fecha_fin.length == 0) {
                toastr["info"]('Debe seleccionar un hasta');
            } else {
                if (moment(fecha_inicio).isAfter(fecha_fin)) {
                    toastr["info"]('La fecha desde no puede ser menor');
                } else {
                    if (limite == 0) {
                        toastr["info"]('Debe seleccionar un límite');
                    } else {
                        let f = new Date();
                        let fecha = f.getDate() + '/' + (f.getMonth() + 1) + '/' + f.getFullYear();
                        let hora = f.getHours() + ':' + (f.getMinutes()) + ':' + f.getSeconds();
    
                        $('#fecha-inicio-r-m2').text(fecha_inicio);
                        $('#fecha-fin-r-m2').text(fecha_fin);
                        $('#fecha-consulta-s').text(fecha);
                        $('#hora-consulta-s').text(hora);
    
                        $.ajax({
                            // la URL para la petición
                            url: urlServidor + 'ventas/masVendidos/' + fecha_inicio + '/' + fecha_fin + '/' + limite,
                            // especifica si será una petición POST o GET
                            type: 'GET',
                            // el tipo de información que se espera de respuesta
                            dataType: 'json',
                            success: function (response) {
                                console.log(response);
                                let tr = ''; let div = '';
                                let i = 1; let totala = 0; let totalaf = 0;
                                if (response.cantidad.lista.length > 0) {
                                    response.cantidad.lista.forEach(element => {
                                        totala += element.y;
                                        totalaf = totala.toFixed(2);
        
                                        tr += `<tr>
                                            <td>${i}</td>
                                            <td>${element.name}</td>
                                            <td> ${element.y}</td>
                                        </tr>`;
                                        i++;
                                        div = '';
                                    });
                                    $('#body-reporte-data').html(tr);
                                    $('#tabla-reporte-data').removeClass('d-none');
                                    $('#total-general').html(totalaf);

                                    Highcharts.chart('productos-cantidad', {
                                        chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false,
                                            type: 'pie'
                                        },
                                        title: {
                                            text: 'Cantidad de Productos'
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
                                            name: 'Cantidad',
                                            colorByPoint: true,
                                            data: response.cantidad.lista
                                        }]
                                    });

                                    Highcharts.chart('productos-porcentaje', {
                                        chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false,
                                            type: 'pie'
                                        },
                                        title: {
                                            text: 'Porcentaje de Productos'
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
                                                    format: '<b>{point.name}</b>: {point.y:.2f} %'
                                                }
                                            }
                                        },
                                        series: [{
                                            name: 'Porcentaje',
                                            colorByPoint: true,
                                            data: response.porcentaje.lista
                                        }]
                                    });
                                } else {
                                    toastr["info"]('No hay informacion disponible', "Reportes");
                                    $('#tabla-reporte-data').addClass('d-none');
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
            }
    });
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
                filename: 'Reporte Productos Más Vendidos.pdf',
                image: { type: 'jpeg', quality: 3 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'ledger', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        }
    });
}