import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { getAllGames, clear} from '../../Redux/Actions/Actions';
import { useDispatch} from "react-redux";
import './Nav.css'

export default function NavBar (){

    //const allGames= useSelector((state) => state.videogames)
    const dispatch = useDispatch(); 
    
    

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getAllGames());
        dispatch(clear());
        }
    
    


    return (
        <div className='wrapper'>
            <div class='sidebar'>
            <ul>
            <li><a href="/Home" class="fas_fa-home">Home</a></li>
            <li><a href="/createGame" >Create Game</a></li>            
            </ul> 
            </div>
         </div>
    )
}