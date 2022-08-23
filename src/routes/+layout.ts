import { listMetrics } from "$lib/orchestrator";
import { metrics } from "$lib/stores";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
    // Since we want a map for convenience, we need to use a store, rather than
    // exposing the metric through a layout data props. Layout data props need
    // to be JSON and thus, a real ES6 map cannot be used.
    listMetrics().then((list) => {
        for (const metric of list) {
            // update metrics store
            metrics.update((m) => m.set(metric.id, metric));
        }
    })
        .catch(() => {
            // ignore, we will catch it later
        });
}