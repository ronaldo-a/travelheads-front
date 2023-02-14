import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFeaturesByCityId } from "../../services/travelheadsAPI";
import { CardsRow, Page, PageTop, SectionWrapper } from "../../style/styledComponents";
import Header from "../HomePage/Header";
import FeatureCard from "./FeatureCard";

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
        <Page>
            <Header />
            <h1>O fuso horário deixou a página preguiçosa, mas já estamos resolvendo isso.</h1>
        </Page>
        :
        cityFeatures.length === 0 ?
        <Page>
            <Header />
            <h1>Carregando</h1>
        </Page>
        :
        <Page>
            <Header />
            <PageTop>
                <img src={cityFeatures[0].img} alt="city feature" />
                <h6>{cityName}</h6>
                <p>{countryName}</p>
            </PageTop>    
            <SectionWrapper>
            <CardsRow>
                {
                    cityFeatures.map(feature => (
                        <FeatureCard key={feature.id} feature={feature}/>
                    ))
                }
            </CardsRow>
            </SectionWrapper>
        </Page>
    )
}

