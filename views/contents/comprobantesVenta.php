<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b><i class="fas fa-folder mr-2"></i>Comprobantes De Venta</b> </h1>
            </div>
        </div>
    </div>
</div>

<div class="content">
    <div class="container-fluid">
        <div class="row mb-3 d-flex justify-content-center">
            <div class="col-6 col-md-4 col-lg-3 form-group">
                <label>Desde</label>
                <input id="fecha-inicio-r-m" type="date" class="form-control form-control-sm">
            </div>
            <div class="col-6 col-md-4 col-lg-3 form-group">
                <label>Hasta</label>
                <input id="fecha-fin-r-m" type="date" class="form-control form-control-sm">
            </div>
            <div class="col-6 col-md-4 col-lg-3 form-group">
                <button class="btn btn-dark btn-sm" id="btn-consulta" style="margin-top: 35px;">
                    <i class=" fa fa-search mr-2"></i> Consultar</button>
                <button class="btn bg-purple btn-sm " id="btn-imprimir" style="margin-top: 35px;">
                    <i class="far fa-file-pdf mr-2"></i> PDF</button>
            </div>
        </div>

        <div class="row d-none" id="tabla-reporte-data">
            <div class="col-12 mt-2">
                <div class="row d-flex justify-content-center">
                    <div class="col-6 col-md-2">
                        <img src="<?=BASE?>views/dist/img/logoAsociacion.jpeg" width="100px">
                    </div>
                    <div class="col-6 col-md-7">
                        <h3 class="text-center"><b>ASOCIACIÓN DE ARTESANOS DE ATAHUALPA</b></h3>
                        <h6 class="text-center">Comprobantes De Venta</h6>
                        <div class="row d-flex justify-content-center">
                            <h6 class="text-purple">Desde: <span class="text-dark" id="fecha-inicio-r-m2"></span>
                            </h6>
                            <h6 class="text-purple">&nbsp - Hasta: <span class="text-dark" id="fecha-fin-r-m2"></span>
                            </h6>
                        </div>
                    </div>
                    <div class="col-6 col-md-2">
                        <img src="<?=BASE?>views/dist/img/logo.jpeg" width="100px">
                    </div>
                </div>

                <div class="d-flex justify-content-between">
                    <small><b>Fecha de Consulta: <span id="fecha-consulta-s"></span></b></small>
                    <small><b>Hora de Consulta: <span id="hora-consulta-s"></span></b></small>
                </div>

                <div class="row mt-1">
                    <div class="col-12 text-center">
                        <div class="mt-3">
                            <div class="card">
                                <div class="card-body table-responsive p-0">
                                    <table class="table table-bordered dataTable text-center">
                                        <thead>
                                            <tr class="bg-purple">
                                                <th>#</th>
                                                <th>N°</th>
                                                <th>Productos</th>
                                                <th>Fecha Venta</th>
                                                <th>Subtotal</th>
                                                <th>Iva</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody id="body-reporte-data">

                                        </tbody>
                                        <tfoot>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th class="text-purple">Totales: </th>
                                            <th id="total-general" class="text-purple"></th>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row d-flex justify-content-center">
                    <div class="col-12 col-md-6">
                        <div class="mt-3">
                            <div class="card card-purple shadow-lg">
                                <div class="card-header">
                                    <h5>Cantidad Totales</h5>
                                </div>
                                <div class="card-body">
                                    <div id="comprobantes-totales"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<script src="<?=BASE?>views/plugins/html2pdf/html2pdf.bundle.js"></script>
<script src="<?=BASE?>views/plugins/chart.js/Chart.min.js"></script>
<script src="<?=BASE?>views/plugins/moment/moment.min.js"></script>
<script src="<?=BASE?>views/plugins/higchart/highcharts.js"></script>
<script src="<?=BASE?>views/plugins/higchart/modules/exporting.js"></script>
<script src="<?=BASE?>views/plugins/higchart/modules/export-data.js"></script>
<script src="<?=BASE?>views/plugins/higchart/modules/accessibility.js"></script>

<script src="<?=BASE?>views/plugins/Toast/js/Toast.min.js"></script>
<script src="<?=BASE?>views/dist/js/scripts/comprobantesVenta.js"></script>