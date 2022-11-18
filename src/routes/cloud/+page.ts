import { controls } from '$lib/stores';
import { listCloudServices, updateCloudService } from '$lib/orchestrator';
import type { CloudService } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
 export async function load({ params, fetch, context }) {
	return listCloudServices()
		.then((services) => {
			return {
				services: services,
			};
		})
		.catch(() => {
			return redirectLogin('/cloud');
		});
}
