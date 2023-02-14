import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../services/travelheadsAPI.js';
import { Button, Form } from '../../style/styledComponents.js';
import { getRandomPhoto } from '../../style/getUnsplashImages.js';

export default function LoginPage() {
	const [form, setForm] = useState({});
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [ unsplashData, setUnsplashData ] = useState(null);
	const navigate = useNavigate();
	const data = localStorage.getItem('session');

	useEffect(() => {
		if (data) {
			navigate('/home');
			return;
		}

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

	}, [data, navigate]);

	function handleForm(event) {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	}

	async function sendForm(event) {
		event.preventDefault();
		setIsButtonDisabled(true)
		
		try {
            const promise = await logIn(form);
            const serializedSession = JSON.stringify(promise.data);
			localStorage.setItem('session', serializedSession);
			setIsButtonDisabled(false);
			navigate('/home');
        } catch (error) {
            if (error.response.status === 401) {
                alert('E-mail ou senha incorretos');
            } else {
                alert(error.response.data);
            }
            setIsButtonDisabled(false);
        }
	}

	return (
		unsplashData ? 
		<MainPageContent unsplashData={unsplashData}>
			<Form>
				<form onSubmit={sendForm}>
					<input
						name="email"
						type="text"
						placeholder="E-mail"
						required
						onChange={handleForm}
						disabled={isButtonDisabled ? true : false}
					/>
					<input
						name="password"
						type="password"
						placeholder="Password"
						required
						onChange={handleForm}
						disabled={isButtonDisabled ? true : false}
					/>
					<Button name="login" type="submit" disabled={isButtonDisabled}>
						log in
					</Button>
					<Link to="/registrate">
						<h1>First time? Create an account!</h1>
					</Link>
				</form>
			</Form>
			<PhotoInfo>
				<a href={unsplashData.photoAuthorLink} target="_blank" rel="noreferrer"><p>{unsplashData.photoAuthorName} @ unsplash</p></a>
			</PhotoInfo>
		</MainPageContent>
		:
		<h1>Deu erro</h1>
	);
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

