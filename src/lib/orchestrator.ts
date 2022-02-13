import type { AssessmentResult, Metric } from "./assessment";

export interface ListMetricsResponse {
    metrics: Metric[];
}


export interface ListAssessmentResultsResponse {
    results: AssessmentResult[]
}

/**
 * Requests a list of assessment results from the orchestrator service.
 * 
 * @returns an array of {@link AssessmentResult}s.
 */
export async function listAssessmentResults(): Promise<AssessmentResult[]> {
    const apiUrl = `/v1/orchestrator/assessment_results`;

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: ListAssessmentResultsResponse) => {
            return response.results;
        });
}

export async function getMetric(id: number): Promise<Metric> {
    const apiUrl = `/v1/orchestrator/metrics/${id}`

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: Metric) => {
            return response;
        });
}

export async function listMetrics(): Promise<Metric[]> {
    const apiUrl = `/v1/orchestrator/metrics`

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: ListMetricsResponse) => {
            return response.metrics;
        });
}