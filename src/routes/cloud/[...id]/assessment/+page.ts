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
        .catch((error) => {
            console.log("DEBUG:", error.message)
            if (error.message == "Not Found") { 
                // TODO(lebogg): View some hinting message 
                console.log("In If")             
            } else {
                console.log("In Else")
                // redirectLogin(`/cloud/${params.id}/assessment`);
            }
        });
}

