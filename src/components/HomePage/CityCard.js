import { useNavigate } from "react-router-dom"
import styled from "styled-components";

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

const WrapperBase = styled.div`
    height: 76px;
    background-color: rgb(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 15px;

    h6 {
        font-family: 'Alegreya Sans', sans-serif;
        font-size: 20px;
        font-weight: 700;
        line-height: 17px;
        color: black;
        margin-bottom: 5px;
    }

    p {
        font-family: 'Alegreya Sans', sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 17px;
        color: #4B4B4B;
    }
`