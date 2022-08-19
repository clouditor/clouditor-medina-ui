import { listCertificates } from '$lib/orchestrator';
import type { Certificate } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ params, fetch, context }) {
	return listCertificates()
		.then((certificates) => {
			return {
				certificates: certificates
			};
		})
		.catch(() => {
			redirectLogin('/certificates');
		});
}
