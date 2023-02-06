import { useNavigate } from "react-router-dom"
import styled from "styled-components";

export default function MyTravelCard({travel}) {
    const navigate = useNavigate();

    return (
        <Wrapper onClick={() => {navigate(`/travelPage/${travel.id}`)}}>
                    <h6>{travel.name}</h6>
                    <h6>{travel.cities.name}</h6>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width: 230px;
    height: 290px;

    img {
        width: 230px;
        height: 214px;
    }
`