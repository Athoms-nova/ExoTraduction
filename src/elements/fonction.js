// Fonction qui genere un chiffre aleatoire entier 
const chiffreAleatoire = (valMin, valMax) => {
    return Math.floor(Math.random() * (valMax + 1 - valMin) + valMin);
}



export {chiffreAleatoire};