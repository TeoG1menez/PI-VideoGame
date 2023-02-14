const { Router } = require('express');
const axios = require('axios');
require("dotenv").config();
const { API_KEY } = process.env;
// const Genre = require('../models/Genre')
// const Videogame = require('../models/Videogame')
// const Plataform =  require('../models/Plataform')
const {Genre, Plataform, Videogame} = require('../db')


const getApiGame = async()=>{

    const paginategames = [];
    var apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, {headers: { "Accept-Encoding": "gzip,deflate,compress" }})
        while(paginategames.length<5){
        paginategames.push(apiUrl.data.results)
        apiUrl = await axios.get(apiUrl.data.next);
    }
    const apiInfo = paginategames.flat().map((el) => {
       return ({
        id: el.id,
                name: el.name,
                background_image: el.background_image,
                released: el.released,
                rating: el.rating,
                platforms: el.platforms.map(el => el.platform.name),
                genres: el.genres.map(el=>{
                    return {id: el.id, name: el.name}
        })

    })
})

    return apiInfo

}
 const getApiGenre = async()=>{
    const DataApiGenre = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`,
    {  headers: { "Accept-Encoding": "gzip,deflate,compress" }} );
    const GenreDB = await DataApiGenre.data.results.map(el => {
        return Genre.findOrCreate({where: {name: el.name, idApi: el.id}})

    })

    return Genre.findAll()
}

const getPlatformApi = async()=>{
    const DataApiPlatform = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`,
    { headers: { "Accept-Encoding": "gzip,deflate,compress" }});


    let PlatformCreate = await DataApiPlatform.data.results.map(el=>{
        el.platforms.map(el=>{return Plataform.findOrCreate({where: {name: el.platform.name, idApi: el.platform.id}})})
          })
    return Plataform.findAll()
}

 const getGameDB = async() => {
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through:{attributes:[],},
        }, include:{
            model: Plataform,
            attributes: ['name'],
            through:{attributes:[],},
        }
    })
}

const getGameDetail = async(id)=>{
    if(isNaN(id)){
        let detailDb = await Videogame.findByPk(id)

        return await detailDb
        ;
    } else {
        let detailApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
        { headers: { "Accept-Encoding": "gzip,deflate,compress" }})

        return detailApi.data
    }
}

 const allInfo = async()=> {
    let Games = await getApiGame();
    let DBGames = await getGameDB();
    let AllGames = Games.concat(DBGames)
    return AllGames;
}



const router = Router();

router.get('/videogames', async(req, res, next)=>{
    const name = req.query.name
    const AllInfo = await allInfo();
    console.log(AllInfo.length)
   try { if(name) {
        const NameQuery = await AllInfo.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))

        NameQuery.length > 0 ? res.status(200).send(NameQuery) : res.status(400).send('The name does not match with any game')
    } else {res.status(200).send(AllInfo)}}
    catch(error){
        next(error)
    }
});

router.get(`/videogame/:id`, async(req, res, next)=>{
    const {id} = req.params;
    let detailGame = await getGameDetail(id)

    try{
        detailGame ? res.status(200).send(detailGame) : res.status(404).send('Not Found')
    }
  catch(error){
    next(error)
  }
});

router.get('/genres', async(req, res, next)=>{
    let GenreApi = await getApiGenre()
    console.log(GenreApi)
    try{
        res.status(200).send(GenreApi)
    } catch(error){
        next(error)
    }
});

router.post('/videogame', async(req, res)=>{
    const { name, description, released, background_image, rating, platforms, genre } = req.body;
  try{
    if(!name || !description || !genre || !platforms) {res.status(400).send('Fields (*) are required')}
    const findVideogame = await Videogame.findAll({ where: { name: name } });
    if (findVideogame.length != 0) {return res.send("The name already exists"); }
    let newVideoGame = await Videogame.create(
    {name,
    description,
    released,
    background_image,
    rating,
    plataformas: platforms,
    genero: genre})

    let Genres = await Genre.findAll({where: {name: genre}});

    console.log(newVideoGame)
    newVideoGame.addGenre(Genres);
    res.status(200).send('Videogame Created Succesfully')
}
    catch(error){
        res.send(error)
    }
})

router.get('/Platform', async(req, res)=>{
    try {
        //console.log('hola')
        const all = await getApiGame();
        const allPlatforms = [];
        const nuevo = []

        all.map(e => nuevo.push(e.platforms)
        )
        nuevo.map(e => e.map(p => {
            if (!allPlatforms.includes(p)){
                allPlatforms.push(p)
            }
        }))


        res.status(200).json(allPlatforms)
        }catch(e) {
            res.send(e)
        }
    });

module.exports = router;
