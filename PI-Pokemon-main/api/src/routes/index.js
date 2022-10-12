const { Router } = require('express');
const axios = require ('axios');
const {Pokemon, Tipo} = require ('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const getApiInfoPokemon = async () => {
    const apiUrlPokemon = await axios.get('http://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
    const apiInfoPokemon = await Promise.all(apiUrlPokemon.data.results.map(e => axios.get(e.url)));
    const apiInfoFinal = apiInfoPokemon.map(el => {
        return {
            id: el.data.id,
            nombre: el.data.name.charAt(0).toUpperCase() + el.data.name.slice(1),
            vida: el.data.stats[0].base_stat,
            ataque: el.data.stats[1].base_stat,
            defensa: el.data.stats[2].base_stat,
            velocidad: el.data.stats[5].base_stat,
            altura: el.data.height,
            peso: el.data.weight,
            tipo: el.data.types.map(t => { return t.type.name }),
            img: el.data.sprites.other.dream_world.front_default
        }
    })
    return apiInfoFinal
};
    

router.get("/tipo", async (req, res)=>{
    const apiUrlTipo = await axios.get("https://pokeapi.co/api/v2/type")
    const apiInfoTipo = await apiUrlTipo.data.results.map(el => el.name);
    apiInfoTipo.forEach((e) => {
        Tipo.findOrCreate({
          where: { nombre : e},
        });
      });
      const allTipos= await Tipo.findAll();
      res.send(allTipos);
    });

const getDbInfo = async () => {
    const pokemons = await Pokemon.findAll({
        include: {
            model: Tipo,
            attributes: ["nombre"],
                through: {
                    attributes: [],
                } 
        },
    })
    const fixedPokemons = []
    pokemons.forEach(pokemon=> { // para cada uno
        const { tipos, ...pokemonAtt } = pokemon.dataValues // 
        const newPokemon = {
            ...pokemonAtt, 
            tipo:tipos.map(t=>t.nombre)
        }
        fixedPokemons.push(newPokemon)
    })
    
    return fixedPokemons
} 

const getAllPokemon = async () =>{
    const apiInfo = await getApiInfoPokemon();
    const dbInfo = await getDbInfo();
     
    const infoTotal = apiInfo.concat(dbInfo);
    
        return infoTotal;
}

router.get('/pokemon/:id', async (req, res)=>{ // params
    
    const {id} = req.params; // const {id} = req.params
    console.log("🚀 ~ file: index.js ~ line 177 ~ router.get ~ id", id)
    let pokemonAll = await getAllPokemon()
    console.log("🚀 ~ file: index.js ~ line 72 ~ router.get ~ pokemonAll", pokemonAll)
    
    if (id) {
      
        const foundPokemon = pokemonAll.find( p => p.id == id);
        console.log("🚀 ~ file: index.js ~ line 195 ~ router.get ~ foundPokemon", pokemonAll)
    
        if (foundPokemon) {
            return res.json(foundPokemon);
        } else {
            return res.json("El ID ingresado no pertenece a ningún pokemon");
        }
    }
    
});

router.get("/pokemon", async (req, res) => {
    const nombre = req.query.nombre;  
        let PokemonesTotales = await getAllPokemon();
        
        if (nombre) {
            let PokemonNombre = await PokemonesTotales.filter(el => el.nombre.toLowerCase()===(nombre.toLowerCase()));
            PokemonNombre.length ?
                res.status(200).send(PokemonNombre) :
                res.status(404).send("Pokemon no existe")
        } else {
            res.status(200).send(PokemonesTotales)
        }
    })


router.post("/pokemon", async (req, res) => {
    const {
        
        nombre,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        tipo,
        img
    } = req.body
    console.log("🚀 ~ file: index.js ~ line 124 ~ router.post ~ req.body", req.body)
    
    if (!nombre || !vida || !ataque ||  !defensa ||  !velocidad ||  !altura ||  !peso ||  !tipo ||  !img){
        return res.status(404).json({ msg: "Faltan datos" })
    }
    let pokemonCreado = await Pokemon.create({
        
        nombre,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        img
    });
    
    let tipoDb = await Tipo.findAll({
        where: { nombre:tipo },
    })
    pokemonCreado.addTipo(tipoDb);
    return res.send("Pokemon creado con exito")

});

router.delete("/pokemon/:ID", async (req, res) => {
    const { ID } = req.params;
    try {
        let deletePokemon = await Pokemon.destroy({
            where: { id: ID }
        })
        getAllPokemon();
        return deletePokemon === 0
            ? res.status(404).send("Algo salio mal!")
            : res.status(200).send("Pokemon Eliminado")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Algo salio mal!")
    }
})

router.put("/pokemon/:ID", async (req, res) => {
    const { ID } = req.params;
    try {
        let putPokemon = await Pokemon.destroy({
            where: { id: ID }
        })
        getAllPokemon();
        return deletePokemon === 0
            ? res.status(404).send("Algo salio mal!")
            : res.status(200).send("Pokemon Eliminado")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Algo salio mal!")
    }
})

module.exports = router;