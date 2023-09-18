<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b><i class="fas fa-user-tie mr-2"></i>Clientes</b> </h1>
            </div>
        </div>
    </div>
</div>

<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 col-md-6 col-lg-3 d-flex">
                <a class="btn btn-dark form-control" href="<?= BASE ?>ventas/nueva" data-backdrop="static"
                    data-keyboard="false">
                    <i class="fas fa-cart-plus"></i>
                    Nueva Venta
                </a>
            </div>
            <div class="col-4 col-md-6 col-lg-3 d-flex">
                <a class="btn bg-purple form-control" href="<?= BASE ?>productos/nuevos" data-backdrop="static"
                    data-keyboard="false">
                    <i class="fas fa-couch"></i>
                    Nuevo Producto
                </a>
            </div>
        </div>

        <div class="row d-flex justify-content-center mt-3">
            <div class="col-12 col-md-10">
                <div class="card card-dark shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Registro de Clientes</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <form id="nuevo-clientes" method="POST">
                            <div class="row ">
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Cédula</label>
                                    <input id="new-cli-cedula" type="text" placeholder="Cédula" name="cedula"
                                        class="form-control form-control-sm solo-numeros" maxlength="10" minlength="10">
                                </div>
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Nombre</label>
                                    <input id="new-cli-nombre" type="text" placeholder="Nombre" name="nombre"
                                        class="form-control form-control-sm solo-letras" maxlength="200" minlength="3">
                                </div>
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Apellido</label>
                                    <input id="new-cli-apellido" type="text" name="apellido" placeholder="Apellido"
                                        class="form-control form-control-sm solo-letras" maxlength="200" minlength="3">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 col-md-6 form-group">
                                    <label for=""># Celular</label>
                                    <input id="new-cli-celular" type="text" placeholder="# Celular" name="celular"
                                        class="form-control form-control-sm solo-numeros" maxlength="10" minlength="10">
                                </div>
                                <div class="col-12 col-md-6 form-group">
                                    <label for="">Dirección</label>
                                    <input id="new-cli-direccion" type="text" placeholder="Dirección" name="direccion"
                                        class="form-control form-control-sm">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Usuario</label>
                                    <input id="new-cli-usuario" type="text" placeholder="Usuario" name="usuario"
                                        class="form-control form-control-sm">
                                </div>
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Correo</label>
                                    <input id="new-cli-correo" type="text" placeholder="Correo" name="correo"
                                        class="form-control form-control-sm">
                                </div>
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Imagen</label>
                                    <div class="form-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="new-img-cliente"
                                                accept="image/*">
                                            <label class="custom-file-label" for="new-img-cliente">Subir
                                                Imagen</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 text-right">
                                    <button class="btn btn-dark btn-sm" type="submit"><i
                                            class="fas fa-save mr-2"></i>Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="row d-flex justify-content-center">
            <div class="col-12">
                <div class="card card-dark shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Listado de Clientes</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="div" style="overflow: auto;">
                            <table id="tabla-clientes" class="table table-bordered table-striped dataTable text-center">
                                <thead>
                                    <tr class="bg-purple">
                                        <th style="width: 10px">#</th>
                                        <th>Cédula</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th># Celular</th>
                                        <th>Dirección</th>
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

<!-- MODAL EDITAR CLIENTE -->
<div class="modal fade" id="modal-editar-cliente" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-purple">
                <h4 class="modal-title"> <b>Editar Clientes</b> </h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="contanier-fluid">
                    <form id="actualizar-usuario" method="POST">
                        <div class="row ">
                            <div class="col-12 col-md-6 form-group">
                                <label for="">Cédula</label>
                                <input type="hidden" id="cliente-id">
                                <input type="hidden" id="persona-id">
                                <input id="upd-cli-cedula" type="text" name="cedula" class="form-control form-control-sm" maxlength="10"
                                    minlength="10" readOnly>
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label for="">Nombre</label>
                                <input id="upd-cli-nombre" type="text" name="nombre" class="form-control form-control-sm solo-letras"
                                    maxlength="200" minlength="3">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-md-6 form-group">
                                <label for="">Apellido</label>
                                <input id="upd-cli-apellido" type="text" name="apellido" class="form-control form-control-sm solo-letras"
                                    maxlength="200" minlength="3">
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label for=""># Celular</label>
                                <input id="upd-cli-celular" type="text" name="celular" class="form-control form-control-sm solo-numeros"
                                    maxlength="10" minlength="10">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 form-group">
                                <label for="">Dirección</label>
                                <input id="upd-cli-direccion" type="text" name="direccion" class="form-control form-control-sm">
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
            <div class="modal-footer justify-content-between"> </div>
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

<script src="<?=BASE?>views/dist/js/scripts/clientes.js"></script>