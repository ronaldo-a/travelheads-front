import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../services/travelheadsAPI.js';
import { getRandomPhoto } from '../../style/getUnsplashImages.js';
import { Box, Button, Link, TextField } from '@mui/material';


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
			<Box component="form" onSubmit={sendForm} autoComplete="off"
			sx={{ width: "400px", height:"300px", display: "flex", flexDirection: "column", 
				justifyContent: "space-evenly",
				alignItems: "center",
				bgcolor: "white",
				p: "20px",
				borderRadius: "5px",
				boxShadow: "1px 1px 10px 1px black"
      		}}>
					<TextField
						variant="outlined"
						name="email"
						type="email"
						label="E-mail"
						required
						onChange={handleForm}
						disabled={isButtonDisabled ? true : false}
						fullWidth
					/>
					<TextField
						name="password"
						type="password"
						label="Senha"
						required
						onChange={handleForm}
						disabled={isButtonDisabled ? true : false}
						fullWidth
					/>
					<Button variant="contained" name="login" type="submit" disabled={isButtonDisabled}>
						Login
					</Button>
					<Link component={RouterLink} to="/registrate" sx={{textDecoration: "none", color: "black"}}>
						First time? Create an account!
					</Link>
			</Box>
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
	justify-content: center;
	align-items: center;
	background-image: ${(props) => `url(${props.unsplashData.photoUrl})`};
	background-size: cover;
  	overflow: hidden;
	position: relative;

	/* a {
		text-decoration: none;
		color: inherit;
		margin-top: 35px;
	} */

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

