import { requirements } from '$lib/stores';
import { listCloudServices, listRequirements, updateCloudService } from '$lib/orchestrator';
import type { CloudService } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ params, fetch, context }) {
	// TODO(oxisto): this should be moved to more central component
	listRequirements()
		.then((list) => {
			for (const requirement of list) {
				// update requirements store
				requirements.update((r) => r.set(requirement.id, requirement));
			}
		})
		.catch(() => {
			// ignore, we will catch it later
		});

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
