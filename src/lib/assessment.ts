export interface AssessmentResult {
    resourceId: string
    compliant: boolean
    metricId: string
    timestamp: string
}

export interface Metric {
    id: string
    name: string
    description: string
}

export interface MetricImplementation {
    metricId: string
    lang: string
    code: string
}
