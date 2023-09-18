<style>
#card-prod {
    border: 1px solid #e1e1e1;
    background: linear-gradient(120deg, #999966, #996633);
}

.box-img-producto {
    width: 70px;
    height: 70px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
}

.box-img-producto>img {
    width: 100% !important;
    height: 100% !important;
}
</style>

<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b><i class="fas fa-cart-plus mr-2"></i>Carrito de Compras</b> </h1>
            </div>
        </div>
    </div>
</div>

<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 col-md-6 col-lg-2">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Código" id="codigo-venta" readOnly>
                    <div class="input-group-append">
                        <span class="input-group-text bg-purple"><i class="fas fa-barcode"></i></span>
                    </div>
                </div>
            </div>
            <div class="col-2 col-md-6 col-lg-2">
                <div class="input-group">
                    <input id="fecha-venta" type="text" class="form-control" readOnly name="fecha"
                        value="<?=date('d/m/Y')?>">
                    <div class="input-group-append">
                        <div class="input-group-text bg-purple">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row d-flex justify-content-center mt-3">
            <div class="col-12">
                <div class="card card-dark shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Registro</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <medium class="d-flex justify-content-center text-purple"> <b>Productos Disponibles</b>
                        </medium>
                        <hr class="bg-purple m-0">
                        <div class="row mt-2" id="cardProducto">

                        </div>

                        <medium class="d-flex justify-content-center text-purple"> <b>Detalle del Carrito</b> </medium>
                        <hr class="bg-purple m-0">
                        <div class="row mt-2 d-none" id="detalle-prod">
                            <div class="table-responsive">
                                <div class="box-body">
                                    <table id="detalles-cli"
                                        class="table table-striped table-bordered table-sm text-center">
                                        <thead>
                                            <tr class="bg-purple">
                                                <th class="all">#</th>
                                                <th class="all">Imagen</th>
                                                <th class="all">Producto</th>
                                                <th class="min-desktop">Cantidad</th>
                                                <th class="min-desktop">Precio</th>
                                                <th class="min-desktop">Total</th>
                                                <th class="min-desktop">Acciones</th>
                                                <th class="min-desktop">Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody id="listProdVentas" class="listprovent">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <medium class="d-flex justify-content-center text-purple"> <b>Totales</b> </medium>
                        <hr class="bg-purple m-0">
                        <div class="row mt-2">
                            <div class="col-6 col-md-4">
                                <div class="small-box bg-secondary">
                                    <div class="inner">
                                        <h3 class="classSubtotal">0.00</h3>
                                        <input type="hidden" id="venta-subtotal">
                                        <p><strong>(+) </strong>Subtotal</p>
                                    </div>
                                    <div class="icon bg-black">
                                        <i class="fas fa-dollar-sign"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-md-4">
                                <div class="small-box bg-secondary">
                                    <div class="inner">
                                        <h3 class="classSubIva">0.00</h3>
                                        <input type="hidden" id="venta-iva">
                                        <p><strong>(+) </strong>IVA <span id="acu-valor-iva"></span>%</p>
                                    </div>
                                    <div class="icon bg-black">
                                        <i class="fas fa-dollar-sign"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-md-4">
                                <div class="small-box bg-secondary">
                                    <div class="inner">
                                        <input type="hidden" id="venta-totalg">
                                        <h3 class="classTotal">0.00</h3>
                                        <p>Total</p>
                                    </div>
                                    <div class="icon bg-black">
                                        <i class="fas fa-dollar-sign"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 text-right">
                                <button class="btn btn-dark btn-sm" id="guardar-venta"><i
                                        class="fas fa-save mr-2"></i>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row d-flex justify-content-center">
            <div class="col-12">
                <div class="card card-dark shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Listado de Compras Realizadas</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="div" style="overflow: auto;">
                            <table id="tabla-ventas"
                                class="table table-bordered table-striped dataTable text-center table-sm">
                                <thead>
                                    <tr class="bg-purple">
                                        <th style="width: 10px">#</th>
                                        <th>Código</th>
                                        <th>Cliente</th>
                                        <th>Total</th>
                                        <th>Fecha Venta</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<!-- MODAL COMPROBANTE -->
<div class="modal fade" id="modal-comprobante" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <div class="row d-flex justify-content-center">
                    <div class="col-12 col-md-12 col-lg-12">
                        <div class="card card-gray" id="comprobante-venta">
                            <div class="card-header">
                                Comprobante de Venta
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="card-body">
                                <div class="factura">
                                    <div class="factura-header">
                                        <div class="row">
                                            <div class="col-12 col-md-8">
                                                <img src="<?=BASE?>views/dist/img/logoAsociacion.jpeg" alt="logo" width="60px">
                                            </div>
                                            <div class="col-12 col-md-4">
                                                <div class="text-right">
                                                    <h2 class="lead p-1 factura-title">Comprobante N° <b
                                                            id="venta-id"></b>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="factura-header-prov" style="overflow: auto;">
                                            <span style="color: black;">Código: <b id="codigo-ventas"></b></span>
                                            <span style="color: black;">Cliente: <b id="cliente-venta"></b></span>
                                            <span style="color: black;">Fecha de Venta: <b id="fecha-ventas"></b></span>
                                        </div>
                                    </div>

                                    <div class="factura-body mt-2" style="overflow: auto;">
                                        <table class="table table-bordered text-nowrap text-center"
                                            style="font-size: 12px;">
                                            <thead>
                                                <tr class="bg-purple">
                                                    <td style="width: 10px; color: white;">#</td>
                                                    <td style="color: white;">Producto</td>
                                                    <td style="color: white;">Cantidad</td>
                                                    <td style="color: white;">Precio. Unitario</td>
                                                    <td style="color: white;">Total</td>
                                                </tr>
                                            </thead>

                                            <tbody id="body_detalle_venta">

                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="row mt-2">
                                        <table class="table table-sm">
                                            <tbody>
                                                <tr>
                                                    <td class="left">
                                                        <strong>Subtotal</strong>
                                                    </td>
                                                    <td class="text-right" id="venta_subtotal">0.00</td>
                                                </tr>
                                                <tr>
                                                    <td class="left">
                                                        <strong>IVA</strong>
                                                    </td>
                                                    <td class="text-right" id="venta_iva">0.00</td>
                                                </tr>
                                                <tr>
                                                    <td class="left">
                                                        <strong>Total</strong>
                                                    </td>
                                                    <td class="text-right">
                                                        <strong id="venta_total">0.00</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <main class="mt-3 text-right">
                            <button class="btn btn-dark" id="btn-imprimir">
                                <i class="fas fa-file-pdf mr-2"></i>
                                Descargar PDF
                            </button>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?=BASE?>views/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/jszip/jszip.min.js"></script>
<script src="<?=BASE?>views/plugins/pdfmake/pdfmake.min.js"></script>

<script src="<?=BASE?>views/plugins/html2pdf/html2pdf.bundle.js"></script>
<script src="<?=BASE?>views/dist/js/scripts/ventasClientes.js"></script>