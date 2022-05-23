<script context="module" lang="ts">
	import { exchange, isError } from '$lib/oauth';

	export async function load({ params, url }) {
		const error = url.searchParams.get('error');
		const code = url.searchParams.get('code');
		const sessionCode = url.searchParams.get('session_state');

		if (error != null) {
			return {
				props: {
					error: error,
					code: code
				}
			};
		} else {
			let response = await exchange(code, sessionCode);
			if (isError(response)) {
				return {
					props: {
						error: response.error
					}
				};
			}

			// store token
			localStorage.token = response.access_token;

			// exchange token
			return {
				status: 302,
				redirect: localStorage.backTo ?? '/'
			};
		}
	}
</script>

<script lang="ts">
	export let error: string;
	export let message: string;
</script>

{error}

{message}
