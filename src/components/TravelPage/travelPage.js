import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFeaturesByTravelId, getTravelById } from "../../services/travelheadsAPI";

export default function TravelPage() {
    const { travelId } = useParams();
    const [ travel, setTravel ] = useState([]);
    const [ features, setFeatures ] = useState([]);
    const [ isError, setIsError ] = useState(false);

    useEffect(() => {

        async function fetchData() {
            try {
                const travelPromise = await getTravelById(travelId);
                setTravel(travelPromise.data);                
            } catch (error) {
                setIsError(true);
            }

            try {
                const featuresPromise = await getFeaturesByTravelId(travelId);
                setFeatures(featuresPromise.data);    
            } catch (error) {
                setFeatures([]);
            }
        }


        fetchData();
    }, [])

    let travelUser, travelCity, travelCountry = "";
    if (travel.length !== 0) {
        travelUser = travel.users.name;
        travelCity = travel.cities.name;
        travelCountry = travel.cities.countries.name;
    }

    return (
        isError ?
        <h1>O fuso horário deixou a página preguiçosa, mas já estamos resolvendo isso.</h1>
        :
        <>
            <>
                <h1>{travel.name}</h1>
                <h2>{travelCity}</h2>
                <h2>{travelCountry}</h2>
                <h2>{travelUser}</h2>
            </>

            {features.length === 0 ?
            <h3>Sem atrações adicionadas.</h3>
            :
            <>
                {features.map(feature => (
                    <div key={feature.id}>
                        <h3>{feature.features.name}</h3>
                        <h3>{feature.features.type}</h3>
                        <h3>{feature.features.addresses.street}</h3>
                        <h3>{feature.features.addresses.number}</h3>
                        <h3>{feature.features.addresses.neighborhood}</h3>
                        <img src={feature.features.img} alt={feature.features.name}/>
                    </div>
                ))}
            </>}
        </>
    )
}