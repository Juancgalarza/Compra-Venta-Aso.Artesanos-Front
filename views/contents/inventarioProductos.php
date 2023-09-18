<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b><i class="fas fa-clipboard-list mr-2"></i>Inventario de Productos</b> </h1>
            </div>
        </div>
    </div>
</div>

<div class="content">
    <div class="container-fluid">
        <div class="row mb-3 d-flex justify-content-center">
            <div class="col-6 col-md-4 col-lg-3 form-group">
                <label>Categorías</label>
                <select class="form-control form-control-sm" id="select-categoria">
                </select>
            </div>
            <div class="col-6 col-md-4 col-lg-3 form-group">
                <label>Productos</label>
                <select class="form-control form-control-sm" id="select-productos">
                    <option>Seleccione un Producto</option>
                </select>
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
                    <div class="col-6 col-md-8 col-lg-9">
                        <h3 class="text-center"><b>ASOCIACIÓN DE ARTESANOS DE ATAHUALPA</b></h3>
                        <h6 class="text-center">Inventario de Productos</h6>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 text-center">
                        <div class="mt-3">
                            <div class="card">
                                <div class="card-body table-responsive p-0">
                                    <table id="tabla-inventario" class="table table-bordered dataTable text-center">
                                        <thead>
                                            <tr class="bg-purple">
                                                <th rowspan="2" class="text-center">N°</th>
                                                <th rowspan="2" class="text-center">Fecha</th>
                                                <th rowspan="2" class="text-center">Movimiento</th>
                                                <th colspan="1" class="text-center">Entradas</th>
                                                <th colspan="1" class="text-center">Salidas</th>
                                                <th colspan="1" class="text-center">Disponibles</th>
                                            </tr>
                                            <tr class="bg-purple">
                                                <th class="text-center">Cantidad de Entrada</th>
                                                <th class="text-center">Cantidad de Salida</th>
                                                <th class="text-center">Cantidad Disponibles</th>
                                            </tr>
                                        </thead>
                                        <tbody id="body-reporte-data">

                                        </tbody>
                                    </table>
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
<script src="<?=BASE?>views/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/jszip/jszip.min.js"></script>
<script src="<?=BASE?>views/plugins/pdfmake/pdfmake.min.js"></script>

<script src="<?=BASE?>views/plugins/Toast/js/Toast.min.js"></script>
<script src="<?=BASE?>views/dist/js/scripts/inventarioProductos.js"></script>