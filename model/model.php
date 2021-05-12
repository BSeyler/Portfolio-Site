<?php
    function findPrimes($low, $high){
        $primes = array();

        for($i= $low; $i<=$high; $i++){
            //use the sieve method
            for($j = $i-1; $j >= 2; $j--){
                if($i % $j == 0){
                    $found = true;
                    break;
                }
            }

            if(!$found){
                $primes[] = $i;
            }
        }
        return $primes;
    }
?>