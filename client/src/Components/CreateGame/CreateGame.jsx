
import React, { useState, useEffect } from 'react';
import { getGenres, getPlatforms, postVideogames } from '../../Redux/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux'
import NavBar from '../Nav/Nav';
import './CreateGame.css'
const axios = require('axios')


const CreateGame = () => {
const platforms = useSelector((state)=> state.platform)
const genero = useSelector((state)=> state.genres)
const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    released: '',
    background_image: '',
    rating: '',
    platforms: '',
    genre: ''
  });

  useEffect(() => {
    dispatch(getPlatforms())
    dispatch(getGenres())
  }, [dispatch]);

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

const handleCheckboxChange = event => {
  const platform = event.target.value;
  if (selectedPlatforms.includes(platform)) {
    setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
  } else {
    setSelectedPlatforms([...selectedPlatforms, platform]);
  }
};
const [selectedGenres, setSelectedGenres] = useState([]);

const handleGenreChange = event => {
  if (event.target.checked) {
    setSelectedGenres([...selectedGenres, event.target.value]);
  } else {
    setSelectedGenres(selectedGenres.filter(genre => genre !== event.target.value));
  }
};


  const handleSubmit = async event => {
    event.preventDefault();
    setFormData({ ...formData, 
      platforms: selectedPlatforms,
    genre: selectedGenres });
    dispatch(postVideogames(formData))
    
  };

  return (
    <div className='AllForm'>
      <NavBar/>
    <form className='Fromas'
    onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name*"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description*"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="released"
        value={formData.released}
        onChange={handleChange}
      />
      <input
        type="text"
        name="background_image"
        placeholder="Background Image URL"
        value={formData.background_image  }
        onChange={handleChange}
      />
      <input
        type="number"
        name="rating"
        min="0"
        max="5"
        step="1"
        placeholder="Rating (0-5)"
        value={formData.rating}
        onChange={handleChange}
      />
     
      <div>
  <p>Select Platforms*</p>
  {platforms ? platforms.map(platform => (
    <div key={platform}>
      <input
          type="checkbox"
          name="platforms"
          value={platform}
          onChange={e => handleCheckboxChange(e)}
        />
      <label>      
        {platform}
      </label>
    </div>
  )) : 'Select Platform'}
</div>

<div>
  <p>Select Genre*</p>
  {genero ? genero.map(gen => (
  <div key={gen.id}>
    <input
      type="checkbox"
      name="genre"
      value={gen.name}
      onChange={handleGenreChange}
    />
    <label>{gen.name}</label>
  </div>
)) : 'Select Genre'}
</div>
      <button type="submit">Submit</button>
      </form>
      
      </div>   )
}



export default CreateGame