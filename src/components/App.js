import '../style/reset.css';
import '../style/fonts.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IconContext } from "react-icons";
import LoginPage from './AuthPage/LoginPage';
import HomePage from './HomePage/HomePage';
import PrivatePage from './AuthPage/PrivatePage';
import CityPage from './CityPage/CityPage';
import TravelPage from './TravelPage/travelPage';
import RegistrationPage from './AuthPage/RegistrationPage';

export default function App() {
  return (
	<IconContext.Provider value={{ color: "#2c1a1d", size: "20px", className: "react-icons"}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
		<Route path="/registrate" element={<RegistrationPage />} />
        
        <Route path="/home"
						element={
							<PrivatePage >
								<HomePage />
							</PrivatePage>
						}/>

        <Route path="/cityPage/:cityId"
						element={
							<PrivatePage >
								<CityPage />
							</PrivatePage>
						}/>

        <Route path="/travelPage/:travelId"
						element={
							<PrivatePage >
								<TravelPage />
							</PrivatePage>
						}/>

      </Routes>
    </BrowserRouter>
	</IconContext.Provider>
  )
}
