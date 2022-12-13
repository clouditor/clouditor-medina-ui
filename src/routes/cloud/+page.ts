import { listCloudServices } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async () => {
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
