import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getCities, getFeatures, getMyTravels } from "../../services/travelheadsAPI"
import AddTravelCard from "./addTravelCard";

export default function HomePage() {
    const [ myTravels, setMyTravels ] = useState([]);
    const [ cities, setCities ] = useState([]);
    const [ features, setFeatures ] = useState([]);
    const [ isError, setIsError ] = useState(false);
    const [ showAddTravel, setShowAddTravel ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        async function getData() {
            try {
                const myTravels = await getMyTravels();
                setMyTravels(myTravels.data);
            } catch (error) {
                setIsError(true);
            }
        
            try {
                const featuresPromisse = await getFeatures();
                setFeatures(featuresPromisse.data);

                const citiesPromisse = await getCities();
                setCities(citiesPromisse.data);
            } catch (error) {
                setIsError(true);
            }
        }

        getData();    
    }, [showAddTravel]);

    const featuresHash = {};
    const citiesWithImage = [];

    for (let i=0; i < features.length; i++) {
        featuresHash[features[i].addresses.cities.name] = features[i].img; 
    }

    for (let j = 0; j < cities.length; j++) {
        citiesWithImage.push( 
        {
            id: cities[j].id, 
            name: cities[j].name, 
            country: cities[j].countries.name,
            img: featuresHash[cities[j].name]
        });
    }
    
    return (
        isError ? 
        <h1>O fuso horário deixou a página preguiçosa, mas já estamos consertando isso.</h1>
        :
        showAddTravel === false ? 
        <>
            <div>
                <h3>Minhas viagens</h3>
                    {myTravels.length === 0 ? <h6>Sem viagens ainda</h6> 
                    :
                    myTravels.map(travel => (
                        <div key={travel.id} onClick={() => {navigate(`/travelPage/${travel.id}`)}}>
                            <h6>{travel.name}</h6>
                            <h6>{travel.cities.name}</h6>
                        </div>
                    ))}
                <button onClick={() => setShowAddTravel(true)}>Adicionar viagem</button>    
            </div>
            <div>
                <h3>Quer conhecer uma nova cidade?</h3>
                {cities.length === 0 ? 
                
                <h6>Novas cidades em breve</h6>
                :
                <>
                {citiesWithImage.map(city => (
                    <div key={city.id} onClick={() => navigate(`/cityPage/${city.id}`)}>
                        <h6>{city.name}</h6>
                        <h6>{city.country}</h6>
                        <img src={city.img} alt={city.name}/>
                    </div>
                ))}
                </>
                }
            </div>
        </>
        :
        <>
        <AddTravelCard setShowAddTravel={setShowAddTravel}/>
        <>
            <div>
                <h3>Minhas viagens</h3>
                    {myTravels.length === 0 ? <h6>Sem viagens ainda</h6> 
                    :
                    myTravels.map(travel => (
                        <div key={travel.id} onClick={() => {navigate(`/travelPage/${travel.id}`)}}>
                            <h6>{travel.name}</h6>
                            <h6>{travel.cities.name}</h6>
                        </div>
                    ))}
                <button onClick={() => setShowAddTravel(true)}>Adicionar viagem</button>    
            </div>
            <div>
                <h3>Quer conhecer uma nova cidade?</h3>
                {cities.length === 0 ? 
                
                <h6>Novas cidades em breve</h6>
                :
                <>
                {citiesWithImage.map(city => (
                    <div key={city.id} onClick={() => navigate(`/cityPage/${city.id}`)}>
                        <h6>{city.name}</h6>
                        <h6>{city.country}</h6>
                        <img src={city.img} alt={city.name}/>
                    </div>
                ))}
                </>
                }
            </div>
            </>
        </>
    )
}