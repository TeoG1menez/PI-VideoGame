import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from '../../Redux/Actions/Actions';
import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../../Components/Nav/Nav'
import './GameDetail.css'
const cheerio = require('cheerio');
const GameDetail = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const GameDetail = useSelector((state)=> state.gameDetail)
  const detalleID = useSelector((state) => state.gameDetail.id)
   useEffect(() => {
       dispatch(getDetail(id))   
   },[dispatch])
   console.log(id)
   console.log(detalleID)
   if(typeof  detalleID === 'number'){return (<div> 
   
    {console.log('soy if', GameDetail)}
    
     {
         <div className='Detail'> 
         <NavBar/>
            
            <div className='Detail2'>
               <div className='DetailCard'>
               <img src={GameDetail.background_image ? GameDetail.background_image : 'https://i1.sndcdn.com/artworks-000548614413-5eam83-t500x500.jpg' } alt="Not Aviable" />
            <h1>Game Name: {GameDetail.name}</h1> 
            <p>Rating: {GameDetail.rating}</p>
            <p>Description: { cheerio.load(GameDetail.description? GameDetail.description : '' ).text() }</p>
            <p>Released at: {GameDetail.released}</p>
            <p>Plataformas: { GameDetail.platforms.map( e => e.platform.name).join(' / ')   }</p>
            <p>Genres: {GameDetail.genres? GameDetail.genres.map(e => e.name).join('') : ''}</p>
       
                </div>  
            </div>
             </div> 
     }
 </div>)} else { return(
   
   <div>
      {console.log('soy else',GameDetail)}
      
       {
           <div className='Detail'> 
           <NavBar/>
           <div className='Detail2'>
            <div className='DetailCard'>
            <img src={GameDetail.background_image ? GameDetail.background_image : 'https://i1.sndcdn.com/artworks-000548614413-5eam83-t500x500.jpg' } alt="Not Aviable" />
              <h1>Game Name: {GameDetail.name}</h1> 
              <p>Rating: {GameDetail.rating}</p>
              <p>Description: { cheerio.load(GameDetail.description? GameDetail.description : '' ).text() }</p>
              <p>Released at: {GameDetail.released}</p>
              <p>Plataformas: {GameDetail.plataformas? GameDetail.plataformas.map(e => e).join(' / ') : ''}</p>
              <p>Genre: {GameDetail.genero? GameDetail.genero.map(e=>e).join(' / '):''}</p>
            </div>
          
              
           </div>
             
           </div> 
       }
   </div>
)}
 
}

export default GameDetail
