import { bindActionCreators } from 'redux'
import {GET_GAMES,GET_GENRES,GET_PLATFORMS, GET_DETAIL, POST_GAME, GET_GAMEBYNAME
, ORDER_BY_GENRES, ORDER_BY_RATING, ORDER_BY_NAME, FILTER_BY_PLATFORM,SET_PAGE} from '../Constants/Constants.js'


const initialSate = {
    games: [],
    gameDetail: [],
    genres: [],
    platform: [],
    gamesByName:[],
    allVideogames:[],
    currentPage: []
}
const Reducer = (state=initialSate, action) =>{
    switch (action.type){
      case SET_PAGE:
        return {
          ...state,
          currentPage: 1,
        };
        case GET_GAMES:
            return {...state,
                allVideogames: action.payload,
            games: action.payload}

        case GET_DETAIL:
            return{
            ...state,
            gameDetail: action.payload
        }  
        case POST_GAME: 
            return{...state} 
        case GET_GENRES: 
            return {
             ...state,
                genres: action.payload
        } 
        case GET_PLATFORMS:
            return {
                ...state,
                platform: action.payload
        }
        case GET_GAMEBYNAME:
        return{
              ...state,
              games: action.payload,
              
        };
        case ORDER_BY_RATING:
        let ratingGame=
          action.payload === "Mayor"?
            state.games.sort(function(a,b){
              if(a.rating > b.rating){
                return 1;
              }
              if(a.rating < b.rating){
                return -1;
              }
              return 0;
            })
            :state.games.sort(function(a,b){
              if(a.rating < b.rating){
                return 1;
              }
              if(a.rating > b.rating){
                return -1;
              }
              return 0;
            })
        return{
          ...state,
          games: action.payload === "default"? state.games : ratingGame,
    };
        case ORDER_BY_NAME:
          let aZVideogames=
            action.payload === "AZ"?
              state.games.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                  return 1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                  return -1;
                }
                return 0;
              })
              :state.games.sort(function(a,b){
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                  return 1;
                }
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                  return -1;
                }
                return 0;
              })
          return{
            ...state,
            games: action.payload === "default"? state.games : aZVideogames,
        };
        case ORDER_BY_GENRES:
            const allVideogames = state.allVideogames
            const FilteredGenre = action.payload === "All" ? allVideogames : 
            allVideogames.filter( e => e.genres?.map((e) => e.name? e.name : e).includes(action.payload))
            // c.genres?.map((e) => e.name? e.name : e )
            return {
              ...state,
              games : FilteredGenre
            };
            case FILTER_BY_PLATFORM:
                const allVG = state.allVideogames
        
                  // allVG.map(e => console.log(e.platform))
                const filterByPlatform = action.payload === "All"? allVG : 
                allVG.filter(e => e.platforms?.map(e => e).includes(action.payload))
                return {
                  ...state,
                  games: filterByPlatform
                };

        default: return{...state}    
    } 
}

export default Reducer