import { clouditorize } from './util';
export interface StartDiscoveryResponse {
    successful: boolean
}

export interface QueryResponse {
    results: Resource[]
}

export interface ListResourcesRequest {
    filter?: Filter
    orderBy?: string
}

export interface Filter {
   cloudServiceId?:string
   type?: string
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
    cloudServiceId: string
    resourceType: string
    properties: string
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

export async function listResources(
    filteredServiceId?: string,
    type = "",
    fetch = window.fetch): Promise<Resource[]> {
    let apiUrl = clouditorize(`/v1/discovery/resources?filter.cloudServiceId=${filteredServiceId}&pageSize=1500&orderBy=resource_type&asc=true
    `);

    if (type != "") {
        apiUrl += "&filter.type=${type}"
    }

    let emptyResource: Resource[] = [];
    
    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
        }
    }).then(res => {
        if (!res.ok) {
            return Promise.reject(res)
        }
        return res.json()
    }).then((response: QueryResponse) => {
        return response.results;
    }).catch(error => {
        console.log("Error calling endpoint '/v1/discovery/resources':", error)
        return emptyResource;
    });
    }
