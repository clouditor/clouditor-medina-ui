import { queryDiscovery } from '$lib/discovery';
import { getCloudService } from '$lib/orchestrator';
import type { LoadEvent } from '@sveltejs/kit';

export async function load({ fetch, params, depends }: LoadEvent) {
    depends("service-changed");
    const service = await getCloudService(params.id, fetch);

    // TODO(oxisto): replace this with an appropriate backend call to gather statistics
    const resources = await queryDiscovery(service.id, "", fetch);

    return {
        service: service,
        statistics: {
            discoveredResources: resources.length,
        }
    }
}