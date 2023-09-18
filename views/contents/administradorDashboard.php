<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b><i class="fas fa-chart-pie mr-2"></i>Dashboard</b> </h1>
            </div>
        </div>
    </div>
</div>

<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 col-6">

                <div class="small-box shadow-lg" style="background: #9e6730;">
                    <div class="inner">
                        <h3 class="text-light" id="cantidad-usuarios">0</h3>
                        <p class="text-light">Usuarios</p>
                    </div>
                    <div class="icon">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <a href="<?=BASE?>usuarios/nuevo" class="small-box-footer">Ver Más <i
                            class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>

            <div class="col-lg-3 col-6">

                <div class="small-box shadow-lg" style="background: #f3dbc3;">
                    <div class="inner">
                        <h3 class="text-light" id="cantidad-clientes">0</h3>
                        <p class="text-light">Clientes</p>
                    </div>
                    <div class="icon">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <a href="<?=BASE?>clientes/nuevos" class="small-box-footer">Ver Más <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>

            <div class="col-lg-3 col-6">

                <div class="small-box shadow-lg" style="background: #804000;">
                    <div class="inner">
                        <h3 class="text-light" id="cantidad-productos">0</h3>
                        <p class="text-light">Productos</p>
                    </div>
                    <div class="icon">
                        <i class="fas fa-couch"></i>
                    </div>
                    <a href="<?=BASE?>productos/nuevos" class="small-box-footer">Ver Más <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>

            <div class="col-lg-3 col-6">

                <div class="small-box shadow-lg" style="background: #e8c39e;">
                    <div class="inner">
                        <h3 class="text-light" id="total-ventas">0</h3>
                        <p class="text-light" id="mes-ventas"></p>
                    </div>
                    <div class="icon">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <a href="<?=BASE?>ventas/nueva" class="small-box-footer">Ver Más <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col-12 col-md-6 text-center">
                <div class="mt-3">
                    <div class="card card-dark shadow-lg">
                        <div class="card-header">
                            <h5>Ventas - Año <b id="anio-venta"></b> </h5>
                        </div>
                        <div class="card-body">
                            <div id="ventas-mensual"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 text-center">
                <div class="mt-3">
                    <div class="card card-dark shadow-lg">
                        <div class="card-header">
                            <h5>Ventas Diarias</h5>
                        </div>
                        <div class="card-body">
                            <div id="ventas-diarias"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-6 text-center">
                <div class="mt-3">
                    <div class="card card-dark shadow-lg">
                        <div class="card-header">
                            <h5>Stock de Productos Por Categoría</h5>
                        </div>
                        <div class="card-body">
                            <div id="productos-stock"></div>
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
<script src="<?=BASE?>views/plugins/higchart/highcharts.js"></script>
<script src="<?=BASE?>views/plugins/higchart/modules/exporting.js"></script>
<script src="<?=BASE?>views/plugins/higchart/modules/export-data.js"></script>
<script src="<?=BASE?>views/plugins/higchart/modules/accessibility.js"></script>

<script src="<?=BASE?>views/dist/js/scripts/administradorDashboard.js"></script>