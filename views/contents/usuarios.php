<style>
.box-img-usuarios {
    width: 70px;
    height: 70px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
}

.box-img-usuarios>img {
    width: 100% !important;
    height: 100% !important;
}
</style>

<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b><i class="fas fa-users mr-2"></i>Usuarios</b> </h1>
            </div>
        </div>
    </div>
</div>

<div class="content">
    <div class="container-fluid">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-10">
                <div class="card card-dark shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Registro de Usuarios</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <form id="nuevo-usuarios" method="POST">
                            <div class="row ">
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Cédula</label>
                                    <input id="new-cedula" type="text" placeholder="Cédula" name="cedula"
                                        class="form-control form-control-sm solo-numeros" maxlength="10" minlength="10">
                                </div>
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Nombre</label>
                                    <input id="new-nombre" type="text" placeholder="Nombre" name="nombre"
                                        class="form-control form-control-sm solo-letras" maxlength="200" minlength="3">
                                </div>
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Apellido</label>
                                    <input id="new-apellido" type="text" name="apellido" placeholder="Apellido"
                                        class="form-control form-control-sm solo-letras" maxlength="200" minlength="3">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 col-md-6 form-group">
                                    <label for=""># Celular</label>
                                    <input id="new-celular" type="text" placeholder="# Celular" name="celular"
                                        class="form-control form-control-sm solo-numeros" maxlength="10" minlength="10">
                                </div>
                                <div class="col-12 col-md-6 form-group">
                                    <label for="">Dirección</label>
                                    <input id="new-direccion" type="text" placeholder="Dirección" name="direccion"
                                        class="form-control form-control-sm">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Usuario</label>
                                    <input id="new-usuario" type="text" placeholder="Usuario" name="usuario"
                                        class="form-control form-control-sm">
                                </div>
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Correo</label>
                                    <input id="new-correo" type="text" placeholder="Correo" name="correo"
                                        class="form-control form-control-sm">
                                </div>
                                <div class="col-12 col-md-4 form-group">
                                    <label for="new-rol">Rol</label>
                                    <select id="new-rol" class="form-control form-control-sm">
                                    </select>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Clave</label>
                                    <input id="new-clave" type="password" placeholder="Clave" name="password"
                                        class="form-control form-control-sm">
                                </div>
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Confirmar Clave</label>
                                    <input id="new-confclave" type="password" placeholder="Confirmar Clave"
                                        name="confclave" class="form-control form-control-sm">
                                </div>
                                <div class="col-12 col-md-4 form-group">
                                    <label for="">Imagen</label>
                                    <div class="form-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="new-img-usuario"
                                                accept="image/*">
                                            <label class="custom-file-label" for="new-img-usuario">Subir
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
                        <h3 class="card-title">Listado de Usuarios</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="div" style="overflow: auto;">
                            <table id="tabla-usuarios" class="table table-bordered table-striped dataTable text-center">
                                <thead>
                                    <tr class="bg-purple">
                                        <th style="width: 10px">#</th>
                                        <th>Avatar</th>
                                        <th>Cédula</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Usuario</th>
                                        <th>Rol</th>
                                        <th>Correo</th>
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

<!-- MODAL EDITAR USUARIO -->
<div class="modal fade" id="modal-editar-usuario" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-purple">
                <h4 class="modal-title"> <b>Editar Usuario</b> </h4>
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
                                <input type="hidden" id="usuario-id">
                                <input type="hidden" id="persona-id">
                                <input id="upd-cedula" type="text" name="cedula" class="form-control form-control-sm" maxlength="10"
                                    minlength="10" readOnly>
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label for="">Nombre</label>
                                <input id="upd-nombre" type="text" name="nombre" class="form-control form-control-sm solo-letras"
                                    maxlength="200" minlength="3">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-md-6 form-group">
                                <label for="">Apellido</label>
                                <input id="upd-apellido" type="text" name="apellido" class="form-control form-control-sm solo-letras"
                                    maxlength="200" minlength="3">
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label for=""># Celular</label>
                                <input id="upd-celular" type="text" name="celular" class="form-control form-control-sm solo-numeros"
                                    maxlength="10" minlength="10">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-md-6 form-group">
                                <label for="">Dirección</label>
                                <input id="upd-direccion" type="text" name="direccion" class="form-control form-control-sm">
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label for="upd-rol">Rol</label>
                                <select id="upd-rol" class="form-control form-control-sm" disabled>
                                </select>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-12 col-md-6 form-group">
                                <label for="">Usuario</label>
                                <input id="upd-usuario" type="text" name="usuario" class="form-control form-control-sm">
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label for="">Correo</label>
                                <input id="upd-correo" type="text" name="correo" class="form-control form-control-sm">
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

<script src="<?=BASE?>views/dist/js/scripts/usuarios.js"></script>