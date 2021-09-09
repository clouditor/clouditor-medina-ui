import { metrics } from "./stores";

export interface Metric {
    id: number
    name: string
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