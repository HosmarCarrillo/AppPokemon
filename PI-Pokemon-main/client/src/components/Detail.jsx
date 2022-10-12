import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePokemon, getPokemon,  } from "../actions";
import { useHistory } from "react-router-dom";
import { getDetail, clearPokemonById, clearState } from "../actions";
import { useEffect , useState} from "react";
import charmander from "../pictures/charmander.gif";
import squarel from "../pictures/squarel.gif"
import CardTipo from './CardTipo'
import './Detail.css'


export default function Detail (){
    const history = useHistory();
    const dispatch = useDispatch()
    let {id}= useParams();
    

    useEffect(() => {
        dispatch(getDetail(id));
        return ()=> {
            dispatch(clearPokemonById());
        }        
    },[dispatch, id]);

    const myPokemon = useSelector ((state)=> state.detail)

    const clearHome = () => {
        dispatch(clearState());
      };

    function handleOnClick(id) {
        dispatch(deletePokemon(id))
        dispatch(getPokemon())
        history.push("/home")
    }

    return (
        myPokemon && myPokemon.id 
        ? ( 
            <div className="contenedor4 detalle" key = {myPokemon.id}>
                <div className="imagen2">
                    <img src={charmander} alt='' ></img>
                <div className="bar">
                    <Link to= {'/home'}>
                    <a className="crear2" onClick={clearHome} >Volver</a>  
                    </Link>
                </div>
                </div>   
                <div className="todo">
                    <div className="pokemon">
                        <img src={myPokemon.img} alt = {myPokemon.nombre} width= "700px" height= "600px" ></img>
                    </div>
                    <div className="detalle2">
                        <div className="detail">
                            <div>
                                <h1>{myPokemon.nombre.charAt(0).toUpperCase() + myPokemon.nombre.slice(1)}</h1>
                            </div>
                            <div>
                                <h2>Vida: {myPokemon.vida}</h2>
                            </div>
                            <div>
                                <h2>Ataque: {myPokemon.ataque}</h2>
                            </div>
                            <div>
                                <h2>Defensa: {myPokemon.defensa}</h2>
                            </div>
                            <div>
                                <h2>Velocidad: {myPokemon.velocidad}</h2>
                            </div>
                            <div>
                                <h2>Altura: {myPokemon.altura} </h2>   
                            </div>
                            <div>
                                <h2>Peso: {myPokemon.peso} </h2>
                            </div>
                        </div>
                    </div>
                    <div className="card-tip">
                        { myPokemon.tipo.map(el=> {
                            return(
                            <div >
                                <CardTipo key= {el} name= {el}/>   
                            </div>
                            )
                        })}
                    </div>
                </div>    
                <div className="eliminar">
                    {myPokemon.createdInDb && <button className="buttoneliminar" onClick={() => { handleOnClick(id) }}>Eliminar</button>
                    
                } 
                {console.log("🚀 ~ file: Card.jsx ~ line 34 ~ Card ~ createdInDb", myPokemon.createdInDb)}
                </div> 
            </div>
        )
        : <div className="gif">
            <img src={squarel} width= "500px" height= "500px" alt="Cargando..." />
            <p>Cargando...</p>
        </div>
    )
    
}
