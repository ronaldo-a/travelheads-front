import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { insertUser } from "../../services/travelheadsAPI";
import { getRandomPhoto } from "../../style/getUnsplashImages";
import { Button, Form } from "../../style/styledComponents";

export default function RegistrationPage() {
    const [form, setForm] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [ unsplashData, setUnsplashData ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

		async function getBackgroundPhoto() {
			try {
				const photo = await getRandomPhoto();
				setUnsplashData(photo);
			} catch (error) {
				console.log(error)
				setUnsplashData(error.message);
			}
		}

		getBackgroundPhoto();

	}, []);

    function handleForm(event) {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	}

    async function sendForm(event) {
		event.preventDefault();
		setIsButtonDisabled(true)

        if (form.password !== form.password2) {
            alert("As senhas digitas são diferentes.");
            return
        }

        delete form.password2;
		
		try {
            await insertUser(form);
			setIsButtonDisabled(false);
            navigate("/");
        } catch (error) {
            setIsButtonDisabled(false);
            if (error.response.status === 400) {
                alert('Favor rever informações');
            } else {
                alert('Favor tentar novamente mais tarde');
            }
            setIsButtonDisabled(false);
        }
	}

    return (
        unsplashData ? 
        <MainPageContent unsplashData={unsplashData} >
            <Form>
                <form onSubmit={sendForm}>
                    <input name="name"
                            type="text"
                            placeholder="Nome"
                            required
                            disabled={isButtonDisabled ? true : false}
                            onChange={handleForm} />
                    <input name="email"
                            type="email"
                            placeholder="E-mail"
                            required
                            disabled={isButtonDisabled ? true : false}
                            onChange={handleForm} />
                    <input  name="img"
                            type="text"
                            placeholder="Foto"
                            required
                            disabled={isButtonDisabled ? true : false}
                            onChange={handleForm} />
                    <input  name="password"
                            type="password"
                            min={8}
                            placeholder="Senha"
                            required
                            disabled={isButtonDisabled ? true : false}
                            onChange={handleForm} />
                    <input  name="password2"
                            type="password"
                            placeholder="Digite a senha novamente"
                            required
                            disabled={isButtonDisabled ? true : false}
                            onChange={handleForm} />         
                    <Button type="submit" disabled={isButtonDisabled}>Cadastrar</Button>
                </form>
                <Link to="/">
                    <h1>Já tem uma conta? Voltar para login.</h1>
                </Link>
                </Form>
                <PhotoInfo>
                    <a href={unsplashData.photoAuthorLink} target="_blank" rel="noreferrer"><p>{unsplashData.photoAuthorName} @ unsplash</p></a>
                </PhotoInfo>
        </MainPageContent>
        :
        <h1>Deu erro</h1>
    )
}

const MainPageContent = styled.div`
	height: 100vh;
	display: flex;
	background-image: ${(props) => `url(${props.unsplashData.photoUrl})`};
	background-size: cover;
  	overflow: hidden;
	position: relative;

	a {
		text-decoration: none;
		color: inherit;
		margin-top: 35px;
	}

	@media (max-width: 635px) {
		display: flex;
		flex-direction: column;
	}
`;

const PhotoInfo = styled.div`
	position: absolute;
	bottom: 40px;
	right: 50px;

	a {
		font-family: 'Alegreya Sans', sans-serif;
        font-size: 15px;
        font-weight: 400;
        line-height: 17px;
    	color: white;
		text-shadow: 2px 2px 2px black;
	}
`