// Variable global Cronometro
var cronometro;
// Genera matriz base
var matrizBase = new Array(9);
for(var i = 0; i < 9; i++){
    matrizBase[i] = new Array(9);  
}
// Genera matriz para mostrar en el tablero
var matrizTablero = new Array(9);
for(var i = 0; i < 9; i++){
    matrizTablero[i] = new Array(9);  
}
// Solo numeros 
function soloNumeros(e){
	var key = window.Event ? e.which : e.keyCode
	return (key >= 48 && key <= 57)
}
// Agrega el atributo onkeypress a todos los inputs 
for(var  f = 0; f < 9; f++){
    for(var c = 0; c < 9; c++){
        var celda = "f"+f+"c"+c;
        var valorCelda = document.getElementById(celda);
        valorCelda.setAttribute("onkeypress","return soloNumeros(event)")
    }
}
// crear el tablero del sudoku
function generarTablero(){

    document.getElementById("solucion").innerHTML = ""; 

    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            if(Math.random()*10 > 5){ 
                rellenarCelda(i , j);
            }else{
                matrizBase[i][j] = "0";
            }
        }
    }
    for(var i = 0; i < 9; i++){
        switch(i){
            case 0: case 3: case 6:
                var cas = 0;
                var k = 0;
                var i2 = i;
                while(cas < 3){
                    for(var j = 0; j < 3; j++){
                        matrizTablero[i2][j] = matrizBase[i][k];
                        k++;
                    }
                    cas++;
                    i2++;
                }
            break;
            case 1: case 4: case 7: 
                var cas = 0;
                var k = 0;
                var i2 = i-1;
                while(cas < 3){
                    for(var j = 3; j < 6; j++){
                        matrizTablero[i2][j] = matrizBase[i][k];
                        k++;
                    }
                    cas++;
                    i2++;
                }
            break;
            case 2: case 5: case 8: 
                var cas = 0;
                var k = 0;
                var i2 = i-2;
                while(cas < 3){
                    for(var j = 6; j < 9; j++){
                        matrizTablero[i2][j] = matrizBase[i][k];
                        k++;
                    }
                    cas++;
                    i2++;
                }
            break;
            default:
                alert('Error');
            break;
        }
    }
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            if(matrizTablero[i][j] != 0){
                limpiarTablero(i,j);
            }else{
                matrizTablero[i][j] = '';
            }
        }
    }
    pasarDatos();
    stopTimer();
    stopScore();
    timer();
    scoreMostrar();
}
// poner los numeros en las celdas 
function rellenarCelda(i , j){
    var num = parseInt((Math.random()*9)+1);
    if(comprobarCelda(num,i,j) == false){
        matrizBase[i][j] = "0";
    }else{
        matrizBase[i][j] = num;
    }
}
// Limpiar el tablero en pantalla 
function limpiarTablero(i , j){
    for(var k = 0; k < 9; k++){
        if(matrizTablero[i][k] == matrizTablero[i][j] && k != j){
            matrizTablero[i][k]="";
        }
    }
    for(var k = 0; k < 9; k++){
        if(matrizTablero[k][j] == matrizTablero[i][j] && k != i){
            matrizTablero[k][j]="";
        }
    }
}
// Comprobar la celda
function comprobarCelda(num,i,j){
    for(var k = 0; k < 9; k++){
        if(matrizBase[i][k] == num){
            return false;
        }
    }
    return true;
}
// Poner los datos en pantalla 
function pasarDatos(){
    for(var  f = 0; f < 9; f++){
        for(var c = 0; c < 9; c++){
            var celda = "f"+f+"c"+c;
            var valorCelda = document.getElementById(celda);
            valorCelda.value = matrizTablero[f][c];
        }
    }
}
// Timer
function timer(){
    var n = 0.0;
    var l = document.getElementById("timerNumber");
    cronometro = setInterval(function(){
        l.innerHTML = n.toFixed(1)+"s";
        n+=0.1;
    },100);  
}
// Detener timer 
function stopTimer(){
   clearInterval(cronometro);
}

window.onload = generarTablero;

// Solucionador sudoku
function initiate() {

    var cuadroInical = new Array(9);
        for(var i = 0; i < 9; i++){
        cuadroInical[i] = new Array(9);  
    }

    for(var  f = 0; f < 9; f++){
        for(var c = 0; c < 9; c++){
            var celda = "f"+f+"c"+c;
            var valorCelda = document.getElementById(celda).value;
            if (valorCelda == "") {
                cuadroInical[f][c]= null ;
            }else{
                cuadroInical[f][c] = valorCelda;
            }
        }    
    }
    
    console.log(cuadroInical);
    const imputValido = cuadroValido(cuadroInical);
    if (!imputValido) {
        entradaEsValida();
    } else {
        const respuesta = solucion(cuadroInical);
        mostrar(respuesta , imputValido);
    }
}

function solucion(tablero) {
    if (solucionado(tablero)) {
        return tablero;
    } else {
        const posibilidades = sigCuadro(tablero);
        const cuadrosValidos = mantieneValidando(posibilidades);
        return buscarSoluciones(cuadrosValidos);
    }
}


function buscarSoluciones(tableros) {
    if (tableros.length < 1) {
        return false;
    } else {
        var primero = tableros.shift();
        const camino = solucion(primero);
        if (camino != false) {
            return camino;
        } else {
            return buscarSoluciones(tableros);
        }
    }
}

function solucionado(tablero) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (tablero[i][j] == null) {
                return false;
            }
        }
    }
    return true;
}

function sigCuadro(tablero) {
    var res = [];
    const primerVacio = buscaCuadroVacio(tablero);
    if (primerVacio != undefined) {
        const y = primerVacio[0];
        const x = primerVacio[1];
        for (var i = 1; i <= 9; i++) {
            var nuevoCuadro = [...tablero];
            var fila = [...nuevoCuadro[y]];
            fila[x] = i;
            nuevoCuadro[y] = fila;
            res.push(nuevoCuadro);
        }
    }
    return res;
}

function buscaCuadroVacio(tablero) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (tablero[i][j] == null) {
                return [i, j];
            }
        }
    }
}

function mantieneValidando(tableros) {
    var res = [];
    for (var i = 0; i < tableros.length; i++) {
        if (cuadroValido(tableros[i])) {
            res.push(tableros[i]);
        }
    }
    return res;
}

function cuadroValido(tablero) {
    return (
        filasCorrectas(tablero) &&
        columnasCorrectas(tablero) &&
        cuadrosCorrectos(tablero)
    );
}

function filasCorrectas(tablero) {
    for (var i = 0; i < 9; i++) {
        var cur = [];
        for (var j = 0; j < 9; j++) {
            if (cur.includes(tablero[i][j])) {
                return false;
            } else if (tablero[i][j] != null) {
                cur.push(tablero[i][j]);
            }
        }
    }
    return true;
}

function columnasCorrectas(tablero) {
    for (var i = 0; i < 9; i++) {
        var cur = [];
        for (var j = 0; j < 9; j++) {
            if (cur.includes(tablero[j][i])) {
                return false;
            } else if (tablero[j][i] != null) {
                cur.push(tablero[j][i]);
            }
        }
    }
    return true;
}

function cuadrosCorrectos(tablero) {
    const coordenadasCuadro = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
    ];
    for (var y = 0; y < 9; y += 3) {
        for (var x = 0; x < 9; x += 3) {
            var cur = [];
            for (var i = 0; i < 9; i++) {
                var coordenadas = [...coordenadasCuadro[i]];
                coordenadas[0] += y;
                coordenadas[1] += x;
                if (cur.includes(tablero[coordenadas[0]][coordenadas[1]])) {
                    return false;
                } else if (tablero[coordenadas[0]][coordenadas[1]] != null) {
                    cur.push(tablero[coordenadas[0]][coordenadas[1]]);
                }
            }
        }
    }
    return true;
}
var matrizRespuesta;

function mostrar(respuesta){
    for(var  f = 0; f < 9; f++){
        for(var c = 0; c < 9; c++){
            var celda = "f"+f+"c"+c;
            var id = document.getElementById(celda);
           id.value = respuesta[f][c];
            
        }
    }
    stopTimer();
    stopScore();
}

// Validar la solucion 
function check(matrizRespuesta){

    stopTimer();
    stopScore();

    var matriz = new Array(9);
    for(var i = 0; i < 9; i++){
        matriz[i] = new Array(9);  
    }
    for(var  f = 0; f < 9; f++){
        for(var c = 0; c < 9; c++){
            var celda = "f"+f+"c"+c;
            var valorCelda = document.getElementById(celda).value;
            if (valorCelda == "") {
                matriz[f][c] = null;
            }else{
                matriz[f][c] = valorCelda;
            }
        }
    }
    matrizRespuesta = solucion(matriz);

    var cont = 0;
    for(var f = 0; f < 9; f++){
        for(var c = 0; c < 9; c++){
            if( matriz[f][c] == matrizRespuesta[f][c]){
                cont++;
            }
        }
    }
    if( cont == 81){
        document.getElementById("solucion").innerHTML = "CORRECTO"; 
    }else{
        document.getElementById("solucion").innerHTML = "INCORRECTO";
    }
}
var score;
// Score 
function scoreMostrar(){
    var n = 100000;
    var l = document.getElementById("scoreNumber");
    score = setInterval(function(){
        l.innerHTML = n;
        n-=1;
    },500);  
    if( l == 0){
        initiate();
        stopScore();
        stopTimer();
    }
}
// Detener timer 
function stopScore(){
    clearInterval(score);
 }