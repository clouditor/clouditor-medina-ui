import { redirectLogin } from "$lib/oauth";
import { listCloudServiceAssessmentResults } from "$lib/orchestrator";
import type { LoadEvent } from "@sveltejs/kit";

export async function load({ fetch, params }: LoadEvent) {
    return listCloudServiceAssessmentResults(params.id, fetch)
        .then((results) => {
            return {
                results: results,
            };
        })
        .catch(() => {
            redirectLogin(`/cloud/${params.id}/assessment`);
        });
}

