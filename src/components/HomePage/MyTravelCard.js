import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import { WrapperBase } from "../../style/styledComponents";

export default function MyTravelCard({travel}) {
    const navigate = useNavigate();

    return (
        <Wrapper onClick={() => {navigate(`/travelPage/${travel.id}`)}}>
                    <img src={travel.img} alt={travel.name}/>
                    <WrapperBase>
                        <h6>{travel.name}</h6>
                        <p>{travel.cityName}</p>
                    </WrapperBase>
                    
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