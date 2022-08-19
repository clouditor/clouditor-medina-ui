<script lang="ts">
	import { Table } from 'sveltestrap';
	import MetricImplementationBlock from '$lib/MetricImplementationBlock.svelte';
	import { getMetricImplemenation } from '$lib/orchestrator';
	import type { Metric, MetricImplementation } from '$lib/assessment';
	import type { PageData } from './$types';

	export let data: PageData;

	async function fetchImplementation(metric: Metric): Promise<MetricImplementation> {
		return await getMetricImplemenation(metric.id);
	}
</script>

<h2>Configured Metrics</h2>

The following metrics are configued in the Clouditor orchestrator.

{#if data.metrics}
	<Table hover>
		<thead>
			<tr>
				<th>#</th>
				<th>Description</th>
				<th>Implementation</th>
			</tr>
		</thead>
		<tbody>
			{#each data.metrics as metric, i}
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
