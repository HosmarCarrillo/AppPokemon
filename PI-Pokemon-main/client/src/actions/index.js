import axios from 'axios';

export function getPokemon() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/pokemon",{

        });
        return dispatch({
        type: 'GET_POKEMON',
        payload: json.data
    })
}
}

export function getNamePokemon(nombre){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/pokemon?nombre="+ nombre);
            return dispatch({
                type: "GET_NAME_POKEMON",
                payload: json.data
            });
        }catch(error){
            console.log(error)
            alert("Debes ingresar un Pokemon Existente")
        }
    }
}
export function getTipo() {
    return async function (dispatch) {
        var info = await axios("/tipo",{});
        return dispatch({
        type: 'GET_TYPES',
        payload: info.data
    })
}
}

export function addPokemon(payload) {
    return async function (dispatch) {
        try{
            var info = await axios.post("http://localhost:3001/pokemon", payload);
            alert("Pokemon Creado")
            return dispatch({
            type: 'ADD_POKEMON',
            payload: info.data
            
        })
        }catch (e){
            console.log(e)

        }
    
}
}

export function getDetail (id){
    return async function(dispach){
        try {
            const json = await axios.get(`http://localhost:3001/pokemon/${id}`);           
            return dispach({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
            
        }
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function orderByAttack(payload){
    return{
        type: 'ORDER_BY_ATTACK',
        payload
    }
}


export function clearPokemonById() {
    return {
      type: "CLEAR_POKEMON_BY_ID",
    };
  }

export function clearState() {
    return {
      type: "CLEAR_STATE",
    };
  }
  export function filterPokemonsByType(payload){
    return{
        type: 'FILTER_BY_TYPE',
        payload: payload,
    }
}


export function filterCreated(filterBy, origin){
    return{
        type: 'FILTER_CREATED',
        payload: { filterBy, origin }
    }
}

export function deletePokemon(id) {
    return async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/pokemon/${id}`)
            return response
        }catch (error) { return error }
}
};


