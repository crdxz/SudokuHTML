
function getData() {

    var matriz = [
        new Array(9),new Array(9),new Array(9),
        new Array(9),new Array(9),new Array(9),
        new Array(9),new Array(9),new Array(9)
    ];


    for(var  f = 0; f < 9; f++){
        for(var c = 0; c < 9; c++){
            var celda = "f"+f+"c"+c;
            var valorCelda = document.getElementById(celda).value;
            matriz[f][c] = valorCelda;     
        }
        
    }

    for(var  i = 0; i < matriz.length; i++){
        for(var j = 0; j < matriz.length; j++){
            console.log(matriz[i][j])
        }
    }       
}
// Retorna un numero entero random 
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Determinar posicion 
function detPosicion(filaMin, columnaMin, filaMax, columnaMax){
   let posX = getRandomInt(filaMin, filaMax); 
   let posY = getRandomInt(columnaMin,columnaMax); 
   return [posX,posY];
}

// Crear nuevo tablero 
function Tablero(){

   
}

/*
   cuandrante 1 = f0c0 /  f2c2 
    cuandrante 2 = f*c*  / f*c* 
 */   

 console.log('programa corriendo');

 

 for (let i = 0; i < 3 ; i+3){
    pos = detPosicion(0 ,0 + i, 2, 2 +i);
}

detPosicion(0,0,2,2); // primera
detPosicion(0,3,2,5); // segunda 
detPosicion(0,6,2,8); // tercera 
detPosicion(0,0,2,2);
detPosicion(0,0,2,2);


