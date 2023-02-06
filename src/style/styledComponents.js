import styled from "styled-components";

const Page = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-image: url("https://t3.ftcdn.net/jpg/03/86/95/88/360_F_386958876_5R6bb6GFGiyRMSlkhsmKKqMcNdcnlygh.jpg");
    //background-repeat: no-repeat;
`
const SectionWrapper = styled.section`
    padding: 30px 30px;
    margin-bottom: 25px;
    background:
    linear-gradient(
      rgba(256,256,256,.5),rgba(256,256,256,.5)
    ),
    url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/health-benefits-of-beach-water-1595451130.jpg) no-repeat;
    //background-image: url("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/health-benefits-of-beach-water-1595451130.jpg");
    
`
const CardsRow = styled.div`
    display: flex;
    justify-content: space-around;
`
const SectionTitle = styled.h2`
    font-family: 'Alegreya Sans', sans-serif;
    font-size: 30px;
    font-weight: 700;
    color: black;
    margin-bottom: 10px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const SectionEmptyTitle = styled(SectionTitle)`
    font-weight: 400;
`
const Button = styled.button`
    width: 107px;
    height: 24px;
    background-color: #007B83;
    border: 1px #FFFFFF;
    border-radius: 5px;
    padding: 0;

    font-family: 'Alegreya Sans', sans-serif;
    font-size: 12px;
    font-weight: 400;
    color: #FFFFFF;

    :hover {
        cursor: pointer;
    }
`

export { Page, SectionWrapper, CardsRow, SectionTitle, SectionEmptyTitle, Button };