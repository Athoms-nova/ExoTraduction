import React from 'react';
import WritePart from './writePart';
import Correction from './correction';
import Aceille from './aceille';
//import vocabulaire from './vocabulaire';
import {chiffreAleatoire} from './fonction';
import { genereListeAleatoire, genereDicoAN, verfiTraduction, initInfoRésultats } from './vocabulaire';


const chronoTime = 10;
/* const tableau = [
    {anglais : "Hello", repondu : "bonjour", correction : "true"},
    {anglais : "car", repondu : "voiture", correction : "true"},
    {anglais : "eat", repondu : "manger", correction : "true"}
];
const infoCorrection = [
    {info : "Score", resultat : "9/10"},
    {info : "Taux de Réussite", resultat : "90%"},
    {info : "Appreciation", resultat : "Super Résultat"}
];*/


class Ecrit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            textSaisie : "",
            textATraduire : "hello",
            chrono : chronoTime,
            indice : 0,
            fin : undefined,
            song : true
        };
        this.langue = "Francais";
        this.langueTraduction = "Anglais";
        this.dicoVocabulaire = require('./voca.json');
        this.score = 0;
        this.indiceTotal = 10;
        this.maListe = null;
        this.resultats = [];
        this.infoResultats = null;

        //--------- Actualisation de la Voix -----------------
        this.voix = new SpeechSynthesisUtterance();
        this.voix.lang = 'fr-FR'; // Configuration de la langue en francais
    }

    render(){
        return(
            <div>
                {this.state.fin === undefined &&
                    <Aceille 
                        onClickStart={this.onClickStart} 
                        onChangeOption={this.onChangeOption}
                    />
                }

                {this.state.fin === false &&
                    <WritePart
                        info={this.state} indiceTotal={this.indiceTotal}
                        onClickValider={this.onClickValider}
                        lang={this.langueTraduction}
                        onClickSong={this.onClickSong}
                        onClickSilence={this.onClickSilence}
                        song={this.state.song}
                    />
                }
                {this.state.fin === true &&
                    <Correction
                        langue={this.langue}
                        tableau={this.resultats}
                        infoCorrection={this.infoResultats}
                        onClickAutreTest={this.onClickAutreTest}
                        onClickAceille={this.onClickAceille}
                        onClickEcouter={this.onClickEcouter}
                    />
                }
            </div>
        );
    }

    //==========================================================================
    //=====================      Page Aceille      ==========================
    //==========================================================================

    // Selection de la lange
    onChangeOption = (event) => {
        //console.log(event.target.value);
        this.langue = event.target.value;
        if(this.langue === "Francais"){ 
            this.dicoVocabulaire = require('./voca.json'); 
            this.langueTraduction = "Anglais";
            this.voix.lang = 'fr-FR';
        }
        else if(this.langue === "Anglais"){ 
            this.dicoVocabulaire = genereDicoAN(this.dicoVocabulaire); 
            this.langueTraduction = "Francais";
            this.voix.lang = 'en-EN';
        }
    }

    //Boutton Start
    onClickStart = (event) => {
        this.score = 0;
        this.maListe = genereListeAleatoire(this.dicoVocabulaire, this.indiceTotal, this.langue);
        this.resultats = [];
        this.voixOn(this.maListe[0][this.langue]);
        this.setState({
            textSaisie : "",
            textATraduire : this.maListe[0][this.langue],
            chrono : chronoTime,
            indice : 0,
            fin : false
        });
    }

    //==========================================================================



    //==========================================================================
    //=====================      Page Partie Exercice      ==========================
    //==========================================================================

    // Action valider le text
    onClickValider = () => {
        if(this.state.indice < this.indiceTotal && this.state.fin === false){
            this.gestionValidationText();
            if(this.state.indice < this.indiceTotal - 1 ){ 
                this.voixOn(this.maListe[this.state.indice + 1][this.langue]);
                this.setState({ textATraduire : this.maListe[this.state.indice + 1][this.langue] }); 
            }
            else{ 
                this.infoResultats = initInfoRésultats(this.score, this.indiceTotal);
                if(this.langue === "Anglais"){ this.voix.lang = 'fr-FR'; }
                else if(this.langue === "Francais"){ this.voix.lang = 'en-EN'; }
                this.setState({ 
                    fin : true,
                    song : true
                }); 
            }
            this.setState({
                textSaisie : "",
                indice : this.state.indice + 1,
                chrono : chronoTime
            });
        }
    }


    // Gestion des information lors de la validation
    gestionValidationText = () => {
        let valide = verfiTraduction(this.dicoVocabulaire, this.state.textATraduire, this.state.textSaisie);
        if(valide){ 
            this.score++; 
            valide = "rgb(153, 251, 133)";
        }
        else{ valide = "rgba(255, 56, 56, 0.782)" }
        this.resultats.push( {langue : this.state.textATraduire, reponse : this.state.textSaisie, correction : this.dicoVocabulaire[this.state.textATraduire], valide : valide} );
    }

    //Gestion du Compteur pour le chrono
    compteur = () =>{ 
        if(this.state.fin === false && this.state.indice < this.indiceTotal){
            let temps = this.state.chrono - 1;
            if(this.state.chrono === chronoTime && this.state.song){  this.setState({ chrono : temps }); }
            if(temps === -1){ this.onClickValider(); }
            //else{ this.setState({ chrono : temps }); }
        }
    }


    // gestion de la saisie au clavier 
    clavierTouch = (event) => {
        if(this.state.fin === false && this.state.indice < this.indiceTotal){
            let lettre = event.key;
            if (lettre === "Enter") { this.onClickValider(); }
            else if (lettre === "Backspace" && this.state.textSaisie.length > 0) {
                this.setState({ textSaisie: this.state.textSaisie.slice(0, this.state.textSaisie.length - 1) });
            }
            else if (lettre !== "Backspace") {
                this.setState({ textSaisie: this.state.textSaisie + lettre });
            }
        }
    }

    // Gestion de la voix
    voixOn = (text) => {
        if(this.state.song){
            speechSynthesis.cancel();
            let newText = text;
            if(newText.indexOf("(") !== -1){ newText = newText.slice(0, newText.indexOf("(") -1 ); }
            this.voix.text = newText;
            speechSynthesis.speak(this.voix);
        }
    }

    // Boutton mettre le song
    onClickSong = () => {
        if(this.state.song === false){ this.setState({ song : true }); }
    }

    // Boutton enlevé le song
    onClickSilence = () => {
        speechSynthesis.cancel();
        if(this.state.song){ this.setState({ song : false }); }
    }

    //==========================================================================


    //==========================================================================
    //=====================      Page Partie Résultat      ==========================
    //==========================================================================

    //Boutton Faire un autre test
    onClickAutreTest = () => { 
        if(this.langue === "Francais"){ this.voix.lang = 'fr-FR'; }
        else if(this.langue === "Anglais"){ this.voix.lang = 'en-EN'; }
        this.onClickStart(); 
    }

    //Boutton retour à l'Aceille
    onClickAceille = () => { 
        this.dicoVocabulaire = require('./voca.json');
        this.langueTraduction = "Anglais";
        this.langue = "Francais";
        this.voix.lang = 'fr-FR'
        this.setState({ fin : undefined }); 
    }

    //Ecoute du mots choisie
    onClickEcouter = (event) => {
        this.voixOn(event.target.name)
    }
 
    //==========================================================================



    componentDidMount(){ 
        document.addEventListener('keydown', this.clavierTouch);
        this.voix.addEventListener('end',this.eventEndVoix); // Ajout d'evenement pour detecter la fin de la Voix
        this.interval = setInterval( this.compteur, 1000); 
    }

    componentWillUnmount(){ clearInterval(this.interval); }
}



export default Ecrit;