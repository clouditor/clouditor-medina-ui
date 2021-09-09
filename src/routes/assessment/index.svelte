<script lang="ts" context="module">
	import { browser } from '$app/env';
	import { AssessmentResult, listAssessmentResults } from '$lib/assessment';
	import { metrics } from '$lib/stores';
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		let results = await listAssessmentResults();

		return {
			props: {
				results: results
			}
		};
	}
</script>

<script lang="ts">
	import { Table } from 'sveltestrap';
	import { getMetric, Metric } from '$lib/orchestrator';

	export let results: AssessmentResult[];

	async function getMetricCached(id: number): Promise<Metric> {
		// TODO: implement store caching

		return await getMetric(id);
	}
</script>

Results:

{#if results}
	<Table>
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
				<tr>
					<th scope="row">{i}</th>
					<td>{result.resourceId}</td>
					<td>
						{#await getMetricCached(1) then metric}
							{metric.name}
						{/await}
					</td>
					<td>{result.compliant}</td>
				</tr>
			{/each}
		</tbody>
	</Table>
{:else}
	Loading...
{/if}
