import { env } from '$env/dynamic/public';
import type { AssessmentResult, Metric, MetricConfiguration, MetricImplementation } from "./assessment";
import { clouditorize } from './util';

export interface CloudService {
    id: string
    name: string
    description: string
    requirements: Requirements
}

export interface Requirements {
    requirementIds: string[]
}

export interface Requirement {
    id: string
    name: string
    description: string
    metricIds: string[]
    category: string
}

export interface ListMetricsResponse {
    metrics: Metric[];
}

export interface ListMetricConfigurationsResponse {
    configurations: Map<string, MetricConfiguration>;
}

export interface Certificate {
    id: string
    name: string
    serviceId: string
    issueDate: string
    expirationDate: string
    standard: string
    assuranceLevel: string
    cab: string
    description: string
    states: State[]
}

export interface State {
    state: string
    treeId: string
    timestamp: string
    certificateId: string
}

export interface ListCertificatesResponse {
    certificates: Certificate[];
}

export interface ListAssessmentResultsResponse {
    results: AssessmentResult[]
}

export interface ListCloudServicesResponse {
    services: CloudService[]
}

export interface ListRequirementsResponse {
    requirements: Requirement[]
}

/**
 * Requests a list of assessment results from the orchestrator service.
 * 
 * @returns an array of {@link AssessmentResult}s.
 */
export async function listAssessmentResults(): Promise<AssessmentResult[]> {
    const apiUrl = clouditorize(`/v1/orchestrator/assessment_results?pageSize=1000`);

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
        .then((response: ListAssessmentResultsResponse) => {
            return response.results;
        });
}

/**
 * Requests a list of assessment results from the orchestrator service.
 * 
 * @returns an array of {@link AssessmentResult}s.
 */
export async function listCloudServiceAssessmentResults(serviceId: string, fetch = window.fetch): Promise<AssessmentResult[]> {
    const apiUrl = clouditorize(`/v1/orchestrator/cloud_services/${serviceId}/assessment_results?pageSize=100`);

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
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
export async function getMetric(id: string): Promise<Metric> {
    const apiUrl = clouditorize(`/v1/orchestrator/metrics/${id}`)

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
        .then((response: Metric) => {
            return response;
        });
}

/**
 * Retrieves a particular metric implementation from the orchestrator service.
 * 
 * @param id the metric id
 * @returns 
 */
export async function getMetricImplemenation(id: string): Promise<MetricImplementation> {
    const apiUrl = clouditorize(`/v1/orchestrator/metrics/${id}/implementation`)

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
        .then((response: MetricImplementation) => {
            return response;
        });
}

/**
 * Retrieves a particular metric implementation from the orchestrator service.
 * 
 * @param id the metric id
 * @returns 
 */
export async function listMetricConfigurations(serviceId: string, skipDefault = false): Promise<Map<string, MetricConfiguration>> {
    const apiUrl = clouditorize(`/v1/orchestrator/cloud_services/${serviceId}/metric_configurations`)

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
        .then((response: ListMetricConfigurationsResponse) => {
            let entries: [string, MetricConfiguration][] = Object.entries(response.configurations);

            if (skipDefault) {
                entries = entries.filter(([, value]) => {
                    return !value.isDefault
                })
            }

            return new Map<string, MetricConfiguration>(entries);
        });
}

/**
 * Retrieves a list of cloud services from the orchestrator service.
 * 
 * @returns an array of {@link CloudService}s.
 */
export async function listCloudServices(): Promise<CloudService[]> {
    const apiUrl = clouditorize(`/v1/orchestrator/cloud_services`)

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
        .then((response: ListCloudServicesResponse) => {
            return response.services;
        });
}

/**
 * Retrieve a cloud service from the orchestrator service using its ID.
 * 
 * @returns the cloud service
 */
export async function getCloudService(id: string, fetch = window.fetch): Promise<CloudService> {
    const apiUrl = clouditorize(`/v1/orchestrator/cloud_services/${id}`)

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
}

export async function updateCloudService(service: CloudService, fetch = window.fetch): Promise<CloudService> {
    const apiUrl = clouditorize(`/v1/orchestrator/cloud_services/${service.id}`)

    return fetch(apiUrl, {
        method: 'PUT',
        body: JSON.stringify(service),
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
        .then((response: CloudService) => {
            return response;
        });
}

/**
 * Retrieves a list of metrics from the orchestrator service.
 * 
 * @returns an array of {@link Metric}s.
 */
export async function listMetrics(): Promise<Metric[]> {
    const apiUrl = clouditorize(`/v1/orchestrator/metrics ? pageSize = 200`)

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
        .then((response: ListMetricsResponse) => {
            return response.metrics;
        });
}

/**
 * Throws an {@link Error} if an HTTP status other than OK is contained in {@link response}.
 * 
 * @param response the original HTTP response
 * @returns the response or an error
 */
export function throwError(response: Response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

/**
 * Retrieves a list of requirements from the orchestrator service.
 * 
 * @returns an array of {@link Requirement}s.
 */
export async function listRequirements(): Promise<Requirement[]> {
    const apiUrl = clouditorize(`/v1/orchestrator/requirements`)

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
        .then((response: ListRequirementsResponse) => {
            return response.requirements;
        });
}

/**
 * Retrieves a list of certificates from the orchestrator service.
 * 
 * @returns an array of {@link Certificate}s.
 */
export async function listCertificates(): Promise<Certificate[]> {
    const apiUrl = clouditorize(`/v1/orchestrator/certificates`)

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then(throwError)
        .then((res) => res.json())
        .then((response: ListCertificatesResponse) => {
            return response.certificates;
        });
}

