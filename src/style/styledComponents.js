import styled from "styled-components";

const CardWrapper = styled.span`
    img {
        width: 230px;
        height: 214px;
        object-fit: cover;
    }
`
const Page = styled.section`
    display: flex;
    flex-direction: column;
    //justify-content: space-around;
    //background-image: url("https://t3.ftcdn.net/jpg/03/86/95/88/360_F_386958876_5R6bb6GFGiyRMSlkhsmKKqMcNdcnlygh.jpg");
    //background-repeat: no-repeat;
    background-color: #c89fa3;
`
const SectionWrapper = styled.section`
    padding: 30px 30px;
    margin-bottom: 25px;
    //background:
    //linear-gradient(
    //  rgba(256,256,256,.5),rgba(256,256,256,.5)
    //),
    //url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/health-benefits-of-beach-water-1595451130.jpg) no-repeat;
    //background-image: url("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/health-benefits-of-beach-water-1595451130.jpg");
    background-color: #c89fa3;
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
const PageTop = styled.div`
    width: 100vw;
    height: 200px;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h6 {
        font-family: 'Alegreya Sans', sans-serif;
        font-size: 50px;
        font-weight: 700;
        line-height: 17px;
        color: white;
        position: absolute;
        left: 15px;
        bottom: 70px;
    }

    p {
        font-family: 'Alegreya Sans', sans-serif;
        font-size: 30px;
        font-weight: 400;
        line-height: 17px;
        color: #4B4B4B;
        position: absolute;
        left: 15px;
        bottom: 30px;
        text-shadow: 1px 1px 3px white;
    }
`
const Form = styled.div`
    padding: 30px;
    background-color: white;
    box-shadow: 2px 2px 5px black;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    form {
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
            margin-bottom: 15px;

            height: 30px;
            width: 400px;

            font-family: 'Alegreya Sans', sans-serif;
            font-size: 20px;
            font-weight: 700;
            line-height: 17px;
            color: black;        
        }
    }
`
export { Page, SectionWrapper, CardsRow, SectionTitle, SectionEmptyTitle, Button, WrapperBase, PageTop, Form, CardWrapper };