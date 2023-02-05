import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFeaturesByCityId } from "../../services/travelheadsAPI";

export default function CityPage() {
    const { cityId } = useParams();
    const [ cityFeatures, setCityFeatures ] = useState([]);
    const [ isError, setIsError ] = useState(false);

    useEffect(() => {

        async function fetchData() {
            try {
                const featuresPromise = await getFeaturesByCityId(cityId);
                setCityFeatures(featuresPromise.data);     
            } catch (error) {
                setIsError(true);
            }
        }

        fetchData()
    }, []);

    let cityName, countryName = "";
    if (cityFeatures.length !== 0) {
        cityName = cityFeatures[0].addresses.cities.name;
        countryName = cityFeatures[0].addresses.cities.countries.name; 
    }

    return (
        isError ?
        <h1>O fuso horário deixou a página preguiçosa, mas já estamos resolvendo isso.</h1>
        :
        cityFeatures.length === 0 ?
        <h1>Carregando</h1>
        :
        <div>    
        <img src={cityFeatures[0].img} alt="city feature" />
        <h1>{cityName}</h1>
        <h2>{countryName}</h2>
        <>
            {
                cityFeatures.map(feature => (
                    <div key={feature.id}>
                        <h3>{feature.name}</h3>
                        <img src={feature.img} alt={feature.name}/>
                        <h3>R$ {(feature.price/100).toFixed(2).replace(".", ",")}</h3>
                        <h3>{(feature.type).charAt(0).toUpperCase() + (feature.type).slice(1)}</h3>
                    </div>
                ))
            }
        </>
        </div>
    )
}