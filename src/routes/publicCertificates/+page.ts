import { listPublicCertificates } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({  }) {
	return listPublicCertificates()
		.then((publicCertificates) => {
			return {
				publicCertificates: publicCertificates
			};
		})
		.catch(() => {
			redirectLogin('/login');
		});
}
