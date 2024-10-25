import React, { useContext, useState } from 'react';
import "../styles/Home.css";
import { AppContext } from '../context/app.context';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Home() {
    const [city, setCity] = useState("");
    const {dispatch} = useContext(AppContext);
    const router = useNavigate();

    function handleChange(e){
        setCity(e.target.value);
    }
    function handleSubmit(){
        if(!city){
          return toast.error("City name cant be empty!");
        }
        if(!city.trim()){
            return toast.error("City name cant be spaces!");
        }
        const validPattern = /^[A-Za-z\s]+$/;
        if(!validPattern.test(city)){
           return toast.error("City name must be letters!");
        }
        if(city.length > 50){
            return toast.error("City name can not be longer than 50 letters!");
        }
        dispatch({type: "SEARCH", payload: city})
        setCity("");
        router("/search");
    }
  return (
    <div id='fullpage'>
        <h1>Weather app</h1>
        <div id='welcome'>Welcome to Weather app!</div>
        <div id='card'>
            <input type='text'  name='location' placeholder='Search City' onChange={handleChange} value={city} /><br/>
            <button onClick={handleSubmit}>Submit</button>
        </div> 
    </div>
  )
}

export default Home