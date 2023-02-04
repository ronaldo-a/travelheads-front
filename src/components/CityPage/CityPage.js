import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFeaturesByCityId } from "../../services/travelheadsAPI";

export default function CityPage() {
    const { cityId } = useParams();
    const [ cityFeatures, setCityFeatures ] = useState([]);

    useEffect(() => {

        async function fetchData() {
            try {
                const featuresPromise = await getFeaturesByCityId(cityId);
                setCityFeatures(featuresPromise.data);     
            } catch (error) {
                setCityFeatures([{name: "Não encontramos as atrações. Já consertaremos isso."}]);
            }
        }

        fetchData()
    }, []);

    let cityName, countryName = "";
    console.log(cityFeatures)
    if (cityFeatures.length !== 0) {
        cityName = cityFeatures[0].addresses.cities.name;
        countryName = cityFeatures[0].addresses.cities.countries.name; 
    }

    return (
        <>
            {cityFeatures.length === 0 ? 
            <h1>Ops! Muitas reformas na cidade, mas já estamos resolvendo isso.</h1>
            :
            <>    
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
            </>
            }
        </>
    )
}