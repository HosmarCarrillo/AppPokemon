import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../actions/index"
import '../components/SearchBar.css';


export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch()
    const [nombre, setName] = useState("")

    function handleImputPokemon(el){
        el.preventDefault()
        setName(el.target.value)
        console.log(nombre)    
    }
    function handleSubmit(el){
        el.preventDefault()
        if(!nombre) return alert("Debes ingresar un nombre")
        dispatch(getNamePokemon(nombre))
        setCurrentPage(1)
        setName ("")
    }

    return(
        <div>
            
            <div className="containerr">      
                <input 
                type= 'text'  
                value= {nombre} 
                placeholder = ' Buscar...' 
                onChange={(el) => handleImputPokemon(el)} />
                <div className="btnn">
                    <button className="search" 
                    type="submit"  
                    onClick={(el)=> handleSubmit(el)} >Buscar</button>
                </div>
            </div>
        </div>

    )
}
