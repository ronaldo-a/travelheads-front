import styled from "styled-components";
import { WrapperBase } from "../../style/styledComponents";

export default function FeatureCard({feature}) {

    return (
        <Wrapper>
                    <img src={feature.features.img} alt={feature.features.name}/>
                    <WrapperBase>
                        <h6>{feature.features.name}</h6>
                        <p>{(feature.features.type).charAt(0).toUpperCase() + (feature.features.type).slice(1)}</p>
                        <p>{feature.features.addresses.street}, {feature.features.addresses.number}, {feature.features.addresses.neighborhood}</p>
                        <p>R$ {(feature.features.price/100).toFixed(2).replace(".", ",")}</p>
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
        object-fit: cover;
    }
`