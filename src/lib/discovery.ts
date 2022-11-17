import { env } from '$env/dynamic/public';
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
    const apiUrl = env.OAUTH_CLOUDITOR_URL + `/v1/discovery/start`;
    const providers = prompt("Enter providers (seperated with comma)", "").split(",");

    return fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
            'providers': providers,
        }),
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
    const apiUrl = env.OAUTH_CLOUDITOR_URL + `/v1/discovery/query`;

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