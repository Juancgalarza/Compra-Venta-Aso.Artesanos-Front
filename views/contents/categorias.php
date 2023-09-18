<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b><i class="fas fa-tags mr-2"></i>Categorías</b> </h1>
            </div>
        </div>
    </div>
</div>

<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-3">
                <a class="btn btn-dark form-control" href="<?= BASE ?>productos/nuevos" data-backdrop="static"
                    data-keyboard="false">
                    <i class="fas fa-couch"></i>
                    Nuevo Producto
                </a>
            </div>
        </div>

        <div class="row d-flex justify-content-center mt-2">
            <div class="col-12">
                <div class="card card-dark shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Listado de Categorías</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Categoría</label>
                            <div class="col-sm-4 d-flex">
                                <input type="text" class="form-control solo-letras" placeholder="Nueva Categoría"
                                    minlength="4" id="texto-categoria">
                                <button class="btn btn-dark ml-2" id="nueva-categoria">
                                    <i class="fas fa-save"></i>
                                </button>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-12">
                                <div class="div" style="overflow: auto;">
                                    <table id="tabla-categorias"
                                        class="table table-bordered table-striped dataTable text-center table-sm">
                                        <thead>
                                            <tr class="bg-primary">
                                                <th style="width: 10px">#</th>
                                                <th>Categoría</th>
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
</div>
</div>

<!-- MODAL EDITAR CATEGORÍA -->
<div class="modal fade" id="modal-editar-categoria" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h4 class="modal-title">Editar Categoría</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="contanier-fluid">
                    <form method="POST" id="update-categorias">
                        <div class="row">
                            <div class="col-12 form-group">
                                <input type="hidden" id="upd-categoria-id">
                                <label for="">Nombre</label>
                                <input type="text" class="form-control form-control-sm" placeholder="Nombre Categoría"
                                    id="upd-nombre-categoria">
                            </div>
                        </div>
                    </form>
                    <div class="row">
                        <div class="col-12 form-group text-right">
                            <button class="btn btn-dark btn-sm" id="btn-update" type="button">
                                <i class="fas fa-save mr-2"></i>Actualizar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
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

<script src="<?=BASE?>views/dist/js/scripts/categorias.js"></script>