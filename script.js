//Declaración del array de 10 posiciones
/*var matriz = new Array(9);
//Bucle para meter en cada posición otros array de 10
for(var i=0; i<9; i++) {
    matriz[i] = new Array(9);
}
*/
var getData = function(){

    var matriz = [
        new Array(9),new Array(9),new Array(9),
        new Array(9),new Array(9),new Array(9),
        new Array(9),new Array(9),new Array(9)
    ];

    var ciclo = 0;

    for(var  f = 0; f < 9; f++){
        for(var c = 0; c < 9; c++){
            var celda = "f"+f+"c"+c;
            var valorCelda = document.getElementById(celda).value;
            matriz[f][c] = valorCelda;     
        }
        ciclo++;
    }

    for(var  i = 0; i < matriz.length; i++){
        for(var j = 0; j < matriz.length; j++){
            document.writeln(matriz[i][j])
        }
    }       
}
