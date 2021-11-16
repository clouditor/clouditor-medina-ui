export interface StartDiscoveryResponse {
    successful: boolean
}

export interface QueryResponse {
    results: Resource[]
}

export interface Resource {
    id: string
    name: string
    type: string[]
}

export async function startDiscovery(): Promise<boolean> {
    const apiUrl = `/v1/discovery/start`;

    return fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({})
    })
        .then((res) => res.json())
        .then((response: StartDiscoveryResponse) => {
            return response.successful;
        });
}


export async function queryDiscovery(): Promise<Resource[]> {
    const apiUrl = `/v1/discovery/query`;

    return fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({})
    })
        .then((res) => res.json())
        .then((response: QueryResponse) => {
            return response.results;
        });
}