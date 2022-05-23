<script lang="ts" context="module">
	import type { AssessmentResult, Metric, MetricImplementation } from '$lib/assessment';
	import { listMetrics, listAssessmentResults, getMetricImplemenation } from '$lib/orchestrator';
	import { redirectLogin } from '$lib/oauth';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch, session, context }) {
		return listMetrics()
			.then((results) => {
				return {
					props: {
						metrics: results
					}
				};
			})
			.catch(() => {
				return redirectLogin('/metrics');
			});
	}
</script>

<script lang="ts">
	import { Table } from 'sveltestrap';
	import MetricImplementationBlock from '$lib/MetricImplementationBlock.svelte';
	import A from '../discovery/[...id].svelte';

	export let metrics: Metric[];

	async function fetchImplementation(metric: Metric): Promise<MetricImplementation> {
		return await getMetricImplemenation(metric.id);
	}
</script>

<h2>Configured Metrics</h2>

The following metrics are configued in the Clouditor orchestrator.

{#if metrics}
	<Table hover>
		<thead>
			<tr>
				<th>#</th>
				<th>Description</th>
				<th>Implementation</th>
			</tr>
		</thead>
		<tbody>
			{#each metrics as metric, i}
				<tr>
					<td>{metric.id}</td>
					<td>{metric.description}</td>
					<td>
						{#await fetchImplementation(metric) then impl}
							<MetricImplementationBlock {impl} />
						{/await}
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
{:else}
	Loading...
{/if}
