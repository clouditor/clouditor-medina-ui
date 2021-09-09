export interface AssessmentResult {
    resourceId: String
    compliant: boolean
    metricId: number
}

export interface Metric {
    id: number
    name: string
}

export interface ListAssessmentResultsResponse {
    results: AssessmentResult[]
}

/**
 * Requests a list of assessment results from the assessment service.
 * 
 * @returns an array of {@link AssessmentResult}s.
 */
export async function listAssessmentResults(): Promise<AssessmentResult[]> {
    const apiUrl = `/v1/assessment/results`;

    return fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({})
    })
        .then((res) => res.json())
        .then((response: ListAssessmentResultsResponse) => {
            return response.results;
        });
}