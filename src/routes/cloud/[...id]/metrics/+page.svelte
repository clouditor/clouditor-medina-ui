<script lang="ts">
	import { Table } from 'sveltestrap';
	import MetricImplementationBlock from '$lib/MetricImplementationBlock.svelte';
	import MetricConfigurationBlock from '$lib/MetricConfigurationBlock.svelte';
	import { getMetricImplementation, getMetricConfiguration } from '$lib/orchestrator';
	import type { Metric, MetricImplementation, MetricConfiguration} from '$lib/assessment';
	import type { PageData } from './$types';

	export let data: PageData;
	
	async function fetchImplementation(metric: Metric): Promise<MetricImplementation> {
		return await getMetricImplementation(metric.id);
	}

	async function fetchConfiguration(cloud_service_id: string, metric: Metric): Promise<MetricConfiguration> {
		return await getMetricConfiguration(cloud_service_id, metric.id);
	}
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
						{#await fetchImplementation(metric) then impl}
							<MetricImplementationBlock {impl} />
						{/await}
					</td>
					<td>
						<!-- svelte-ignore empty-block -->
						{#await fetchConfiguration(data.service.id, metric)}
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
