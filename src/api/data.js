import axios from "axios";

const apiKey = "9fe2cfd00661376654b72ff31fea60be";
const cities = "692194,703448,706524,706483,698740,709930";

const fetchCitiesData = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/group?id=${cities}&units=metric&appid=${apiKey}`
    );
    return response.data.list;
  } catch (error) {
    throw new Error("Ошибка при загрузке данных");
  }
};

export { fetchCitiesData };
