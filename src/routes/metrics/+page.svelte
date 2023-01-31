<script lang="ts">
	import { Table } from 'sveltestrap';
	import MetricImplementationBlock from '$lib/MetricImplementationBlock.svelte';
	import { getMetricImplementation} from '$lib/orchestrator';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>Configured Metrics</h2>

The following metrics are configured in the Clouditor orchestrator.

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
						{#await getMetricImplementation(metric.id) then impl}
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
