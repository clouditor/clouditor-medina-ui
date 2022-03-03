<script context="module" lang="ts">
	import { generateChallenge, generateVerifier } from '$lib/oauth';

	let url: string;

	const AUTH_URL = 'http://localhost:8000/authorize';
	const CLIENT_ID = 'public';
	const REDIRECT_URI = 'http://localhost:3000/callback';

	export async function load({ session }) {
		const { user } = session;

		if (!user) {
			// generate a new verifier
			const v = generateVerifier();

			localStorage.setItem('verifier', v);

			const challenge = await generateChallenge(v);

			url = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
				REDIRECT_URI
			)}&code_challenge=${challenge}&code_challenge_method=S256`;

			return {
				status: 302,
				redirect: url
			};
		}

		return {};
	}
</script>

<script>
</script>
