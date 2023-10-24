import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityList from "./components/CityList";
import CityDetails from "./components/CityDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/city/:index" element={<CityDetails />} />
          <Route path="/weather-app-react" element={<CityList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
