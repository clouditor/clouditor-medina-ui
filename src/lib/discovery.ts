import { clouditorize } from './util';
export interface StartDiscoveryResponse {
    successful: boolean
}

export interface QueryResponse {
    results: Resource[]
}

export interface QueryRequest {
    filteredServiceId?: string
    orderBy?: string
}

export interface StartRequest {
    resourceGroup?: string
}

export interface HttpEndpoint {
    transportEncryption?: TransportEncryption
}

export interface TransportEncryption {
    algorithm: string
    enabled: boolean
    enforced: boolean
    tlsVersion: string
}

export interface Resource {
    id: string
    name: string
    type: string[]
    httpEndpoint?: HttpEndpoint
    creationTime: number
}

export async function startDiscovery(resourceGroup: string, fetch = window.fetch): Promise<boolean> {
    const apiUrl = clouditorize(`/v1/discovery/start?resourceGroup=${resourceGroup}`)

    const req: StartRequest = {};
    if (resourceGroup) {
        req.resourceGroup = resourceGroup;
    }

    return fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: StartDiscoveryResponse) => {
            return response.successful;
        });
}

export async function queryDiscovery(
    filteredServiceId?: string,
    orderBy = "",
    fetch = window.fetch): Promise<Resource[]> {
    const apiUrl = clouditorize(`/v1/discovery/query`);

    const req: QueryRequest = {};

    if (filteredServiceId) {
        req.filteredServiceId = filteredServiceId;
    }

    req.orderBy = orderBy;

    return fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    })
        .then((res) => res.json())
        .then((response: QueryResponse) => {
            return response.results;
        });
}