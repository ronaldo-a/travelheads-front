import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { insertUser } from "../../services/travelheadsAPI";

export default function RegistrationPage() {
    const [form, setForm] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();

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
        <>
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
                <button type="submit" disabled={isButtonDisabled}>Cadastrar</button>
            </form>
            <Link to="/">
				<h1>Já tem uma conta? Voltar para login.</h1>
			</Link>
        </>
    )
}