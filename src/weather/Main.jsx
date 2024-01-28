import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import sun_icon from "../images/sunny.png";
import wind_icon from "../images/wind.png";
import humid_icon from "../images/humid.png";
import cloud_icon from "../images/cloudy.png"; // Corrected import path
import clear_icon from "../images/rainy.png"; // Corrected import path
import './Tullu.css';

const Main = () => {
    let api_key = "bc56f8b712da053d6f77d03c5f1f0467";
    const [wicon, setWicon] = useState(sun_icon);

    const search = async () => {
        const element = document.querySelector(".cityInput");
        const cityName = element.value.trim();

        if (!cityName) {
            return; // Exit early if input is empty
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${api_key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log("API Response:", data);

            // Check if data contains the expected properties
            if (data && data.main && data.wind) {
                const humidityPer = document.querySelector(".humidity");
                const windRate = document.querySelector(".humidity-percent");
                const temperature = document.querySelector(".weather-temp");
                const location = document.querySelector(".weather-location");

                humidityPer.textContent = data.main.humidity + "%";
                windRate.textContent = data.wind.speed + " km/hr";
                temperature.textContent = data.main.temp + " ℃";
                location.textContent = data.name;

                // Update weather icon based on weather condition
                if (data.weather && data.weather[0] && data.weather[0].icon) {
                    const iconCode = data.weather[0].icon;
                    if (iconCode === "01d" || iconCode === "01n") {
                        setWicon(clear_icon);
                    } else if (iconCode === "50n") {
                        setWicon(cloud_icon);
                    }
                }
            } else {
                console.error("API response format is unexpected:", data);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder="search"></input>
                <div className='search-icon' onClick={search}>
                    <SearchIcon />
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon} height="80px" width="100px" alt="" />
            </div>
            <div className='weather-temp'>24 &#8451;</div>
            <div className='weather-location'>London</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={wind_icon} className='icon' alt='' height='30px' width='30px' />
                    <div className='data'>
                        <div className='humidity'>64%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={humid_icon} className='icon' alt='' height='30px' width='30px' />
                    <div className='data'>
                        <div className='humidity-percent'>18km/hr</div>
                        <div className='text'>Wind-speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
