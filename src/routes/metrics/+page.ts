import type { AssessmentResult, Metric, MetricImplementation } from '$lib/assessment';
import { listMetrics, listAssessmentResults, getMetricImplemenation } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ params, fetch, context }) {
	return listMetrics()
		.then((results) => {
			return {
				metrics: results
			};
		})
		.catch(() => {
			redirectLogin('/metrics');
		});
}
