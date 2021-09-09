<script lang="ts" context="module">
	import { AssessmentResult, listAssessmentResults } from '$lib/assessment';
	import { metrics } from '$lib/stores';
	import { listMetrics } from '$lib/orchestrator';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		listMetrics().then((list) => {
			for (let metric of list) {
				// update metrics store
				metrics.update((m) => m.set(metric.id, metric));
			}
		});

		return listAssessmentResults().then((results) => {
			return {
				props: {
					results: results
				}
			};
		});
	}
</script>

<script lang="ts">
	import { Table } from 'sveltestrap';

	export let results: AssessmentResult[];
</script>

<h2>Security Assessment Results</h2>

{#if results}
	<Table hover>
		<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Metric</th>
				<th>Compliant</th>
			</tr>
		</thead>
		<tbody>
			{#each results as result, i}
				<tr class={result.compliant ? 'table-success' : 'table-danger'}>
					<th scope="row">{i}</th>
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
