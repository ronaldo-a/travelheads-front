import { useEffect, useState } from "react"
import styled from "styled-components";
import { getCities, getFeatures, getMyTravels } from "../../services/travelheadsAPI"
import AddTravelCard from "./addTravelCard";
import CityCard from "./CityCard";
import MyTravelCard from "./MyTravelCard";
import { Page, SectionWrapper, CardsRow, SectionTitle, SectionEmptyTitle, Button } from "../../style/styledComponents";
import Header from "./Header";

export default function HomePage() {
    const [ myTravels, setMyTravels ] = useState([]);
    console.log("aquiii")
    const [ cities, setCities ] = useState([]);
    const [ features, setFeatures ] = useState([]);
    const [ isError, setIsError ] = useState(false);
    const [ showAddTravel, setShowAddTravel ] = useState(false);

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
    const MyTravelsWithImage = [];

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

    for (let s = 0; s < myTravels.length; s++) {
        MyTravelsWithImage.push(
            {
                id: myTravels[s].id,
                name: myTravels[s].name,
                cityName: myTravels[s].cities.name,
                img: featuresHash[myTravels[s].cities.name]
            });
    }
    
    return (
        showAddTravel === false ? 
        <Page>
            <Header />
            <CitiesSection>
                <SectionTitle>Quer conhecer uma nova cidade?</SectionTitle>

                {cities.length === 0 ? 
                <SectionEmptyTitle>Novas cidades em breve</SectionEmptyTitle>
                :
                <CardsRow>
                    {citiesWithImage.map(city => <CityCard city={city} key={city.id}/> )}
                </CardsRow>
                }
            </CitiesSection>
            <TravelsSection>
                <SectionTitle>Minhas viagens</SectionTitle>
                {MyTravelsWithImage.length === 0 ? <SectionEmptyTitle>Sem viagens ainda</SectionEmptyTitle> 
                :
                <CardsRow>
                    {MyTravelsWithImage.map(travel => <MyTravelCard travel={travel} key={travel.id}/>)}
                </CardsRow>
                }
                <Button onClick={() => setShowAddTravel(true)}>Adicionar viagem</Button>    
            </TravelsSection>
        </Page>
        :
        <>
            <AddTravelCard setShowAddTravel={setShowAddTravel}/>
            <>
                <Page>
                    <Header />
                    <CitiesSection>
                        <SectionTitle>Quer conhecer uma nova cidade?</SectionTitle>

                        {cities.length === 0 ? 
                        <SectionEmptyTitle>Novas cidades em breve</SectionEmptyTitle>
                        :
                        <CardsRow>
                            {citiesWithImage.map(city => <CityCard city={city} key={city.id}/> )}
                        </CardsRow>
                        }
                    </CitiesSection>
                    <TravelsSection>
                        <SectionTitle>Minhas viagens</SectionTitle>
                        {myTravels.length === 0 ? <SectionEmptyTitle>Sem viagens ainda</SectionEmptyTitle> 
                        :
                        <CardsRow>
                            {myTravels.map(travel => <MyTravelCard travel={travel} key={travel.id}/>)}
                        </CardsRow>
                        }
                        <Button onClick={() => setShowAddTravel(true)}>Adicionar viagem</Button>    
                    </TravelsSection>
                </Page>
            </>
        </>
    )
}

const CitiesSection = styled(SectionWrapper)`
    background-color: #dbb3b1;
`
const TravelsSection = styled(SectionWrapper)`
    background-color: #dbb3b1;
`