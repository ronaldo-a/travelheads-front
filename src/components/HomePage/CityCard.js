import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import { WrapperBase } from "../../style/styledComponents";

export default function CityCard({city}) {
    const navigate = useNavigate();

    return (
        <Wrapper onClick={() => navigate(`/cityPage/${city.id}`)}>
                <img src={city.img} alt={city.name}/>
                <WrapperBase>
                    <h6>{city.name}</h6>
                    <p>{city.country}</p>
                </WrapperBase>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 230px;
    height: 290px;
    box-sizing: border-box;
    margin-right: 25px;

    img {
        width: 230px;
        height: 214px;
        object-fit: cover;
    }

    :hover {
        cursor: pointer;
    }
`