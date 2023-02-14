import React from 'react';
import {useState , useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx'
import GameCard from '../GameCard/GameCard.jsx'
import Paginado from '../Paginado/Paginado.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import NavBar from '../Nav/Nav.jsx';
import { getAllGames, getGenres, getPlatforms,orderByName, orderByRating,  orderByGenre,fiteredPlatform} from '../../Redux/Actions/Actions.js';
import { getDetail } from '../../Redux/Actions/Actions';
import './Home.css'


const Home = () => {
  const dispatch = useDispatch();
  const Games = useSelector((state)=> state.games)
  const platforms = useSelector((state) => state.platform)
  const genre = useSelector((state) => state.genres)
  const games2 = Games;
  const [order, setOrder] = useState('');
  useEffect(()=>{
    dispatch(getAllGames())
    dispatch(getGenres())
    dispatch(getPlatforms())
  },[dispatch])
//Funciones



  //PAGINADO 
  const[currentPage, setCurrentPage] = useState(1)
  const[gamesPerPage, ] = useState(15) 
  const lastGameIndex = currentPage * gamesPerPage
  const firstGamesIndex = lastGameIndex - gamesPerPage
  var currentGames = games2.slice(firstGamesIndex, lastGameIndex)
  //  const currentPage = useSelector(state => state.currentPage)
  
  const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);  
    setOrder(`Ordenado ${e.target.value}`)
}
function handleRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)
}


function handleByGenres(e){
    //e.preventDefault();
    dispatch(orderByGenre(e.target.value))
    //setCurrentPage(1)
    setOrder(`${e.target.value}`
    )
}

function handleByPlatform(e){
    e.preventDefault();
    dispatch(fiteredPlatform(e.target.value))
    setCurrentPage(1)
    setOrder(`${e.target.value}`)
}

  console.log(Games)
  
  return (
    <div className='Todo'>
      <NavBar/>
      
      <div className='Main'> 
          
          <SearchBar setCurrentPage={setCurrentPage}/>
          <Paginado 
                gamesPerPage = {gamesPerPage}
                allgames = {games2.length}
                paginado = {paginado}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                search={1}
                />
           <div className='selection'>
                <select onChange={e => handleSort(e)}  className=''>
                          <option value='Alphabetical Order'> Order By Name</option>  
                        <option value='AZ'>  A-Z </option>
                        <option value='ZA'>  Z-A </option>
                </select>
    
                <select onChange={e => handleRating(e)}  className=''>
                          <option value='Rating Order' > Order By Rating</option>  
                        <option value='Menor'>  Highest Rating </option>
                        <option value='Mayor'>  Lowest Rating </option>
                </select>
    
                
                <select onChange={e => handleByGenres(e)} className='' >
                    <option value='All'> ALL GENRES </option>
                    {genre?.map(el => (
                                <option key={el.id} value={el.name}>{el.name}</option>
                            ))
                            }
                    </select>
    
                    <select onChange={e => handleByPlatform(e)} className='' >
                    <option value='All'> ALL PLATFORMS </option>
                    {platforms?.map(el => (
                                <option key={el} value={el}>{el}</option>
                            ))
                            }
                    </select>
                    </div>
      
      <div className= 'Card'>
        
        { currentGames.length > 1 ? currentGames.map((c) => {return(
                              <Link to={`/videogame/${c.id}`} key={c.id}>
                              <GameCard key= {c.id}
                                        name = {c.name}
                                        id={c.id}
                                        background_image ={c.background_image} 
                                        genres={ c.genres?.map((e) => e.name? e.name : e )}/>
                              </Link>
                    )
                }) : <Loader/>
            }
        
     
      </div>
      <Paginado
       gamesPerPage = {gamesPerPage}
       allgames = {games2.length}
       paginado = {paginado}
       setCurrentPage={setCurrentPage}
       currentPage={currentPage}
       search={1}/> 
        
     </div>
    </div>

  )
}

export default Home
