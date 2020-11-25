function initiate() {
    var cuadroInical = [[]];
    var j = 0;
    for (var i = 1; i <= 81; i++) {
        const val = document.getElementById(String(i)).value;
        if (val == "") {
            cuadroInical[j].push(null);
        } else {
            cuadroInical[j].push(Number(val));
        }
        if (i % 9 == 0 && i < 81) {
            cuadroInical.push([]);
            j++;
        }
    }
    console.log(cuadroInical);
    const imputValido = cuadroValido(cuadroInical);
    if (!imputValido) {
        entradaEsValida();
    } else {
        const respuesta = solucion(cuadroInical);
        llenarCuadro(respuesta, imputValido);
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

function llenarCuadro(tablero) {
    if (tablero == false) {
        for (i = 1; i <= 9; i++) {
            document.getElementById("fila " + String(i)).innerHTML =
                "NO TIENE SOLUCION";
        }
    } else {
        for (var i = 1; i <= 9; i++) {
            var fila = "";
            for (var j = 0; j < 9; j++) {
                if (fila == "") {
                    fila = fila + String(tablero[i - 1][j]);
                } else {
                    fila =
                        fila + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + String(tablero[i - 1][j]);
                }
            }
            document.getElementById("fila " + String(i)).innerHTML = fila;
        }
    }
}

function entradaEsValida() {
    for (i = 1; i <= 9; i++) {
        document.getElementById("fila " + String(i)).innerHTML =
            "EL TABLERO ES INVALIDO";
    }
}
