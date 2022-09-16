// d33e7b433c0321b62f577b219b84174b
// https://api.openweathermap.org/data/2.5/weather?q=kalyan&appid=46f78d49915a3be2c00e75baaec5b8be 

import "./weather.css"
import React, { useEffect, useState } from 'react'
import WeatherCard from "./WeatherCard";

const Weather = () => {

  const [searchValue, setSearchValue] = useState("kalyan");
  const [tempInfo, settempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=46f78d49915a3be2c00e75baaec5b8be`

      const res = await fetch(url);
      const data = await res.json()

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
      };
      settempInfo(myNewWeatherInfo)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWeatherInfo();
  },[])

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input type="search"
            placeholder="Search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>

        </div>
      </div>

      {/* Card */}
      <WeatherCard tempInfo={tempInfo}/>
      
    </>
  )
}

export default Weather
