import { useEffect, useState } from "react"
import { getMyTravels } from "../../services/travelheadsAPI"

export default function HomePage() {
    const [ myTravels, setMyTravels ] = useState([])

    useEffect(() => {

        async function getData() {
            try {
                const myTravels = await getMyTravels();
                setMyTravels(myTravels.data)
            } catch (error) {
                console.log(error);
            }
        }

        getData();
        
    }, [])
    
    return (
        <>
        {myTravels.length === 0 ? <h6>Sem viagens ainda</h6> 
        :
        myTravels.map((travel, index) => (
        <div key={index}>
            <h6>{travel.name}</h6>
            <h6>{travel.cities.name}</h6>
        </div>
        ))}
        </>
    )
}