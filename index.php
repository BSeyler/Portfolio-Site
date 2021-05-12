<?php
    //turn on some global settings
    error_reporting(E_ALL);

    //global includes
    require 'controllers/controller.php';
    require 'model/model.php';

    //load the fat free framework
    $fatFree = require 'vendor/bcosca/fatfree-core/base.php';

    $fatFree->set('ONERROR', function($fatFree){
       echo $fatFree->get('ERROR.text');
    });

    //define some routes
    $fatFree->route('GET /', function(){
        printMain();
    });
    
    $fatFree->route('GET /numbers_generator', function(){
        echo "No";
        redirectPage();
    });

    $fatFree->run();
?>