<script context="module" lang="ts">
	import { page } from '$app/stores';
	import { exchange, isError } from '$lib/oauth';
	import { get } from 'svelte/store';

	export async function load({ params, url }) {
		const error = url.searchParams.get('error');
		const code = url.searchParams.get('code');

		if (error != null) {
			return {
				props: {
					error: error,
					code: code
				}
			};
		} else {
			let response = await exchange(code);
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
				redirect: '/'
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
