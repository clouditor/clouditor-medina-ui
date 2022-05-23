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
	import { Table } from 'sveltestrap';
	import A from '../discovery/[...id].svelte';

	export let results: AssessmentResult[];
</script>

<h2>Security Assessment Results</h2>

{#if results}
	<Table hover>
		<thead>
			<tr>
				<th>Date</th>
				<th>Time</th>
				<th>Resource ID</th>
				<th>Metric</th>
				<th>Compliant</th>
			</tr>
		</thead>
		<tbody>
			{#each results as result, i}
				<tr class={result.compliant ? 'table-success' : 'table-danger'}>
					<td>{new Date(result.timestamp).toLocaleDateString()} </td>
					<td>{new Date(result.timestamp).toLocaleTimeString()}</td>
					<td>{result.resourceId}</td>
					<td>
						{$metrics.get(result.metricId)?.name ?? 'Unknown'}
					</td>
					<td>{result.compliant}</td>
				</tr>
			{/each}
		</tbody>
	</Table>
{:else}
	Loading...
{/if}
