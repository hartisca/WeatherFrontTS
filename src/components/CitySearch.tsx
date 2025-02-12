import React, { useState } from "react";
import { fetchCityInfo } from "../services/api";
import { WeatherResponse } from "../types/weather";
import InfoBox from "./InfoBox";

const CitySearch: React.FC = () => {
  const [ city, setCity ] = useState<string>('')
  const [ error, setError ] = useState<string>('')
  const [ search, setSearch ] = useState<boolean>(false);
  const [ cityInfo, setCityInfo ] = useState<WeatherResponse | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (city === '') {
      setError('Por favor ingresa una ciudad');
    } else {
      setError('');      
      try {
        const data = await fetchCityInfo(city);
        setSearch(true);
        setCityInfo(data);
                
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
        setSearch(false);
      }
    }
  };

  return (
    <section className="sectionContainer">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Search City..."
          />
          <button type="submit">Search</button>
          { error && <div style={{ color: 'rgba(238, 238, 238)', backgroundColor: 'rgba(249, 35, 7, 0.40)', padding: 8, borderRadius: '10px' }}>{error}</div> }
        </form>
      </div>
      {search && cityInfo ? (
        <div className="infoContainer">
          <div>
            <h3>Clima en {cityInfo.address}</h3>
            <img 
              src={`/${cityInfo?.currentConditions?.icon || "default"}.png`} 
              alt="Weather icon"            
            />
          </div>
          <div className="hourPredContainer">
            <InfoBox cityInfo={cityInfo} />
          </div>              
        </div>
      ) : (
        <div>{search && !cityInfo && "Cargando..."}</div>
      )}           
    </section>
  )
}

export default CitySearch