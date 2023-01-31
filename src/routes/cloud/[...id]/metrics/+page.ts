import { listMetrics } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, parent }) => {
    const data = await parent();
    const metrics = await listMetrics(fetch);

	listMetrics(fetch)
		.then((results) => {
			return {
				metrics: results
			};
		})
		.catch(() => {
			redirectLogin(`/cloud/${data.service.id}/metrics`);
		});

    return {
        data: data, 
        metrics: metrics
    }
}
