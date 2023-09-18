_init();

function _init() {
    cargarData();
    imprimir();
}

function cargarData() {
    $('#btn-consulta').click(function () {
        let fecha_inicio = $('#fecha-inicio-r-m').val();
        let fecha_fin = $('#fecha-fin-r-m').val();

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
                    let f = new Date();
                    let fecha = f.getDate() + '/' + (f.getMonth() + 1) + '/' + f.getFullYear();
                    let hora = f.getHours() + ':' + (f.getMinutes()) + ':' + f.getSeconds();

                    $('#fecha-inicio-r-m2').text(fecha_inicio);
                    $('#fecha-fin-r-m2').text(fecha_fin);
                    $('#fecha-consulta-s').text(fecha);
                    $('#hora-consulta-s').text(hora);

                    $.ajax({
                        // la URL para la petición
                        url: urlServidor + 'ventas/comprobantesVenta/' + fecha_inicio + '/' + fecha_fin,
                        // especifica si será una petición POST o GET
                        type: 'GET',
                        // el tipo de información que se espera de respuesta
                        dataType: 'json',
                        success: function (response) {
                            console.log(response);
                            let tr = ''; let div = '';
                            let i = 1; let j = 1; let totala = 0; let totalaf = 0;
                            if (response.status) {
                                response.venta.forEach(element => {
                                    element.detalle_venta.forEach(e =>{
                                        div += `
                                                <div>
                                                    <span>* ${e.productos.nombre}</span>
                                                </div>
                                                `;
                                        j++;               
                                    }); 

                                    let subtotalf = element.subtotal;
                                    let subtotal = subtotalf.toFixed(2);
                                    let ivaf = element.iva;
                                    let iva = ivaf.toFixed(2);
                                    let totalf = element.total;
                                    let total = totalf.toFixed(2);

                                    totala += element.total;
                                    totalaf = totala.toFixed(2);
    
                                    tr += `<tr>
                                        <td>${i}</td>
                                        <td>${element.codigo}</td>
                                        <td> ${div}</td>
                                        <td>${element.fecha_venta}</td>
                                        <td>${subtotal}</td>
                                        <td>${iva}</td>
                                        <td>$${total}</td>
                                    </tr>`;
                                    i++;
                                    div = '';
                                });
                                $('#body-reporte-data').html(tr);
                                $('#tabla-reporte-data').removeClass('d-none');
                                $('#total-general').html('$' + totalaf);

                                Highcharts.chart('comprobantes-totales', {
                                    chart: {
                                        type: 'bar'
                                    },
                                    title: {
                                        text: 'Cantidad Totales'
                                    },
                                    xAxis: {
                                        categories: [
                                            'Detalle Totales',
                                        ],
                                        title: {
                                            text: null
                                        }
                                    },
                                    yAxis: {
                                        min: 0,
                                        title: {
                                            text: 'Cantidad en $',
                                            align: 'high'
                                        },
                                        labels: {
                                            overflow: 'justify'
                                        }
                                    },
                                    tooltip: {
                                        valueSuffix: ' millions'
                                    },
                                    plotOptions: {
                                        bar: {
                                            dataLabels: {
                                                enabled: true
                                            }
                                        }
                                    },
                                    legend: {
                                        layout: 'vertical',
                                        align: 'left',
                                        verticalAlign: 'top',
                                        x: -10,
                                        y: 80,
                                        floating: true,
                                        borderWidth: 1,
                                        backgroundColor:
                                            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                                        shadow: true
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    series: response.dataGrafica
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
                filename: 'Reporte Comprobantes De Venta.pdf',
                image: { type: 'jpeg', quality: 3 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'ledger', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        }
    });
}