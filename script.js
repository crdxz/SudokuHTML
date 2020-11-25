function getData() {
    var matriz = [
        new Array(9),
        new Array(9),
        new Array(9),
        new Array(9),
        new Array(9),
        new Array(9),
        new Array(9),
        new Array(9),
        new Array(9),
    ];

    for (var f = 0; f < 9; f++) {
        for (var c = 0; c < 9; c++) {
            var celda = "f" + f + "c" + c;
            var valorCelda = document.getElementById(celda).value;
            matriz[f][c] = valorCelda;
        }
    }

    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz.length; j++) {
            console.log(matriz[i][j]);
        }
    }
}

var matrizBase = new Array(9);
for (var i = 0; i < 9; i++) {
    matrizBase[i] = new Array(9);
}
var matrizTablero = new Array(9);
for (var i = 0; i < 9; i++) {
    matrizTablero[i] = new Array(9);
}

function generarTablero() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (Math.random() * 10 > 5) {
                rellenarCelda(i, j);
            } else {
                matrizBase[i][j] = "0"; // Matriz Principal
            }
        }
    }
    for (var i = 0; i < 9; i++) {
        switch (i) {
            case 0:
            case 3:
            case 6:
                var cas = 0;
                var k = 0;
                var i2 = i;
                while (cas < 3) {
                    for (var j = 0; j < 3; j++) {
                        matrizTablero[i2][j] = matrizBase[i][k]; // Matriz guarda los numeros
                        k++;
                    }
                    cas++;
                    i2++;
                }
                break;
            case 1:
            case 4:
            case 7:
                var cas = 0;
                var k = 0;
                var i2 = i - 1;
                while (cas < 3) {
                    for (var j = 3; j < 6; j++) {
                        matrizTablero[i2][j] = matrizBase[i][k];
                        k++;
                    }
                    cas++;
                    i2++;
                }
                break;
            case 2:
            case 5:
            case 8:
                var cas = 0;
                var k = 0;
                var i2 = i - 2;
                while (cas < 3) {
                    for (var j = 6; j < 9; j++) {
                        matrizTablero[i2][j] = matrizBase[i][k];
                        k++;
                    }
                    cas++;
                    i2++;
                }
                break;
            default:
                alert("Error");
                break;
        }
    }
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (matrizTablero[i][j] != 0) {
                limpiarTablero(i, j);
            } else {
                matrizTablero[i][j] = "";
            }
        }
    }
    pasarDatos();
}

function rellenarCelda(i, j) {
    var num = parseInt(Math.random() * 9 + 1);
    if (comprobarCelda(num, i, j) == false) {
        matrizBase[i][j] = "0";
    } else {
        matrizBase[i][j] = num;
    }
}

function limpiarTablero(i, j) {
    for (var k = 0; k < 9; k++) {
        if (matrizTablero[i][k] == matrizTablero[i][j] && k != j) {
            matrizTablero[i][k] = "";
        }
    }
    for (var k = 0; k < 9; k++) {
        if (matrizTablero[k][j] == matrizTablero[i][j] && k != i) {
            matrizTablero[k][j] = "";
        }
    }
}

function comprobarCelda(num, i, j) {
    for (var k = 0; k < 9; k++) {
        if (matrizBase[i][k] == num) {
            return false;
        }
    }
    return true;
}
function pasarDatos() {
    for (var f = 0; f < 9; f++) {
        for (var c = 0; c < 9; c++) {
            var celda = "f" + f + "c" + c;
            var valorCelda = document.getElementById(celda);
            valorCelda.value = matrizTablero[f][c];
        }
    }
}
