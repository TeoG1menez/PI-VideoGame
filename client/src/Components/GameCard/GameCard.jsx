import React from 'react'
import { Link } from 'react-router-dom';
import './GameCard.css'
import { useEffect, useState } from 'react';
const axios = require('axios')

const GameCard = ({name, background_image, genres, id}) => {
  return (
 <div className='List'><li>     
 <div className="card" >
 <img src={background_image} alt='https://i1.sndcdn.com/artworks-000548614413-5eam83-t500x500.jpg' />
 <div className="info">
 <h1>{name || "Text-name"}</h1>
   <h3> Genres: {genres?.join(' / ')}</h3>
 </div>

</div>
</li></div>
 )
}

export default GameCard

