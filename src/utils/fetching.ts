import axios, { AxiosRequestConfig } from "axios";

export default async function fetching(
	method: string,
	url: string,
	options: AxiosRequestConfig = {}
) {
	const token = localStorage.getItem(
		`${import.meta.env.VITE_APP_NAME}-authtoken`
	);
	const headers = {
		"Content-type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	};

	options.headers = {
		...headers,
		...options.headers,
	};

	try {
		const response = await axios({
			method,
			url: `${import.meta.env.VITE_API_URL}/${url}`,
			...options,
			headers: options.headers,
		});

		return response;
	} catch (e: any) {
		return e.response;
	}
}
