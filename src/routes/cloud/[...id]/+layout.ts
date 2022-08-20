import { getCloudService } from '$lib/orchestrator';
import type { LoadEvent } from '@sveltejs/kit';

export async function load({ fetch, params }: LoadEvent) {
    const service = await getCloudService(params.id, fetch);

    return {
        service: service
    }
}