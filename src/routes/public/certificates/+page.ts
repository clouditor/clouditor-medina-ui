import { listPublicCertificates } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ params, fetch, context }) {
	return listPublicCertificates()
		.then((certificates) => {
			return {
				certificates: certificates
			};
		})
		.catch(() => {
			redirectLogin('/public/certificates');
		});
}
