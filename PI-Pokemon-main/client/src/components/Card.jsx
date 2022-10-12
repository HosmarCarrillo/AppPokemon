import React from "react";
import './Card.css';




export default function Card({nombre, img, ataque}) {
    
    return(

    <div className="body">
        <div className='card-g'>
            <div className='face front'>
                <img src={img} alt='img default' width= '50%' height= '100%'  />
                <h2>{nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h2>
            </div>
            <div className='face back'>
                
                <h4>{nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h4>
                <img src={img}alt= 'img default' width= '100px' height= '100px'  />  
                <h3>{ataque}</h3> 

            </div>
        </div>
        
    </div>

    );
}

