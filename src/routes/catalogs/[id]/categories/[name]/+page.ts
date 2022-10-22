import { listControls } from '$lib/orchestrator';
import type { LoadEvent } from '@sveltejs/kit';

export async function load({ fetch, params }: LoadEvent) {
    const controls = await listControls(params.id, params.name, fetch);

    return {
        controls: controls
    }
}