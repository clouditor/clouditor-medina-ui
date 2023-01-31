<script lang="ts">
	import { Table } from 'sveltestrap';
	import MetricImplementationBlock from '$lib/MetricImplementationBlock.svelte';
	import MetricConfigurationBlock from '$lib/MetricConfigurationBlock.svelte';
	import { getMetricImplementation, getMetricConfiguration } from '$lib/orchestrator';
	import type { PageData } from './$types';

	export let data: PageData;
	
</script>

<h2>Configured Metrics</h2>

The following metrics are configured for the Cloud Service.

{#if data.metrics}
	<Table hover>
		<thead>
			<tr>
				<th>#</th>
				<th>Description</th>
				<th>Implementation</th>
				<th>Configuration</th>
			</tr>
		</thead>
		<tbody>
			{#each data.metrics as metric, i}
				<tr>
					<td>{metric.id}</td>
					<td>{metric.description}</td>
					<td>
						{#await getMetricImplementation(metric.id) then impl}
							<MetricImplementationBlock {impl} />
						{/await}
					</td>
					<td>
						<!-- svelte-ignore empty-block -->
						{#await getMetricConfiguration(data.service.id, metric.id)}
						{:then config}
							<MetricConfigurationBlock {config} />
						{:catch}
						<p>No configuration available</p>
						{/await}
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
{:else}
	Loading...
{/if}
