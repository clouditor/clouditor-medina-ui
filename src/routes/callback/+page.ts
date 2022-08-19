import { redirect } from '@sveltejs/kit';
import { exchange, isError } from '$lib/oauth';

export async function load({ params, url }) {
	const error = url.searchParams.get('error');
	const code = url.searchParams.get('code');
	const sessionCode = url.searchParams.get('session_state');

	if (error != null) {
		return {
			error: error,
			code: code
		};
	} else {
		const response = await exchange(code, sessionCode);
		if (isError(response)) {
			return {
				error: response.error
			};
		}

		// store token
		localStorage.token = response.access_token;

		// exchange token
		throw redirect(302, localStorage.backTo ?? '/');
	}
}
