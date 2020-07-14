import React from 'react';
import Recherche from './recherche';
import Modification from './modification';




class GestionVoca extends React.Component{

    render(){
        return(
            <div id="GestionVoca">
                <h1> Gestion des Vocabulaires </h1>
                <Recherche />
                <Modification />
            </div>
        );
    }
}



export default GestionVoca;