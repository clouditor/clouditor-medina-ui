import { throwError } from "$lib/orchestrator";
import { clouditorize } from './util';

export interface Evidence {
    id: string
    resource: object
    toolId: string
}

/**
 * Retrieves a particular metric from the orchestrator service.
 * 
 * @param id the metric id
 * @returns 
 */
export async function getEvidence(id: string): Promise<Evidence> {
    const apiUrl = clouditorize(`/v1/evidence_store/evidences/${id}`)

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
        .then((response: Evidence) => {
            return response;
        });
}