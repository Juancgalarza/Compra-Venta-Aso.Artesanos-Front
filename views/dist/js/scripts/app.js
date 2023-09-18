init();

function init(){
    datos();
    cargarMenu();
    logout();
    mascaras_input();
}   

function getSesion(){
    let sesion = JSON.parse(sessionStorage.getItem('sesion'));

    if(sesion){
      return sesion;
    }else{
      return null;
    }
}

function cargarMenu(){
  let sesion = JSON.parse(sessionStorage.getItem('sesion'));

  if(sesion){
      let rol_id = sesion.roles.id;

      $.ajax({
          url : urlServidor + 'permisos/rol/' + rol_id,
          type : 'GET',
          dataType : 'json',
          success : function(response) {
              if(response){
                  let padre = ''; let i = 1;

                  response.forEach(element => {
                      let li = '';
                      element.menus_hijos.forEach(hijo => {
                          li += `<li class="nav-item">
                                  <a href="${urlCliente}${hijo.url}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p class="text-light">${hijo.nombre}</p>
                                  </a>
                                </li>`;
                      });

                      if(i == 0){
                          padre += `<li class="nav-item menu-open">
                                      <a href="#" class="nav-link">
                                        <i class="${element.icono} mr-2"></i>
                                        <p class="text-light">
                                          ${element.nombre}
                                          <i class="right fas fa-angle-left"></i>
                                        </p>
                                      </a>
                                      <ul class="nav nav-treeview">
                                          ${li}
                                      </ul>
                                    </li>`;
                      }else{
                          padre += `<li class="nav-item">
                                      <a href="#" class="nav-link">
                                        <i class="${element.icono} mr-2"></i>
                                        <p class="text-light">
                                          ${element.nombre}
                                          <i class="right fas fa-angle-left"></i>
                                        </p>
                                      </a>
                                      <ul class="nav nav-treeview">
                                          ${li}
                                      </ul>
                                    </li>`;
                      }
                    i++;
                  });
                  $('#menu_rol').html(padre);
              };
          },
          error : function(xhr, status) {
              console.log('Disculpe, existió un problema');
          },
          complete : function(xhr, status) {
              // console.log('Petición realizada');
          }
      });
  }
}

function datos(){
    let sesion = getSesion();
    
    if(sesion){
        let nombres = sesion.persona.nombre + ' ' + sesion.persona.apellido;
        let foto = sesion.imagen;
        let img = `<img src="${urlServidor}resources/usuarios/${foto}" class="img-circle elevation-2" alt="User Image">`;
        let rol = sesion.roles.rol;

        $('#sesion-usuario').html(nombres);
        $('#sesion-img').html(img);
        $('#sesion-rol').html(rol);
    }
}

function logout(){
  $('#sesion-logout').click(function(){
      sessionStorage.clear();
      window.location = urlCliente + 'login';
  });
}

function mascaras_input(){
  $('[data-mask]').inputmask();
}