import { listResources } from '$lib/discovery';
import { getCloudService } from '$lib/orchestrator';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
    const service = await getCloudService(params.id, fetch);
    const resources = await listResources(service.id, "",fetch);

    return {
        service: service,
        resources: resources,
        statistics: {
            discoveredResources: resources.length,
        }
    }
}