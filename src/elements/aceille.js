import React from 'react';



const Aceille = ({onClickStart, onChangeOption}) => {
    return(
        <div id="Menu">
            <h1> Commencer le test </h1>
            <select onChange={onChangeOption}>
                <option value="Francais" > Traduire en Anglais </option>
                <option value="Anglais"> Traduire en Francais </option>
            </select>
            <button onClick={onClickStart}> Start </button>
        </div>
    );
}


export default Aceille;