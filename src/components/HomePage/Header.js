import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SlMenu } from "react-icons/sl";
import { getUserById } from "../../services/travelheadsAPI";
import UserOptMenu from "./UserOptMenu";

export default function Header() {
    const [ userName, setUserName ] = useState("");
    const [ userImg, setUserImg ] = useState("");
    const [ showUserOpt, setShowUserOpt ] = useState(false);
    console.log(showUserOpt)
    const navigate = useNavigate();

    useEffect(() => {
        
        async function fetchData() {
            try {
                const user = await getUserById();
                setUserName(user.data.name);
                setUserImg(user.data.img);
            } catch (error) {
                setUserName("Anônimo");
                setUserImg("http://www.meupositivo.com.br/doseujeito/wp-content/uploads/2020/02/navegacao-em-modo-anonimo.jpg")
            }
        }

        fetchData()
    }, [])

    return (
        <HeaderWrapper>
            <AppTitle onClick={() => navigate("/home")}>TravelHeads</AppTitle>
            <UserInfo>
                <p>{userName}</p>
                <img src={userImg} alt={userName} />
                <SlMenu className="react-icons" onClick={() => setShowUserOpt(!showUserOpt)}/>
            </UserInfo>
            {showUserOpt && <UserOptMenu setShowUserOpt={setShowUserOpt}/>}
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    height: 68px;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    position: relative;

    display: flex;
    align-items: center;
    //background: rgba(255, 255, 255, 0.8);
    background-color: #6c534e;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
`
const AppTitle = styled.h1`
    position: absolute;
    left: 40%;
    top: 0;

    font-family: 'Abril Fatface', cursive;
    font-size: 48px;
    font-weight: 400;
    line-height: 65px;
    color: #2c1a1d;

    :hover {
        cursor: pointer;
    }
`
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    right: 50px;

    p {
        font-family: 'Alegreya Sans', sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 17px;
        color: #4B4B4B;
    }

    img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 15px;
    }

    .react-icons {
        color: red;
    }
`