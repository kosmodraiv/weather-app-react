import { useState, useEffect } from "react";
import { fetchCitiesData } from "../ApiData/data";
import { Link } from "react-router-dom";
import "animate.css/animate.min.css";
import "./styled.scss";

function CityList() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCitiesData();
        setCities(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="animate__animated animate__fadeIn weather_table">
      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            <div>
              <h1>{city.name}</h1>
            </div>

            <div>
              <p>Температура: {Math.trunc(city.main.temp)}°C</p>
              <p>Влажность: {city.main.humidity}%</p>
              <p>Скорость ветра: {city.wind.speed}</p>
              <p>Давление: {city.main.pressure}</p>
            </div>
            <div>
              <Link to={`/city/${cities.indexOf(city)}`} key={city.id}>
                Детальнее
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CityList;
