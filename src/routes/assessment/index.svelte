<script lang="ts" context="module">
	import { AssessmentResult, listAssessmentResults, Metric } from '$lib/assessment';
	import { listMetrics } from '$lib/orchestrator';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		let results = await listAssessmentResults();

		let array = await listMetrics();

		for (let metric of array) {
			metrics.update((m) => m.set(metric.id, metric));
		}

		return {
			props: {
				results: results
			}
		};
	}
</script>

<script lang="ts">
	import { Table } from 'sveltestrap';
	import { metrics } from '$lib/stores';

	export let results: AssessmentResult[];
</script>

Results:

{#if results}
	<Table>
		<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Metric</th>
				<th>Raw</th>
			</tr>
		</thead>
		<tbody>
			{#each results as result, i}
				<tr>
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
