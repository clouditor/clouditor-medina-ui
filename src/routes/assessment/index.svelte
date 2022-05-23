<script lang="ts" context="module">
	import { metrics } from '$lib/stores';
	import type { AssessmentResult } from '$lib/assessment';
	import { listMetrics, listAssessmentResults } from '$lib/orchestrator';
	import { redirectLogin } from '$lib/oauth';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch, session, context }) {
		listMetrics()
			.then((list) => {
				for (let metric of list) {
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
					props: {
						results: results
					}
				};
			})
			.catch(() => {
				return redirectLogin();
			});
	}
</script>

<script lang="ts">
	import { Table, Tooltip } from 'sveltestrap';

	export let results: AssessmentResult[];

	function short(resourceID: string) {
		// Split resource by / and take the last index
		const rr = resourceID.split('/');

		return rr[rr.length - 1];
	}
</script>

<h2>Security Assessment Results</h2>

The following list contains all assessment results, sorted by timestamp.

{#if results}
	<Table hover class="mt-2">
		<thead>
			<tr>
				<th>Date</th>
				<th>Time</th>
				<th>Resource ID</th>
				<th>Metric</th>
				<th>Metric Category</th>
				<th>Compliant</th>
			</tr>
		</thead>
		<tbody>
			{#each results as result, i}
				<tr class={result.compliant ? 'table-success' : 'table-danger'}>
					<td>{new Date(result.timestamp).toLocaleDateString()} </td>
					<td>{new Date(result.timestamp).toLocaleTimeString()}</td>
					<td>
						<span id={`resource-${i}`}>{short(result.resourceId)}</span>
						<Tooltip target={`resource-${i}`} placement="bottom">{result.resourceId}</Tooltip>
					</td>
					<td>
						{$metrics.get(result.metricId)?.name ?? 'Unknown'}
					</td>
					<td>
						{$metrics.get(result.metricId)?.category ?? 'Unknown'}
					</td>
					<td>{result.compliant}</td>
				</tr>
			{/each}
		</tbody>
	</Table>
{:else}
	Loading...
{/if}
