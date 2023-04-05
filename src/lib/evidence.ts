import { throwError } from "$lib/orchestrator";
import { clouditorize } from './util';

export interface Evidence {
    id: string
    timestamp: string
    cloudServiceId: string
    toolId: string
    raw: string
    resource: object
}

/**
 * Retrieves a particular evidence from the orchestrator service.
 * 
 * @param id the evidence id
 * @returns 
 */
export async function getEvidence(id: string): Promise<Evidence|null> {
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
        })
        .catch(error => {
            console.log("Error getting evidence: ", error)
            return null;
        });
}