import { useState, useEffect } from "react";
import { fetchCitiesData } from "../../api/data";
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
        {cities.map((city) => {
          const { id, name, main, wind } = city;
          const { temp, humidity, pressure } = main;
          const { speed: windSpeed } = wind;

          return (
            <li key={id}>
              <h1>{name}</h1>

              <div>
                <p>Температура: {Math.trunc(temp)}°C</p>

                <p>Влажность: {humidity}%</p>

                <p>Скорость ветра: {windSpeed}</p>

                <p>Давление: {pressure}</p>
              </div>

              <Link to={`/city/${cities.indexOf(city)}`} key={id}>
                Детальнее
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CityList;
