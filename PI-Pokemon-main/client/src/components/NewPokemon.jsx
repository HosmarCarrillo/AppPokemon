import React, {useState, useEffect} from "react";
import {addPokemon, getTipo} from "../actions/index";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {validate} from "./Validate"
import profesor from "../pictures/profesor.png";
import './NewPokemon.css';

export default function PokemonCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const tipo = useSelector((state)=> state.tipo)//tipo
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
      nombre: "",
      vida: "",
      ataque: "",
      defensa: "",
      velocidad: "",
      altura: "",
      peso: "",
      img: "",
      tipo: [],

    
    });
    
    
    useEffect(() => {
        dispatch(getTipo());
    },[dispatch]);
    
  function handleChange(el){
    
    setInput({
      ...input,
      [el.target.name]: el.target.value
      })
    setErrors(
      validate({
      ...input,
      [el.target.name]: el.target.value
      }
      ));
      console.log(input)
    }
    
  function handleSelect(el){
    if(!input.tipo.includes(el.target.value)){
      setInput({
        ...input,
        tipo: [...input.tipo, el.target.value]

      })
    } 

  }

  function handleSubmit(el){    
    el.preventDefault();
    let validacion = (
      validate(input)
      )
      setErrors(validacion)

      if (Object.keys(validacion).length>0){
        alert("Hay Errores");
        validacion = {}
        return
      }
          dispatch(addPokemon(input))
          alert("Pokemon Creado")
          setInput({
              name: "",
              vida: "",
              ataque: "",
              defensa: "",
              velocidad: "",
              altura: "",
              peso: "",
              img: "",
              tipo: [],
          })
          history.push('/home')
      
  }
  function handleDelete(el){
    setInput({
      ...input, // se trae el estado anterior
      tipo: input.tipo.filter(occ => occ !== el)
    })
  }
  
  return (
    <div className="contenedor2 act">
     
      <div className="imagen">
        <img src={profesor} alt='' ></img>
        <h1>Crea tu Pokemon</h1>
        <form onSubmit={(el) => handleSubmit(el)}>
          <div className="input-form">
            <div className="g2">
              <div className="separacion">
                <label>Nombre:</label>
                <input
                type="text"
                required
                defaultValue={input.nombre}
                name="nombre"
                autoComplete="off"
                onChange={(el)=>handleChange(el)}
                />
                {errors.nombre && <p className="error">{errors.nombre}</p>}
              </div>
              <div className="separacion">
                <label>Vida:</label>
                <input
                type = "number"
                required
                defaultValue= {input.vida}
                name= "vida"
                onChange={(el)=>handleChange(el)}
                />
                {errors.vida && <p className="error">{errors.vida}</p>}
              </div>
              <div className="separacion">
                <label>Ataque:</label>
                <input
                type="number"
                required
                defaultValue={input.ataque}
                name="ataque"
                onChange={(el)=>handleChange(el)}
                />
                {errors.ataque && <p className="error">{errors.ataque}</p>}   
              </div>
              <div className="separacion">
                <label>Defensa:</label>
                <input
                type="number"
                required
                defaultValue={input.defensa}
                name="defensa"
                onChange={(el)=>handleChange(el)}
                />
                {errors.defensa && <p className="error">{errors.defensa}</p>}
              </div>
            </div>
            <div className="g1">
            <div className="separacion">
                <label>Velocidad:</label>
                <input
                type="number"
                required
                defaultValue={input.velocidad}
                name="velocidad"
                onChange={(el)=>handleChange(el)}
                />
                {errors.velocidad && <p className="error">{errors.velocidad}</p>}
              </div>
              <div className="separacion">
                <label>Altura:</label>
                <input
                type="number"
                required
                defaultValue={input.altura}
                name="altura"
                onChange={(el)=>handleChange(el)}
                />
                {errors.altura && <p className="error">{errors.altura}</p>}
              </div>
              <div className="separacion">
                <label>Peso:</label>
                <input
                className="peso"
                type="number"
                required
                defaultValue={input.peso}
                name="peso"
                onChange={(el)=>handleChange(el)}
                />
                {errors.peso && <p className="error">{errors.peso}</p>}
              </div>
              <div className="separacion">
                <label>Imagen:</label>
                <input className="inputimg"
                type="text"
                id="img"
                required
                defaultValue={input.img}
                name="img"
                onChange={(el)=>handleChange(el)}
                />
                {errors.img && <p className="error">{errors.img}</p>} 
              </div>
            </div>
            <div className="typesContainer">
              <select onChange={(el) => handleSelect(el)}>
                {input.tipo.length === 2 ?
                <option>"Tipos Completos"</option>
                :tipo.map((occ) => (
                <option key={occ.nombre} value={occ.nombre}>{occ.nombre.charAt(0).toUpperCase() + occ.nombre.slice(1)}</option>
                ))
                }
              </select>
                {errors.tipo && <p className="error">{errors.tipo}</p>}
            <div className="caja-de-tipos">
                {input.tipo.map(e=> 
                    <div className = "divOcc">
                        <p>{e.charAt(0).toUpperCase() + e.slice(1)}</p>
                        {/* <img src={el.img} alt="" /> */}
                        <button onClick={ () => handleDelete(e)}>X</button>
                    </div>
                    )}

            </div>
            </div>
          </div>
          <div className="crearpoke">
            <button
              disabled={
                Object.values(errors).length < 0 || input.tipo.length === 0 || input.tipo.length > 2 
              }
              onClick={(e) => handleSubmit(e)}
              type="submit"
              >
              Crear Pokemon!
            </button>         
          </div>
            </form> 
              <Link className="volver" to= '/home'><button>Volver</button></Link>
                </div>
        </div>
    )
    
    

}