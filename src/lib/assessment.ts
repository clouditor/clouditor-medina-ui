export interface AssessmentResult {
    resourceId: string
    compliant: boolean
    metricId: number
}

export interface Metric {
    id: number
    name: string
}
