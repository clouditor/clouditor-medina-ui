<script lang="ts">
	import { Button, Table, Tooltip } from 'sveltestrap';
	import { startDiscovery } from '$lib/discovery';
	import type { PageData } from './$types';
import { short } from '$lib/util';

	export let data: PageData;
	const { resources } = data;
</script>

<h2>Discovered Resources</h2>

<Table>
	<thead>
		<tr>
			<th>#</th>
			<th>Name</th>
			<th>Type</th>
			<th>Raw</th>
		</tr>
	</thead>
	<tbody>
		{#each resources as resource, i}
			<tr>
				<th scope="row">{i}</th>
				<td>
					<span id={`resource-${i}`} style="cursor: pointer">{short(resource.id)}</span>
					<Tooltip target={`resource-${i}`} placement="bottom">{resource.id}</Tooltip>
				</td>
				<td>{resource.resourceType.split(",")[0]}</td>
				<td><pre>{JSON.stringify(resource)}</pre></td>
			</tr>
		{/each}
	</tbody>
</Table>

<Button on:click={startDiscovery}>Start Discovery</Button>
