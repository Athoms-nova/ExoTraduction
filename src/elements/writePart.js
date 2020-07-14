import React from 'react';

const WritePart = ({info, indiceTotal, onClickValider, lang, onClickSong, onClickSilence, song}) => {
    
    let styleBouttonSong = {
        backgroundColor : "green"
    };
    
    let styleBouttonSilence = {
        backgroundColor : "white"
    };

    if(song === false){
        styleBouttonSong.backgroundColor = "white";
        styleBouttonSilence.backgroundColor = "red";
    }

    return(
        <div id="ecrit">
            <p className="consigne"> traduire le text suivant en {lang} </p>
            <div id="infoExo">
                <div className="chrono">
                    <p style={{ textDecoration : "underline" }}> Temps </p>
                    <p> {info.chrono} </p>
                </div>
                <div className="nbActuelle">
                    <p style={{ textDecoration : "underline" }}>Text</p>
                    <p> {info.indice}/{indiceTotal} </p>
                </div>
            </div>
            <div className="audioBoutton">
                <button onClick={onClickSong} style={styleBouttonSong}> Song </button>
                <button onClick={onClickSilence} style={styleBouttonSilence}> Silence </button>
            </div>
            <p className="textATraduire"> {info.textATraduire} </p>
            <p className="textSaisie"> {info.textSaisie} </p>
            <div className="bouttonExo">
                <button onClick={onClickValider}> valider </button>
            </div>
        </div>
    );
}


export default WritePart;