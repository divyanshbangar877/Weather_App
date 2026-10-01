import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import Weather from "./Components/Weather";
import Mousam from "./Components/Mousam";
function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const API_KEY="aa9ff60b44c0d10b18101db68fa22a91";
  
 const fetchData = async (cityName) => {
  try {
    setLoading(true);
    setError(null);

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    );

    const data = await res.json();
    console.log("API RESPONSE:", data);

    // IMPORTANT FIX
    if (data.cod !== 200) {
      setError(data.message);
      console.log("error occured");
      setWeatherData(null);
      return;
    }

    setWeatherData(data);

  } catch (err) {
    setError("Something went wrong");
    setWeatherData(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData(city);
    
  }, []);

  
   
    return (
      <div>
        
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
  <Mousam></Mousam>
    <Weather
      weatherData={weatherData}
      city={city}
      setCity={setCity}
      fetchData={fetchData}
      loading={loading}
      error={error}
    />
  </div>
</div>
  );
}


export default App;