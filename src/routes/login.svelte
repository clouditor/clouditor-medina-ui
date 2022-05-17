<script context="module" lang="ts">
	import { generateChallenge, generateVerifier, redirectLogin } from '$lib/oauth';

	let url: string;

	export async function load({ session }) {
		const { user } = session;

		if (!user) {
			return redirectLogin();
		}

		return {};
	}
</script>
