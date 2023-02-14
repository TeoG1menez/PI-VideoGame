import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName, setPage} from '../../Redux/Actions/Actions'
import { Link } from "react-router-dom";
import './SearchBar.css'
export default function SearchBar({setCurrentPage}){

    const dispatch = useDispatch();
    const [name, setName] = useState("")

    useEffect(() => {
        dispatch(getVideogameByName)
    }, [dispatch])

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getVideogameByName(name));
        dispatch(setPage())
        setName("");
        setCurrentPage(1)

        
    }
    

    return (
        <div className="search">
            <form >
                <input
                    className="input"
                    type="text"
                    placeholder="Search your Videogame"
                    id="name"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => handleInputChange(e)}
                />
                <div className="btn">
                    <Link to={`/videogames?name=${name}`}><button onClick ={(e)=> handleSubmit(e)}>Search </button> </Link>   
                </div>
                 </form>
        </div>
    )
} 