import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { logOut } from "../../services/travelheadsAPI"
import { Button } from "../../style/styledComponents"

export default function UserOptMenu() {
    const navigate = useNavigate();

    async function logout() {
        try {
            await logOut();
            localStorage.removeItem("session");
            navigate("/");
        } catch (error) {
            alert("Parece que você não está mais logado.");
        }
    }

    return (
        <MenuWrapper>
            <Button onClick={logout}>Sair</Button>
        </MenuWrapper>
    )
}

const MenuWrapper = styled.div`
    width: 150px;
    padding: 5px;
    background-color: #2c1a1d;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 68px;
    right: 40px;

    z-index: 1;
`