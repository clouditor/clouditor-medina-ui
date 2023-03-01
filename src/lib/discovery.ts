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

export async function startDiscovery(): Promise<boolean> {
    const apiUrl = clouditorize(`/v1/discovery/start`)

    return fetch(apiUrl, {
        method: 'POST',
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
    let emptyResource: Resource[] = [];
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
            if (response.results == undefined) {
                return emptyResource;
            }
            return response.results;
        });
    }