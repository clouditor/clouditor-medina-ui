import { listMetrics } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	return listMetrics(fetch)
		.then((results) => {
			return {
				metrics: results
			};
		})
		.catch(() => {
			redirectLogin('/metrics');
		});
}
