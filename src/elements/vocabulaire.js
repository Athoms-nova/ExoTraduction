
/* 
const vocabulaire = [
    {francais : "voiture" , anglais : "car"},
    {francais : "nouer" , anglais : "tying"},
    {francais : "attacher" , anglais : "tying"},
    {francais : "nettoyer" , anglais : "cleaning"},
    {francais : "plier" , anglais : "folding"},
    {francais : "ranger" , anglais : "putting away"},
    {francais : "porter" , anglais : "carrying"},
    {francais : "cuisiner" , anglais : "cooking"},
    {francais : "poster" , anglais : "posting"}
];
 */


const chiffreAleatoire = (valMin, valMax) => {
    return Math.floor(Math.random() * (valMax + 1 - valMin) + valMin);
}

let genereListeAleatoire = (dico, nbText, langue) => {
    let textATraduire = Object.keys(dico);
    let liste = [];
    if(textATraduire.length > nbText){
        let indice = 0;
        while(indice < nbText){
            let chiffre = chiffreAleatoire(0, textATraduire.length-1);
            if(langue === "Francais"){ liste.push( {Francais : textATraduire[chiffre], Anglais : dico[textATraduire[chiffre]] } ); }
            else if(langue === "Anglais"){ liste.push( {Anglais : textATraduire[chiffre], Francais : dico[textATraduire[chiffre]] } ); }
            textATraduire.splice(chiffre, 1);
            indice++;
        }
    }
    return liste;
}


const genereDicoAN = (dico) => {
    let vocaFR = Object.keys(dico);
    let newDico = {};

    
    for(let i=0; i<vocaFR.length; i++){
        for(let j=0; j<dico[vocaFR[i]].length; j++){
            if(newDico[dico[vocaFR[i]][j]] === undefined){ newDico[dico[vocaFR[i]][j]] = []; }
            newDico[dico[vocaFR[i]][j]].push(vocaFR[i]);
        }
    }
    return newDico;    
}


const verfiTraduction = (dico, text, votreReponce) => {
    let valide = true;
    if(dico[text] !== undefined){
        let newText = dico[text];
        for(let i=0; i<newText.length; i++){
            if(newText[i].indexOf("(") !== -1){ newText[i] = newText[i].slice(0, newText[i].indexOf("(") -1 ); }
        }
        if( newText.indexOf(votreReponce) === -1 ){ valide = false; }
    }
    else{ valide = false; }
    return valide;
}


const infoCorrection = [
    {info : "Score", resultat : "9/10"},
    {info : "Taux de Réussite", resultat : "90%"},
    {info : "Appreciation", resultat : "Super Résultat"}
];


const initInfoRésultats = (score, nbText) => {
    let taux = Math.round( score/nbText*10000 )/100;
    let appreciation = "Résultats NULL !!!!"

    if( taux > 25 && taux <= 49){ appreciation = "Peut faire mieux !!!"; }
    else if( taux > 49 && taux <= 59){ appreciation = "Résultats MOYENS"; }
    else if( taux > 59 && taux <= 79 ){ appreciation = "Bon Résultats"; }
    else if( taux > 79){ appreciation = "Excéllent Résultats" }

    let infoResultats = [
        {info : "Score", resultat : score+"/"+nbText},
        {info : "Taux de Réussite", resultat : taux+"%"},
        {info : "Appreciation", resultat : appreciation}
    ];

    return infoResultats;
}



//console.log( initInfoRésultats(10, 20) );

//const dico = genereDicoAN( require('./voca.json'));
//console.log( verfiTraduction(dico, "cleaning", "nettoye") );

//console.log(dico);

//console.log( genereListeAleatoire( dico, 5) );
//console.log(genereDicoAN(require('./voca.json')));

export { genereListeAleatoire, genereDicoAN, verfiTraduction, initInfoRésultats };