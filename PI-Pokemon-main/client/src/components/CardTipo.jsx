import React from "react";
import './Detail.css'



export default function CardTipo({name}) {
    return(
    <div className="body1">
        <div className='card-g1'>
            <div className='face front1'>
                <h2>Tipo: {name.charAt(0).toUpperCase() + name.slice(1)}.</h2>         
            </div>
        </div>   
    </div>
    );
}