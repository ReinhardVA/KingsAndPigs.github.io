const collisionsLevel1 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, //16
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, //16
    0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 0, //16
    0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0, //16
    0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0, //16
    0, 292, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,//16
    0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 0,//16
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,//16
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 //16
];

Array.prototype.parse2D = function() {
    const rows = [];
    for(let i=0 ; i<this.length; i+=16){
        rows.push(this.slice(i, i+16));
    }
    return rows;
}

//Burada 3.parti bir uygulama sayesinde haritamızı bloklara böldük. 292'ler çevredeki çarpışma yaşanacak blokları temsil etmektedir.
//Her birinde 16 sütun olan 2 boyutlu bir diziye atanmıştır.