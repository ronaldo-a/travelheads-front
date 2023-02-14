import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFeaturesByTravelId, getTravelById } from "../../services/travelheadsAPI";
import { Button, Page, PageTop, SectionWrapper } from "../../style/styledComponents";
import styled from "styled-components";
import Header from "../HomePage/Header";
import AddFeatureCard from "./AddFeatureCard";
import FeatureCard from "./FeatureCard";

export default function TravelPage() {
    const { travelId } = useParams();
    const [ travel, setTravel ] = useState([]);
    const [ features, setFeatures ] = useState([]);
    const [ isError, setIsError ] = useState(false);
    const [ showAddFeature, setShowAddFeature ] = useState(false);

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
    }, [showAddFeature])

    let travelUser, travelCity, travelCountry = "";
    if (travel.length !== 0) {
        travelUser = travel.users.name;
        travelCity = travel.cities.name;
        travelCountry = travel.cities.countries.name;
    }

    return (
        isError ?
        <Page>
            <Header />
            <h1>O fuso horário deixou a página preguiçosa, mas já estamos resolvendo isso.</h1>
        </Page>  
        :
        <Page>
            <Header />
            <TravelPageTop>
                <img src={features[0]?.features.img} alt={features[0]?.features.name}/>
                <h6>{travel.name}</h6>
                <p>{travelCity}, {travelCountry}</p>
                <p className="user">{travelUser}</p>
            </TravelPageTop>

            {features.length === 0 ?
            <>
                <h3>Sem atrações adicionadas.</h3>
                <Button onClick={() => setShowAddFeature(true)}>Adicionar atração</Button>
                <AddFeatureCard travelId={travelId} setShowAddFeature={setShowAddFeature}/>
            </>
            :
            <SectionWrapper>
                {features.map(feature => (
                    <FeatureCard key={feature.id} feature={feature}/>
                ))}
                <Button onClick={() => setShowAddFeature(true)}>Adicionar atração</Button>
                {showAddFeature && <AddFeatureCard travelId={travelId} setShowAddFeature={setShowAddFeature}/>}
            </SectionWrapper>}
        </Page>
    )
}

const TravelPageTop = styled(PageTop)`
    .user {
        position: absolute;
        left: 400px;
        bottom: 63px;
    }
`