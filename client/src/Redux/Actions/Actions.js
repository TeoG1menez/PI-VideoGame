import {SET_PAGE,ORDER_BY_GENRES,FILTER_BY_PLATFORM,ORDER_BY_NAME,ORDER_BY_RATING,GET_GAMES, GET_GENRES, GET_PLATFORMS, GET_DETAIL, POST_GAME, GET_GAMEBYNAME} from '../Constants/Constants.js'
const axios = require('axios') 

export function fiteredPlatform(payload){
    return{
        type: FILTER_BY_PLATFORM,
        payload
    }
};
export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload: payload
    }
};

export function setPage(){
    return {
        type: SET_PAGE,
        
    }
}
export function orderByRating(payload){
    return{
        type: ORDER_BY_RATING,
        payload:payload
    }
};
export function orderByGenre(payload){
    return{
        type: ORDER_BY_GENRES,
        payload: payload
    }
};
export const getAllGames = (name) => {
    return  async function (dispatch) {
        let json = await axios.get(`http://localhost:3001/videogames`)
        // .then((res) => res.json())
        // .then((data) => dispatch({type: GET_GAMES, payload: data}))
        return dispatch({
            type:GET_GAMES,
            payload: json.data
        })
    };

    
};
export function clear(){
    return{
        type: 'CLEAR',
        payload : {}
    }
};
export function getGenres() {
    return async function (dispatch){
        try {
            var json = await axios.get ("http://localhost:3001/genres");
            return dispatch({
                type: GET_GENRES,
                payload: json.data
            })
        } catch (error) {   
            console.log(error.message)
        }
    }
};
export function getPlatforms(){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/Platform");
            return dispatch({
                type: GET_PLATFORMS,
                payload: json.data
            })
        }catch(error){
            console.log(error.message)
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/videogame/'+ id)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
        })
        } catch(error) { 
        console.log(error) 
        }
    }
}

export function postVideogames(payload) {
    return async function () {
       try {
        const createPost = await axios.post(`http://localhost:3001/videogame`, payload);
        return createPost;
   
       } catch (error) {
        console.log(error.message)
       }
    }
};
export function getVideogameByName (name){
    
    return async function (dispatch){
        try{
            var json = await axios.get (`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: GET_GAMEBYNAME,
                payload: json.data,
               
            })
        } catch (error){

            console.log (error.message)
            return alert('Sorry, game not found, try again.')
            
        }
        
    };
    
};