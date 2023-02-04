import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function createHeaders() {
	const auth = JSON.parse(localStorage.getItem('session'));
	const config = {
		headers: {
			Authorization: `Bearer ${auth.token}`,
		},
	};

	return config;
}

function logIn(body) {
	const promise = axios.post(`${BASE_URL}/auth`, body);
	return promise;
} 

function getSession() {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/auth`, config);
	return promise;
}

function getTravelById(id) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/travels/id/${id}`, config);
	return promise;
}

function getMyTravels() {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/travels/user`, config);
	return promise;
}

function getCities() {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/cities`, config);
	return promise;
}

function getFeatures() {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/features`, config);
	return promise;
}

function getFeaturesByCityId(cityId) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/features/city/${cityId}`, config);
	return promise;
}

function getFeaturesByTravelId(travelId) {
	const config = createHeaders();
	const promise = axios.get(`${BASE_URL}/features/travel/${travelId}`, config);
	return promise;
}

function publishPost(body) {
	const config = createHeaders();
	const promise = axios.post(`${BASE_URL}/posts/publish`, body, config);
	return promise;
}

export {
	logIn,
	getSession,
	getTravelById,
	getMyTravels,
	getCities,
	getFeatures,
	getFeaturesByTravelId,
	getFeaturesByCityId
};
