import { useState } from "react";
import { insertTravel } from "../../services/travelheadsAPI";

export default function AddTravelCard({setShowAddTravel}) {
    const [form, setForm] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
            await insertTravel(form);
			setIsButtonDisabled(false);
			setShowAddTravel(false);
        } catch (error) {
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
                        placeholder="Apelido da viagem"
                        disabled={isButtonDisabled ? true : false}
                        onChange={handleForm} />
                <input name="cityName"
                        type="text"
                        placeholder="Cidade"
                        disabled={isButtonDisabled ? true : false}
                        onChange={handleForm} />
                <input  name="countryName"
                        type="text"
                        placeholder="País"
                        disabled={isButtonDisabled ? true : false}
                        onChange={handleForm} />
                <button name="addTravel" type="submit" disabled={isButtonDisabled}>Adicionar viagem</button>
            </form>
            <button onClick={() => setShowAddTravel(false)}>Cancelar</button>
        </>
    )
}