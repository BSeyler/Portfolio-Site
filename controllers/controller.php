<?php
        function welcome(){
            echo 'hello';
        }

        function printMain(){
            //gather up the data needed

            //show the view
            echo Template::instance()->render('views/mainpage.php');
        }
        
        function redirectPage()
        {
            header('Location: ../numbersgenerator');
        }
?>