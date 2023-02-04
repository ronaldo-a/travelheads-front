import '../style/reset.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './AuthPage/LoginPage';
import HomePage from './HomePage/HomePage';
import PrivatePage from './AuthPage/PrivatePage';
import CityPage from './CityPage/CityPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
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

      </Routes>
    </BrowserRouter>
  )
}
