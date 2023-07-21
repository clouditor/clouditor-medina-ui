import { listPublicCertificates } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({}) {
	return listPublicCertificates()
		.then((certificates) => {
			return {
				certificates: certificates
			};
		})
		.catch(() => {
			console.error("error listPublicCertificates")
			redirectLogin('/cloud');
		});
}
