export interface LoginResponse {
    accessToken: string
}

export interface QueryResponse {
    result: Evidence[]
}

export interface Evidence {
    id: String
    name: String
}