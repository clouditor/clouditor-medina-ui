import { redirectLogin } from "$lib/oauth";
import { getRuntimeInfo, listCatalogs, listControls, listMetrics } from "$lib/orchestrator";
import { metrics, controls } from "$lib/stores";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ fetch }) => {
    // Since we want a map for convenience, we need to use a store, rather than
    // exposing the metric through a layout data props. Layout data props need
    // to be JSON and thus, a real ES6 map cannot be used.
    listMetrics(fetch).then((list) => {
        for (const metric of list) {
            // update metrics store
            metrics.update((m) => m.set(metric.id, metric));
        }
    })
        .catch(() => {
            // ignore, we will catch it later
        });

    listControls(null, null, fetch).then((list) => {
        controls.set(list);
    })
        .catch(() => {
            // ignore, we will catch it later
        });

        try {
            const runtime = await getRuntimeInfo(fetch);
            const catalogs = await listCatalogs(fetch);
        
            return {
                runtime: runtime, 
                catalogs: catalogs,
                redirect: '/cloud'
            }
        } catch (error) {
            return redirectLogin('/cloud');
        }
}

// Disable SSR
export const ssr = false;