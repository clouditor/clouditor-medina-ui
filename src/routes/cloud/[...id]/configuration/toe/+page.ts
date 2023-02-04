import { listControlsInScope, listTargetsOfEvaluation } from '$lib/orchestrator';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, parent }) => {
    const data = await parent();
    const targets = await listTargetsOfEvaluation(data.service.id, fetch);
    const scopes = await Promise.all(targets.map((toe) =>
        listControlsInScope(data.service.id, toe.catalogId, fetch)))

    return {
        targets: targets,
        scopes: scopes
    }
}
