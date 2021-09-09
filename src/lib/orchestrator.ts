import type { Metric } from "./assessment";

export interface ListMetricsResponse {
    metrics: Metric[];
}

export async function getMetric(id: number): Promise<Metric> {
    const apiUrl = `/v1/orchestrator/metrics/${id}`

    return fetch(apiUrl, {
        method: 'GET'
    })
        .then((res) => res.json())
        .then((response: Metric) => {
            return response;
        });
}

export async function listMetrics(): Promise<Metric[]> {
    const apiUrl = `/v1/orchestrator/metrics`

    return fetch(apiUrl, {
        method: 'GET'
    })
        .then((res) => res.json())
        .then((response: ListMetricsResponse) => {
            return response.metrics;
        });
}