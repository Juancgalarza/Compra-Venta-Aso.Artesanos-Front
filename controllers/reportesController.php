<?php

class ReportesController
{

    public function ventasMensuales()
    {
        include_once 'views/contents/ventasMensuales.php';
    }

    public function comprobantesVenta()
    {
        include_once 'views/contents/comprobantesVenta.php';
    }

    public function masVendidos()
    {
        include_once 'views/contents/productosMasVendidos.php';
    }
}