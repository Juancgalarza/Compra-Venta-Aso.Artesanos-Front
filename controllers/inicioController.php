<?php

class InicioController
{

    public function administrador()
    {
        include_once 'views/contents/administradorDashboard.php';
    }

    public function vendedor()
    {
        include_once 'views/contents/vendedorDashboard.php';
    }

}