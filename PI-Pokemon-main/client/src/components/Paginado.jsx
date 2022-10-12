import React from 'react'; 
import './Paginado.css';

export default function Paginado ({pokemonPerPage, allPokemon, paginado}) {
    const pageNumbers = [];

    for ( let i = 1; i <= Math.ceil(allPokemon/pokemonPerPage); i++){  
        pageNumbers.push(i)        
    }
    return(
        <div>

           
            
            <nav className='pag'>
                 <ul className='pagination'>
                     { pageNumbers && pageNumbers.map(number =>(           
                     <li className='pagination' key={number}> 
                        <a onClick={()=> paginado(number)}>{number}</a>
                     </li>
                ))}
                </ul>
            </nav>
        </div>
        )
}