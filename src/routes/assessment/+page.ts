import { metrics } from '$lib/stores';
import type { AssessmentResult } from '$lib/assessment';
import { listMetrics, listAssessmentResults } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	listMetrics(fetch)
		.then((list) => {
			for (const metric of list) {
				// update metrics store
				metrics.update((m) => m.set(metric.id, metric));
			}
		})
		.catch(() => {
			// ignore, we will catch it later
		});


	return listAssessmentResults()
		.then((results) => {
			results = results.sort((a: AssessmentResult, b: AssessmentResult) => {
				return new Date(a.timestamp) > new Date(b.timestamp) ? -1 : 1;
			});
			return {
				results: results
			};
		})
		.catch(() => {
			return redirectLogin('/assessment');
		});
}
