import React from 'react';
import WritePart from './writePart';
import Correction from './correction';


const chronoTime = 15;
const tableau = [
    {anglais : "Hello", repondu : "bonjour", correction : "true"},
    {anglais : "car", repondu : "voiture", correction : "true"},
    {anglais : "eat", repondu : "manger", correction : "true"}
];
const infoCorrection = [
    {info : "Score", resultat : "9/10"},
    {info : "Taux de Réussite", resultat : "90%"},
    {info : "Appreciation", resultat : "Super Résultat"}
];

class Ecrit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            windo : "Exo",
            textSaisie : "",
            textAnglais : "hello",
            chrono : chronoTime,
            indice : 0,
            fin : false
        };
        this.score = 0;
        this.indiceTotal = 10;
        this.dico = [];
        this.resultats = tableau;
        this.infoResultats = infoCorrection;
    }

    render(){
        return(
            <div>
                {this.state.fin === false ?
                    <WritePart
                        info={this.state} indiceTotal={this.indiceTotal}
                        onClickValider={this.onClickValider}
                    />
                    :
                    <Correction
                        tableau={this.resultats}
                        infoCorrection={this.infoResultats}
                        onClickAutreTest={this.onClickAutreTest}
                    />
                }
            </div>
        );
    }

    compteur = () =>{ 
        let temps = this.state.chrono -1;
        if(temps > -1 && this.state.indice < 10){ 
            this.setState({ chrono : temps }) 
        }
        
        if(temps === -1){ 
            this.setState({ 
                indice : this.state.indice + 1 ,
                chrono : chronoTime,
                textSaisie : ""
            });
        }
    }

    clavierTouch = (event) => {
        let lettre = event.key;
        if(lettre === "Enter"){ this.onClickValider(); }
        else if(lettre === "Backspace" && this.state.textSaisie.length > 0){
            this.setState({ textSaisie : this.state.textSaisie.slice(0, this.state.textSaisie.length-1) });
        }
        else if(lettre !== "Backspace"){
            this.setState({ textSaisie : this.state.textSaisie + lettre });
        }
    }

    onClickValider = () => {
        if(this.state.indice >= this.indiceTotal - 1){
            this.setState({ fin : true });
        }
        else{
            this.setState({ 
                chrono : chronoTime,
                indice : this.state.indice + 1,
                textSaisie : ""
            });
        }
    }

    onClickAutreTest = () => {
        this.setState({ 
            chrono : chronoTime,
            indice : 0,
            textSaisie : "",
            fin : false
        });
    }
    
    componentDidMount(){ 
        document.addEventListener('keydown', this.clavierTouch);
        this.interval = setInterval( this.compteur, 1000); 
    }

    componentWillUnmount(){ clearInterval(this.interval); }
}



export default Ecrit;