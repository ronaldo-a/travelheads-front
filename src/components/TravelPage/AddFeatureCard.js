import { useState } from "react";
import { insertFeature } from "../../services/travelheadsAPI";
import { Button, Form } from "../../style/styledComponents";

export default function AddFeatureCard({travelId, setShowAddFeature}) {
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

        const formatedPrice = (form.price)*100;
        const featureData = {name: form.name, type: form.type, price: formatedPrice, img: form.img};

        const addressData = {street: form.street, number: form.number, neighborhood: form.neighborhood};

        const featureBody = {featureData, addressData, travelId};
		
		try {
            await insertFeature(featureBody);
			setIsButtonDisabled(false);
			setShowAddFeature(false);
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
        <Form show={setShowAddFeature}>
            <form onSubmit={sendForm}>
                <input name="name"
                        type="text"
                        placeholder="Nome da atração"
                        disabled={isButtonDisabled ? true : false}
                        onChange={handleForm} />
                <input name="type"
                        type="text"
                        placeholder="Tipo da atração"
                        disabled={isButtonDisabled ? true : false}
                        onChange={handleForm} />
                <input  name="price"
                        type="number"
                        placeholder="Preço"
                        disabled={isButtonDisabled ? true : false}
                        onChange={handleForm} />
                <input  name="img"
                        type="text"
                        placeholder="Foto"
                        disabled={isButtonDisabled ? true : false}
                        onChange={handleForm} />
                <input  name="street"
                        type="text"
                        placeholder="Rua"
                        disabled={isButtonDisabled ? true : false}
                        onChange={handleForm} />
                <input  name="number"
                        type="text"
                        placeholder="Número"
                        disabled={isButtonDisabled ? true : false}
                        onChange={handleForm} />
                <input  name="neighborhood"
                        type="text"
                        placeholder="Bairro"
                        disabled={isButtonDisabled ? true : false}
                        onChange={handleForm} />              
                <Button name="addTravel" type="submit" disabled={isButtonDisabled}>Adicionar viagem</Button>
            </form>
            <Button onClick={() => setShowAddFeature(false)}>Cancelar</Button>
        </Form>
    )
}

