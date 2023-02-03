import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getSession } from '../../services/travelheadsAPI';

export default function PrivatePage({ children }) {
	const [isAllowed, setIsAllowed] = useState(undefined);

	useEffect(() => {
		const data = localStorage.getItem('session');
		if (!data) {
			setIsAllowed(false);
			return;
		}

		async function fetchData() {
			try {
				await getSession();
				setIsAllowed(true);
			} catch (error) {
				localStorage.clear()
				alert(
					'Your login credentials is expired or invalid.\nPlease, sign-in again'
				);
				setIsAllowed(false);
			}
		}

		fetchData();
	}, []);

	if (isAllowed === undefined) {
		return;
	}

	return isAllowed === false ? 
	( <Navigate to="/" replace /> ) : ( <> {children} </>);
}
