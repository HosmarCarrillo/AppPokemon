const initialState = {
    pokemon: [],
    allPokemon: [],
    tipo: [],
    detail: [],
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_POKEMON':
            return {
                ...state,
                pokemon: action.payload,
                allPokemon: action.payload
            }

        case 'GET_NAME_POKEMON':
            return{
                ...state,
                pokemon: action.payload
            }

        case 'ORDER_BY_NAME':
            const allPok = state.allPokemon;
            let sortedArr = action.payload === 'asc'?
                state.pokemon.sort(function(a,b){
                    if(a.nombre > b.nombre){
                        return -1;
                    }
                    if(b.nombre > a.nombre){
                        return 1;
                    }
                        return 0;
                    }) :
                state.pokemon.sort(function(a,b){
                    if(a.nombre > b.nombre){
                        return 1;
                    }
                    if(b.nombre > a.nombre){
                        return -1;
                    }
                        return 0;
                })
            let ataqueOrderNu = action.payload === 'All'?
                allPok.sort(function(a,b){
                    if(a.id > b.id){
                        return 1;
                    }
                    if(b.id > a.id){
                        return -1;
                    }
                        return 0;
                    
                    })
                : sortedArr
            return {
                ...state,
                    pokemon: action.sortedArr === 'All'? sortedArr : ataqueOrderNu
            }
        case 'ORDER_BY_ATTACK':
            const allPoke = state.allPokemon;
            let ataqueOrder = action.payload === 'asc'
                ? allPoke.sort(function(a,b){
                    if(a.ataque > b.ataque){
                        return -1;
                    }
                    if(b.ataque > a.ataque){
                        return 1;
                    }
                        return 0;
                }) 
                : allPoke.sort(function(a,b){
                    if(a.ataque > b.ataque){
                        return 1;
                    }
                    if(b.ataque > a.ataque){
                        return -1;
                    }
                        return 0;
                    })
            let ataqueOrderN = action.payload === 'All'?
                allPoke.sort(function(a,b){
                    if(a.id > b.id){
                        return 1;
                    }
                    if(b.id > a.id){
                        return -1;
                    }
                        return 0;
                    
                    })
                : ataqueOrder
            return {
                ...state,
                    pokemon: action.ataqueOrder === 'All'? ataqueOrderN : ataqueOrder
            }

            

        case 'ADD_POKEMON':
            return {
                ...state,
                    pokemon: [...state.pokemon, action.payload]
            }    

        case "CLEAR_POKEMON_BY_ID":
            return {
                ...state,
                    pokemonById: [],
            };
        case "FILTER_BY_TYPE":
            const pokemonsFilterByTypes = action.payload === "All"? state.allPokemon: state.allPokemon.filter (el=> el.tipo.includes(action.payload));
                if (!pokemonsFilterByTypes.length ) {
                    alert("No hay pokemon de este tipo")
                }

            return {
                ...state,
                    pokemon: pokemonsFilterByTypes.length? pokemonsFilterByTypes: state.pokemon
            }
            
        case 'GET_TYPES':           
            return {
                ...state,
                    tipo: action.payload
                }
        case "FILTER_CREATED":
            const allPokemons = state.allPokemon;
            const createdFilter =
                action.payload.filterBy === "created"
                ? allPokemons.filter((el) => el.createdInDb)
                : allPokemons.filter((el) => !el.createdInDb);
            return {
                ...state,
                    pokemon: action.payload.filterBy === "All" ? state.allPokemon : createdFilter,
            };
        case "CLEAR_STATE":
            return {
                ...state,
                    detail:[],
                    pokemon: [],
        };
        case "GET_DETAILS":
            return{
                ...state,
                    detail: action.payload 
            }

            default: 
            return state;
            
    }

}


export default rootReducer;











