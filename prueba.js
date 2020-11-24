function generateRandom(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (1 + max - min) + min);
}
 for (i = 0; i < 10; i ++){
     console.log(generateRandom(1, 10));
 }