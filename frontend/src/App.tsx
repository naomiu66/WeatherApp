import "./index.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherPage from "./pages/WeatherPage";

function App() {
  return <BrowserRouter>
    {/* <PatternBackground /> */}
    <Routes>
      <Route path="/" element={<WeatherPage />}/>
    </Routes>
  </BrowserRouter>;
}

export default App;
