import { getCatalog } from '$lib/orchestrator';
import type { LoadEvent } from '@sveltejs/kit';

export async function load({ fetch, params }: LoadEvent) {
    
    const catalog = await getCatalog(params.id, fetch);

    return {
        catalog: catalog
    }
}