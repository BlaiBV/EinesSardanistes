process.stdin.resume();
process.stdin.setEncoding('utf8');
// Your code here!

function treure_grups_curts(grups) {
    let index = 0;
    let acumulador = 0;
    let temp_grups = [];
    while (index < grups.length && acumulador <= 49) {
        acumulador += grups[index];
        if (acumulador >= 16 && acumulador <= 49) {
            temp_grups.push(grups[index]);
        }
        index++;
    }
    return temp_grups;
}

function tirades_grups(grups_tirades, tiratge_minim, tiratge_maxim) {
    let temp_tiratges = [];

    for (let i = 0; i < grups_tirades.length; i++) {

        let temp = [];
        let suma = 0;
        for (let j = 0; j <= i; j++) {
            temp.push(grups_tirades[j]);
        }

        for (let j = 0; j < temp.length; j++) {
            suma += temp[j];
        }

        if (suma >= tiratge_minim && suma <= tiratge_maxim) {
            temp_tiratges.push(temp);
        }
        
    }
    return temp_tiratges;
}

function filtre_estructura(grups, tirades_grups_curts) {
    let primera_tirada = [];
    let temp_tiratges = [];
    let trobat = false;

    for (let i = 0; i < tirades_grups_curts.length; i++) {

        primera_tirada = tirades_grups_curts[i];

        let j = primera_tirada.length;
        let k = 0;
            
        trobat = false;
        while (k < primera_tirada.length-1 && grups[j] != undefined) {
            if (primera_tirada[k] != grups[j]) {
                trobat = true;
            }
            j++;
            k++;
        }

        if (!trobat) {
            temp_tiratges.push(primera_tirada);
        }
    }

    return temp_tiratges;
}

function treure_grups_llargs(grups) {
    let index = 0;
    let acumulador = 0;
    let temp_grups = [];
    while (index < grups.length && acumulador <= 99) {
        acumulador += grups[index];
        if (acumulador <= 99) {
            temp_grups.push(grups[index]);
        }
        index++;
    }
    return temp_grups;
}

function suma_array(array) {
    let sumatori = 0;
    for (let q = 0; q < array.length; q++) {
        sumatori += array[q];
    }
    return sumatori;
}


function resoldre_revessa(grups) {
    let grups_curts = [], tirades_grups_curts = [];
    let resultat = [];

    // separem els grups que poden arribar a formar tirades de curts
    grups_curts = treure_grups_curts(grups);
    console.log(grups_curts);

    // formem les possibles tirades per composició de grups
    tirades_grups_curts = tirades_grups(grups_curts, 16, 49);
    console.log(tirades_grups_curts);

    // treiem els tiratges que no compleixen el criteri d'estructura (tots els grups han de ser iguals, tret de l'últim)
    tirades_grups_curts = filtre_estructura(grups, tirades_grups_curts);
    console.log(tirades_grups_curts);


    let repeticio_curts;
    let repeticio_llargs;
    let primera_curts;
    let sub_grups = [];
    let tirades_grups_llargs = [];

    for (let i = 0; i < tirades_grups_curts.length; i++) {

        primera_curts = tirades_grups_curts[i];

        repeticio_curts = grups[primera_curts.length * 2 - 1] - primera_curts[primera_curts.length - 1];
        console.log("repetició " + repeticio_curts);

        sub_grups = [];

        for (let j = (primera_curts.length * 2); j < grups.length; j++) {
            sub_grups.push(grups[j]);
        }


        // separem els grups que poden arribar a formar tirades de llargs
        grups_llargs = treure_grups_llargs(sub_grups);
        console.log(grups_llargs);

        // formem les possibles tirades per composició de grups
        tirades_grups_llargs = tirades_grups(grups_llargs, 50, 99);
        console.log(tirades_grups_llargs);

        // treiem els tiratges que no compleixen el criteri d'estructura (tots els grups han de ser iguals, tret de l'últim)
        tirades_grups_llargs = filtre_estructura(sub_grups, tirades_grups_llargs);
        console.log(tirades_grups_llargs);

        let suma = 0;
        let tirades_grups_llargs_2 = [];
        for (let j = 0; j < tirades_grups_llargs.length; j++) {
            for (let k = 0; k < tirades_grups_llargs[j].length; k++) {
                suma += tirades_grups_llargs[j][k];
            }
            if (suma >= 50) {
                tirades_grups_llargs_2.push(tirades_grups_llargs[j]);

                resultat.push(suma_array(primera_curts) + "x" + suma_array(tirades_grups_llargs[j]));
            }
        }        

    }

    console.log("RESULTATS");
    for (let y = 0; y < resultat.length; y++) {
        console.log(resultat[y]);
    }
}


function revessa() {
    let text = document.getElementById("grups").value;

    let grups = text.split(",").map(Number);
    //let grups = [16,17,16,17,17,16,17,16,16,17,16];
    resoldre_revessa(grups);
}