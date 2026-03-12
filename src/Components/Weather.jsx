import React from "react";
import search from "../assets/search.png";

const Weather = ({
  weatherData,
  city,
  setCity,
  fetchData,
  loading,
  error,
}) => {
  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchData(city);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
return (
  <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl rounded-[2rem] p-8 w-[380px] text-white">
    
    {/* Enhanced Search Bar */}
    <div className="relative flex items-center mb-8 group">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search city..."
        className="w-full bg-white/10 border border-white/20 px-5 py-3 rounded-2xl text-white placeholder-white/60 outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300 pr-12"
      />
      <img
        src={search}
        alt="search"
        className="absolute right-4 w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-all"
        onClick={handleSearch}
      />
    </div>

    {loading && <div className="animate-pulse text-lg font-medium">Updating weather...</div>}

    {error && (
      <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 mb-4 text-red-200 text-sm">
        ⚠️ {error}
      </div>
    )}

    {weatherData && !loading && !error && (
      <div className="animate-fadeIn">
        {/* Main Temp & City */}
        <div className="space-y-1">
          <h2 className="text-7xl font-light tracking-tighter">
            {Math.round(weatherData.main.temp)}°
          </h2>
          <h3 className="text-2xl font-medium tracking-wide opacity-90">
            {weatherData.name}
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-10">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Humidity</p>
            <p className="text-xl font-semibold">{weatherData.main.humidity}%</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Wind Speed</p>
            <p className="text-xl font-semibold">{weatherData.wind.speed} <span className="text-sm">km/h</span></p>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default Weather;