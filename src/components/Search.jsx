import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { AppContext } from '../context/app.context';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "../styles/Search.css";
function Search() {

    const [data, setData] = useState([]);
    const {state} = useContext(AppContext);
    const router = useNavigate();
    const city = state.city;
    const [loading,setLoading] = useState(false);

    async function weatherApp(){
      const options = {
        method: 'GET',
        url: 'https://yahoo-weather5.p.rapidapi.com/weather',
        params: {
            location: city,
            // location : `${city}`,
            format: 'json',
            u: 'f'
        },
        headers: {
            // 'x-rapidapi-key': '8159926dabmshf7105c60c567d79p183ab2jsn6a75ad5d4d7c',
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        }
      };
      setLoading(true);
      try{
        const response = await axios.request(options);
        console.log(response.data,"response.data");

        if(response?.data && response.data.location.city.toLowerCase() == city.toLowerCase()){
            setLoading(false);
            setData([response.data]);
            console.log(data,"data");
        }else{
          toast.error("city not found!! please provide correct city name")
          router('/');

        }
      }catch (error){
        console.error(error);
        console.log("city not found");
      }
    }
    useEffect(()=>{
      weatherApp();
    },[]);

  return(
    <div id='fullpage2'>
      {loading ? 
        (
          <div className='loader'></div>
        ) : (
          <div>
            <h1>Weather app</h1>
            <div id='welcome'>Welcome to Weather app! Click <span onClick={()=>{router('/')}} style={{color:"blue",cursor:"pointer",padding:"5px",textDecoration:"underline"}}> here </span> to search again</div>
            {data.map((props)=>(
              <div id='searchPage'>
                <div id='cityInfo'>
                  <div id='city'>
                    <div id='dates'>
                      <p id='p1'>{props.location.city}</p>
                      <p id='p2'>{props.location.country}, {new Date((props.current_observation.pubDate)*1000).toLocaleString()}</p>
                    </div>
                    <div id='celcius'>
                      <span id='deg1'>
                        {((props.current_observation.condition.temperature - 32) * 5 / 9 ).toFixed(0)}
                        <span id='deg2'>°c</span>
                      </span>
                      <p style={{color:"white",fontSize:"20px",marginTop:"-5px"}}>
                        {props.current_observation.condition.text}
                      </p>
                    </div>
                  </div>
                  <div id='info'>
                    <div id='minimumTemp'>
                      <div className='chillImage'></div>
                      <div id='chillInfo'>
                        <p id='chillInfoP1'>Latitude</p>
                        <p id='chillInfoP2'>{props.location.lat}</p>
                      </div>
                    </div>
                    <div id='maximumTemp' >
                      <div id='maxTemp' className='chillImage'></div>
                      <div id='chillInfo'>
                        <p id='chillInfoP1'>Longitude</p>
                        <p id='chillInfoP2'>{props.location.long}</p>
                      </div>
                    </div>
                    <div id='sunrise'>
                      <div id='sunriseImg' className='chillImage'></div>
                      <div id='chillInfo'>
                        <p id='chillInfoP1'>Sunrise</p>
                        <p id='chillInfoP2'>{props.current_observation.astronomy.sunrise}</p>
                      </div>
                    </div>
                    <div id='sunset'>
                      <div id='sunsetImg' className='chillImage'></div>
                      <div id='chillInfo'>
                        <p id='chillInfoP1'>Sunset</p>
                        <p id='chillInfoP2'>{props.current_observation.astronomy.sunset}</p>
                      </div>
                    </div>
                    <div id='humidity'>
                      <div id='humidityImg' className='chillImage'></div>
                      <div id='chillInfo'>
                        <p id='chillInfoP1'>Humidity</p>
                        <p id='chillInfoP2'>{props.current_observation.atmosphere.humidity}%</p>
                      </div>
                    </div>
                    <div id='visibility'>
                      <div id='visibilityImg' className='chillImage'></div>
                      <div id='chillInfo'>
                        <p id='chillInfoP1'>Visibility</p>
                        <p id='chillInfoP2'>{((props.current_observation.atmosphere.visibility)*1.60934).toFixed(1)} km</p>
                      </div>
                    </div>
                    <div id='wind'>
                      <div id='windImg' className='chillImage'></div>
                      <div id='chillInfo'>
                        <p id='chillInfoP1'>Wind</p>
                        <p id='chillInfoP2'>{((props.current_observation.wind.speed)*1.60934).toFixed(1)} km/h {props.current_observation.wind.direction}</p>
                      </div>
                    </div>
                    <div id='pressure'>
                      <div id='pressureImg' className='chillImage'></div>
                      <div id='chillInfo'>
                        <p id='chillInfoP1'>Pressure</p>
                        <p id='chillInfoP2'>{props.current_observation.atmosphere.pressure} mb</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id='forecast'>
                  <div id='headingForecast'>Weekly Weather Forecast</div>
                  <table>
                    <thead id='thead2'>
                      <tr>
                        <th>Day</th>
                        <th>Date</th>
                        <th>Maximum<br/> Temperaure</th>
                        <th>Minimum<br/> Temperature</th>
                        <th>Weather<br/> Condition</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{props.forecasts[0].day}</td>
                        {/* <td>{new Date(props.forecasts[0].date).toISOString().split('T')[0]}</td> */}
                        <td>{new Date((props.forecasts[0].date)*1000).toLocaleString().split(',')[0]}</td>
                        <td>{((props.forecasts[0].high - 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{((props.forecasts[0].low- 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{props.forecasts[0].text}</td>
                      </tr>
                      <tr>
                        <td>{props.forecasts[1].day}</td>
                        <td>{new Date((props.forecasts[1].date)*1000).toLocaleString().split(',')[0]}</td>
                        <td>{((props.forecasts[1].high - 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{((props.forecasts[1].low- 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{props.forecasts[1].text}</td>
                      </tr>
                      <tr>
                        <td>{props.forecasts[2].day}</td>
                        <td>{new Date((props.forecasts[2].date)*1000).toLocaleString().split(',')[0]}</td>
                        <td>{((props.forecasts[2].high - 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{((props.forecasts[2].low- 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{props.forecasts[2].text}</td>
                      </tr>
                      <tr>
                        <td>{props.forecasts[3].day}</td>
                        <td>{new Date((props.forecasts[3].date)*1000).toLocaleString().split(',')[0]}</td>
                        <td>{((props.forecasts[3].high - 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{((props.forecasts[3].low- 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{props.forecasts[3].text}</td>
                      </tr>
                      <tr>
                        <td>{props.forecasts[4].day}</td>
                        <td>{new Date((props.forecasts[4].date)*1000).toLocaleString().split(',')[0]}</td>
                        <td>{((props.forecasts[4].high - 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{((props.forecasts[4].low- 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{props.forecasts[4].text}</td>
                      </tr>
                      <tr>
                        <td>{props.forecasts[5].day}</td>
                        <td>{new Date((props.forecasts[5].date)*1000).toLocaleString().split(',')[0]}</td>
                        <td>{((props.forecasts[5].high - 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{((props.forecasts[5].low- 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{props.forecasts[5].text}</td>
                      </tr>
                      <tr>
                        <td>{props.forecasts[6].day}</td>
                        <td>{new Date((props.forecasts[6].date)*1000).toLocaleString().split(',')[0]}</td>
                        <td>{((props.forecasts[6].high - 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{((props.forecasts[6].low- 32) * 5 / 9).toFixed(0)}°</td>
                        <td>{props.forecasts[6].text}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>   
            ))}
          </div>
        )
      }  
    </div>
  )
}

export default Search;