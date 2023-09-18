<style>
.box-img-producto {
    width: 90px;
    height: 90px;
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
                <h1 class="m-0"> <b><i class="fas fa-couch mr-2"></i>Productos</b> </h1>
            </div>
        </div>
    </div>
</div>

<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 col-md-6 col-lg-3 d-flex">
                <a class="btn btn-dark form-control" href="<?= BASE ?>productos/categorias" data-backdrop="static"
                    data-keyboard="false">
                    <i class="fas fa-tags"></i>
                    Nueva Categoría
                </a>
            </div>
            <div class="col-4 col-md-6 col-lg-3 d-flex">
                <a class="btn btn-primary form-control" href="<?= BASE ?>ventas/nueva" data-backdrop="static"
                    data-keyboard="false">
                    <i class="fas fa-cart-plus"></i>
                    Nueva Venta
                </a>
            </div>
        </div>
        <div class="row d-flex justify-content-center mt-2">
            <div class="col-12 col-md-9">
                <div class="card card-dark shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Registro de Productos</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <form id="nuevo-productos" type="POST">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12 col-md-4">
                                        <div class="form-group">
                                            <label>Código</label>
                                            <input type="text" name="codigo" class="form-control form-control-sm"
                                                id="codigo-producto" placeholder="Código" readOnly>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <div class="form-group">
                                            <label>Nombre</label>
                                            <input type="text" name="nombre" class="form-control form-control-sm"
                                                id="nombre-producto" placeholder="Nombre">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <div class="form-group">
                                            <label>Categoría</label>
                                            <select class="form-control form-control-sm" id="select-categoria"
                                                name="categoria">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-md-4">
                                        <div class="form-group">
                                            <label>Precio</label>
                                            <input type="text" name="precio" class="form-control form-control-sm"
                                                id="precio-producto" placeholder="Precio" data-mask
                                                data-inputmask='"mask":"9{1,5}.9{1,4}"'>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <div class="form-group">
                                            <label>Stock</label>
                                            <input type="text" class="form-control form-control-sm" placeholder="0"
                                                readonly>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <div class="form-group">
                                            <label>Fecha</label>
                                            <input type="text" class="form-control form-control-sm" id="fecha-producto"
                                                name="fecha" placeholder="Fecha" value="<?=date('d/m/Y')?>" readOnly>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-md-6">
                                        <div class="form-group">
                                            <label>Descripción</label>
                                            <textarea id="producto-descripcion" class="form-control"
                                                rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <div class="form-group">
                                            <label>Imagen</label>
                                            <div class="form-group">
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input" id="imagen-producto"
                                                        accept="image/*">
                                                    <label class="custom-file-label" for="imagen-producto">Subir
                                                        Imagen</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer text-right">
                                <button type="submit" class="btn btn-dark btn-sm"><i
                                        class="far fa-save mr-2"></i>Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-3">
                <div class="card card-dark shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Vista Previa</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="col-12" style="height: 200px">
                            <img id="producto-imagen-preview"
                                src="<?=SERVIDOR?>resources/productos/producto_default.png"
                                style="height: 100%;width: 100%;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-12">
                <div class="card card-dark shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Listado de Productos</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="div" style="overflow: auto;">
                            <table id="tabla-productos"
                                class="table table-bordered table-striped dataTable text-center table-sm">
                                <thead>
                                    <tr class="bg-purple">
                                        <th style="width: 10px">#</th>
                                        <th>Imagen</th>
                                        <th>Código</th>
                                        <th>Producto</th>
                                        <th>Categoría</th>
                                        <th>Stock</th>
                                        <th>Precio</th>
                                        <th>Descripción</th>
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

<script>
$(function() {
    bsCustomFileInput.init();
});
</script>

<!-- MODAL EDITAR PRODUCTO -->
<div class="modal fade" id="modal-editar-producto" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-purple">
                <h4 class="modal-title">Editar Productos</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="contanier-fluid">
                    <form method="POST" id="update-productos">
                        <div class="row">
                            <div class="col-12 col-md-6 form-group">
                                <input type="hidden" id="producto-id">
                                <label for="">Código</label>
                                <input type="text" class="form-control form-control-sm solo-numeros" readOnly
                                    placeholder="Código" id="upd-codigo-p" maxlength="10" minlength="10">
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label>Nombre</label>
                                <input type="text" class="form-control form-control-sm" placeholder="Nombre"
                                    id="upd-nombre-p">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6 form-group">
                                <label>Categoría</label>
                                <select class="form-control form-control-sm" id="upd-categoria-p"
                                    name="categoria"></select>
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label>Precio</label>
                                <input type="text" class="form-control form-control-sm" placeholder="Precio"
                                    id="upd-precio-p" data-mask data-inputmask='"mask":"9{1,5}.9{1,4}"'>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 form-group">
                                <label>Descripción</label>
                                <textarea id="upd-descripcion-p" class="form-control" rows="3"></textarea>
                            </div>
                        </div>
                    </form>
                    <div class="row">
                        <div class="col-12 form-group text-right">
                            <button class="btn btn-dark" id="btn-update" type="button">
                                <i class="fas fa-save mr-2"></i>Actualizar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- MODAL AGREGAR STOCK -->
<div class="modal fade" id="modal-agregar-stock" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-purple">
                <h4 class="modal-title">Agregar Stock a Productos</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="contanier-fluid">
                    <input type="hidden" id="producto-stock-id">
                    <form method="POST" id="update-productos">
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-4 col-form-label">Stock Actual</label>
                            <div class="col-sm-5">
                                <input type="text" class="form-control solo-numeros" readOnly placeholder="Stock Actual"
                                    id="stock-ac-p">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-4 col-form-label">Agregar Stock</label>
                            <div class="col-sm-5">
                                <input type="text" class="form-control solo-numeros" placeholder="Stock Nuevo" id="upd-stock-p">
                            </div>
                        </div>
                    </form>
                    <div class="row">
                        <div class="col-12 form-group text-right">
                            <button class="btn btn-dark" id="btn-update-stock" type="button">
                                <i class="fas fa-plus mr-2"></i>Asignar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<script src="<?=BASE?>views/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/jszip/jszip.min.js"></script>
<script src="<?=BASE?>views/plugins/pdfmake/pdfmake.min.js"></script>

<script src="<?=BASE?>views/dist/js/scripts/productos.js"></script>