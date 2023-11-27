import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCitiesData } from "../../api/data";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import "animate.css/animate.min.css";
import "./styled.scss";

function CityDetails() {
  const [cityData, setCityData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { index } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCitiesData(index);
        setCityData(data[index]);
      } catch (error) {
        console.error("Ошибка при загрузке данных", error);
      }
    };

    fetchData();
  }, [index]);

  if (!cityData) {
    return <div>Loading...</div>;
  }

  const handleModalOpen = (text) => {
    setModalContent(text);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const daterise = new Date(cityData.sys.sunrise * 1000);
  const formattedRise = daterise.toLocaleTimeString();

  const datesunset = new Date(cityData.sys.sunset * 1000);
  const formattedSunset = datesunset.toLocaleTimeString();

  const weatherInfo = [
    {
      text: `Температура: ${Math.trunc(cityData.main.temp)}°C`,
      onClick: () =>
        handleModalOpen(
          `Температу́ра — скалярная физическая величина, характеризующая термодинамическую систему и количественно выражающая интуитивное понятие о различной степени нагретости тел. Температура в данном городе: ${Math.trunc(
            cityData.main.temp
          )}°C`
        ),
    },
    {
      text: `Влажность: ${cityData.main.humidity}%`,
      onClick: () =>
        handleModalOpen(
          `Вла́жность — показатель содержания воды в физических телах или средах. Влажность в воздухе города: ${cityData.main.humidity}%`
        ),
    },
    {
      text: `Скорость ветра: ${cityData.wind.speed}`,
      onClick: () =>
        handleModalOpen(
          `Двенадцатибалльная шкала, принятая Всемирной метеорологической организацией для приближённой оценки скорости ветра по его воздействию на наземные предметы или по волнению в открытом море. Средняя скорость ветра указывается на стандартной высоте 10 метров над открытой ровной поверхностью. Скорость ветра в данном городе: ${cityData.wind.speed}`
        ),
    },
    {
      text: `Давление: ${cityData.main.pressure}`,
      onClick: () =>
        handleModalOpen(
          `Атмосфе́рное давле́ние — давление атмосферы, действующее на все находящиеся в ней предметы и на земную поверхность, равное модулю силы, действующей в атмосфере, на единицу площади поверхности по нормали к ней. Давление в данном городе: ${cityData.main.pressure}`
        ),
    },
    {
      text: `Мин.темп: ${Math.trunc(cityData.main.temp_min)}°C`,
      onClick: () =>
        handleModalOpen(
          `Минимальная температура в данном городе в течении суток: ${Math.trunc(
            cityData.main.temp_min
          )}°C`
        ),
    },
    {
      text: `Макс.темп: ${Math.trunc(cityData.main.temp_max)}°C`,
      onClick: () =>
        handleModalOpen(
          `Максимальная температура в данном городе в течении суток: ${Math.trunc(
            cityData.main.temp_max
          )}°C`
        ),
    },
    {
      text: `Температура по ощущениям: ${Math.trunc(
        cityData.main.feels_like
      )}°C`,
      onClick: () =>
        handleModalOpen(
          `«Температура по ощущениям» учитывает поправки на ветер, влажность и даже то, яркое ли сегодня будет солнце. То есть она максимально приближена к тому, что будете чувствовать вы, выйдя на улицу. Температура по ощущениям в данном городе: ${Math.trunc(
            cityData.main.feels_like
          )}°C`
        ),
    },
    {
      text: `Видимость: ${cityData.visibility}м`,
      onClick: () =>
        handleModalOpen(
          `Характеристика прозрачности атмосферы и возможности различать зрением удалённые объекты, отделённые слоем воздуха той или иной мутности. Видимость в данном городе: ${cityData.visibility}м`
        ),
    },
    {
      text: `Время восхода: ${formattedRise}`,
      onClick: () =>
        handleModalOpen(
          `Момент появления верхнего края солнечного диска над горизонтом. Время восхода в данном городе: ${formattedRise}`
        ),
    },
    {
      text: `Время заката: ${formattedSunset}`,
      onClick: () =>
        handleModalOpen(
          `Время захода солнца определяют в астрономии как момент, когда верхний край солнечного диска исчезает за горизонтом. Время заката в данном городе: ${formattedSunset}`
        ),
    },
  ];

  return (
    <div className="animate__animated animate__fadeIn details_screen">
      <div className="details_table">
        <div>
          <h1>{cityData.name}</h1>
        </div>

        <div className="details_inf">
          {weatherInfo.map((item, index) => (
            <a key={index} onClick={item.onClick}>
              {item.text}
            </a>
          ))}
        </div>

        <div>
          <Link className="details_back" to="javascript:history.back()">
            Назад
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          content={modalContent}
          onClose={handleModalClose}
          isModalOpen={true}
        />
      )}
    </div>
  );
}

export default CityDetails;
