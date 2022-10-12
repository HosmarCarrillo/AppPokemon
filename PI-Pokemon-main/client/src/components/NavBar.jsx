import React, { useState } from 'react';
import { useEffect,} from 'react';
import { Link } from "react-router-dom";
import { getPokemon, getTipo, orderByName, orderByAttack, filterPokemonsByType, filterCreated, clearState } from "../actions";
import {useDispatch, useSelector } from "react-redux";
import SearchBar from './SearchBar';
import pokeapp from "../pictures/pokeapp.png"
import './Home.css';

export default function NavBar () {
    const dispatch = useDispatch()
    const alltypes = useSelector((state)=> state.tipo)
    const allPokemon = useSelector ((state)=> state.pokemon) 
    const [orden, setOrden] = useState ('');
    const [currentPage, setCurrentPage] = useState(1)

    function handleSort (el){
        el.preventDefault();
        dispatch(orderByName(el.target.value))
        setOrden(`Ordenado ${el.target.value}`)
        setCurrentPage(1);
    };

    function handleSortA (el){
        el.preventDefault();
        dispatch(orderByAttack(el.target.value))
        setOrden(`Ordenado ${el.target.value}`)
        setCurrentPage(1);
    };  

    function handleFilterType(e) {
        e.preventDefault()
        dispatch(filterPokemonsByType(e.target.value));
        setCurrentPage(1);
    };

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemon());
        
    };

    function handleSelec (el){
        dispatch(filterCreated(el.target.value))
        setCurrentPage(1);    
    };

    return(

<div className='cont-lateral'>
                <div className='container barr'>
                    <img src={pokeapp} alt='' height= '70px' ></img>
                    <div className='ordenar'>
                        <select className="stylehome" onChange={(e) => handleFilterType(e)}>
                            <option value="All">Tipos</option>
                            {alltypes.map((t)=>
                            <option value= {t.nombre} key = {t.id}>{t.nombre.charAt(0).toUpperCase() + t.nombre.slice(1)}</option>
                            )}
                        </select>
                    </div>
                    <div className='ordenar'>
                        <select onChange={(el)=>handleSelec(el)}>
                            <option value="All">Origen</option>
                            <option value="created">Creados</option>
                            <option value="api">Api</option>
                        </select>
                    </div>
                    <div className='ordenar'>
                        <select onChange={(el)=> {handleSort(el)}}>
                            <option value="All">Orden</option>
                            <option value = "desc">A-Z</option>
                            <option value = "asc">Z-A</option>
                        </select> 
                    </div>
                    <div className='ordenar'>
                        <select onChange={ (el)=> {handleSortA(el)}}>
                            <option value="All">Ataque</option>
                            <option value = 'asc'>Mayor</option>
                            <option value = 'desc'>Menor</option>
                        </select> 
                    </div>
                    <div>
                        <Link className='crear' to= '/pokemon' >Crear Pokemon</Link>
                    </div>
                    <div>
                        <div>
                        <SearchBar setCurrentPage={setCurrentPage}/>
                        </div>
                        <div className='ordenar'>
                            <button onClick={e=>{handleClick(e)}}>Cargar Pokemon</button>
                        </div>
                    </div>
                </div>
            </div>
        )
}
    