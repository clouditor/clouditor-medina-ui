import type { AssessmentResult, Metric } from "./assessment";

export interface CloudService {
    id: number
    name: string
    description: string
}

export interface ListMetricsResponse {
    metrics: Metric[];
}


export interface ListAssessmentResultsResponse {
    results: AssessmentResult[]
}

export interface ListCloudServicesResponse {
    services: CloudService[]
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

/**
 * Retrieves a particular metric from the orchestrator service.
 * 
 * @param id the metric id
 * @returns 
 */
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

/**
 * Retrieves a list of metrics from the orchestrator service.
 * 
 * @returns an array of {@link Metric}s.
 */
export async function listCloudServices(): Promise<CloudService[]> {
    const apiUrl = `/v1/orchestrator/cloud_services`

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: ListCloudServicesResponse) => {
            return response.services;
        });
}

/**
 * Retrieves a list of target cloud services from the orchestrator service.
 * 
 * @returns an array of {@link CloudService}s.
 */
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