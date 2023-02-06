import '../style/reset.css';
import '../style/fonts.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './AuthPage/LoginPage';
import HomePage from './HomePage/HomePage';
import PrivatePage from './AuthPage/PrivatePage';
import CityPage from './CityPage/CityPage';
import TravelPage from './TravelPage/travelPage';
import RegistrationPage from './AuthPage/RegistrationPage';

export default function App() {
  return (
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
  )
}
