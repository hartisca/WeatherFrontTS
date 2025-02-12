import React from 'react';
import { WeatherResponse } from '../types/weather';

interface InfoBoxProps {
  cityInfo: WeatherResponse | null;
}

const InfoBox: React.FC<InfoBoxProps> = ({cityInfo}) => {
  if (!cityInfo || !cityInfo.days || cityInfo.days.length === 0) {
    return <div>No hay datos disponibles</div>
  }

  //Cargar datos del día actual y de el día siguiente
  const today = cityInfo.days[0]
  const tomorrow = cityInfo.days[1]
  const currentHour = new Date().getHours()

  //Filtrar horas restantes del día actual
  const remainingHoursToday = today.hours.filter(
    (hour) => parseInt(hour.datetime.split(":")[0]) > currentHour
  );

  //Si no quedan 5h, coger las que falten del día siguiente
  const missingHours = 5 - remainingHoursToday.length;
  const nextDayHours = missingHours > 0 ? tomorrow.hours.slice(0, missingHours) : [];

  //Unir datos
  const nextHours = [...remainingHoursToday, ...nextDayHours].slice(0, 5);

  return (
    <div className='infoBox'>
      <h3>Pronostico por horas</h3>
      <div className="hourlyForecast">
        {nextHours.length > 0 ? (
          nextHours.map((hour, index) => (
            <div key={index} className="hourItem">
              <p>{hour.datetime.split(":").slice(0, 2).join(":")}</p>
              <img src={`/${hour.icon}.png`} alt="Weather icon" />
              <p>{hour.temp}°C</p>
              <p>Probabilidad: {hour.precipprob}%</p>
            </div>
          ))
        ) : (
          <p>No hay más datos para hoy</p>
        )}
      </div>
    </div>
  );
};

export default InfoBox;