import { env } from '$env/dynamic/public';
import { throwError } from "$lib/orchestrator";

export interface Evidence {
    id: string
    resource: object
}

/**
 * Retrieves a particular metric from the orchestrator service.
 * 
 * @param id the metric id
 * @returns 
 */
export async function getEvidence(id: string): Promise<Evidence> {
    const apiUrl = clouditorize(/v1/evidence_store / evidences / ${ id }`)

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${ localStorage.token }`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
        .then((response: Evidence) => {
            return response;
        });
}