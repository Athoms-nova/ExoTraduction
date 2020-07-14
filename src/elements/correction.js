import React from 'react';


const Correction = ({tableau, infoCorrection, onClickAutreTest, onClickAceille, langue, onClickEcouter}) => {
    let indice = 0;
    return(
        <div id="Correction">
            <h1> Resultat du test </h1>
            <div className="infoCorrection">
                {infoCorrection.map(item => (
                    <div key={indice++}>
                        <p style={{ textDecoration : "underline", fontWeight : "bold" }}> {item.info} </p>
                        <p> {item.resultat} </p>
                    </div>
                ))}
            </div>
            
            <table>
                <thead>
                    <tr className="ligne1">
                        <td>  {langue} </td>
                        <td> Répondu </td>
                        <td> Corrections </td>
                    </tr>
                </thead>
                <tbody>
                    {tableau.map(item => (
                        <tr key={indice++}>
                            <td style={{backgroundColor : item.valide}}> {item.langue} </td>
                            <td style={{backgroundColor : item.valide}}> {item.reponse} </td>
                            <td style={{backgroundColor : item.valide}}>
                                {typeof item.correction === "string" ? <p> {item.correction} </p> 
                                    : 
                                    <ul>
                                        {item.correction.map(resultat => ( 
                                            <li key={indice++}> 
                                                <p>{resultat}</p>
                                                <button onClick={onClickEcouter} name={resultat}> Ecouté </button>
                                            </li> 
                                        ))}
                                    </ul>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="boutton">
                <button onClick={onClickAutreTest}> Faire un autre test </button>
                <button onClick={onClickAceille}> Aceille </button>
            </div>
        </div>
    );
}


export default Correction;