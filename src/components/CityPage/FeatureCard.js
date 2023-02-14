import styled from "styled-components";
import { WrapperBase } from "../../style/styledComponents";

export default function FeatureCard({feature}) {

    return (
        <Wrapper>
                <img src={feature.img} alt={feature.name}/>
                <WrapperBase>
                    <h6>{feature.name}</h6>
                    <p>R$ {(feature.price/100).toFixed(2).replace(".", ",")}</p>
                    <p>{(feature.type).charAt(0).toUpperCase() + (feature.type).slice(1)}</p>
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