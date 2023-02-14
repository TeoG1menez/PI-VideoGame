import React from 'react'
import {Link} from 'react-router-dom'
import './Landing.css'
const Landing = () => {
  return (
    <div className='Landing'>

        <div className='Textos'>
          <div className='Titulo'>  WELCOME PLAYER
              <div className='Subtitulo'>Here you will find the best VideoGames
               <div>
                  <a href='/Home' class='Boton'>SEE GAMES</a>
               </div>
                   
             </div>
          </div>   
        </div>

        <div className='Imagen'>
          
        </div>
    </div>
  )
}

export default Landing

