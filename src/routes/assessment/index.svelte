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
				return redirectLogin('/assessment');
			});
	}
</script>

<script lang="ts">
	import { Table, Tooltip } from 'sveltestrap';
	import Fa from 'svelte-fa';
	import { faSquareCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

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
	<Table hover striped class="mt-2">
		<thead>
			<tr>
				<th>Compliant</th>
				<th>Date</th>
				<th>Time</th>
				<th>Resource ID</th>
				<th>Resource Type</th>
				<th>Metric</th>
				<th>Metric Category</th>
			</tr>
		</thead>
		<tbody>
			{#each results as result, i}
				<tr>
					<td style="text-align: center">
						{#if result.compliant}
							<Fa icon={faSquareCheck} color="green" />
						{:else}
							<Fa icon={faTriangleExclamation} color="darkred" />
						{/if}
					</td>
					<td>{new Date(result.timestamp).toLocaleDateString()} </td>
					<td>{new Date(result.timestamp).toLocaleTimeString()}</td>
					<td>
						<span id={`resource-${i}`} style="cursor: pointer">{short(result.resourceId)}</span>
						<Tooltip target={`resource-${i}`} placement="bottom">{result.resourceId}</Tooltip>
					</td>
					<td>
						<span id={`resource-type-${i}`} style="cursor: pointer">{result.resourceTypes[0]}</span>
						<Tooltip target={`resource-type-${i}`}>{result.resourceTypes.join(' <- ')}</Tooltip>
					</td>
					<td>
						{$metrics.get(result.metricId)?.name ?? 'Unknown'}
					</td>
					<td>
						{$metrics.get(result.metricId)?.category ?? 'Unknown'}
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
{:else}
	Loading...
{/if}
