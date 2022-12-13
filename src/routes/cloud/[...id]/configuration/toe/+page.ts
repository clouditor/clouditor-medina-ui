import { listCatalogs, listTargetsOfEvaluation } from '$lib/orchestrator';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, parent }) => {
    const data = await parent();
    const targets = await listTargetsOfEvaluation(data.service.id, fetch);
    const catalogs = await listCatalogs(fetch);

    return {
        targets: targets,
        catalogs: catalogs
    }
}
