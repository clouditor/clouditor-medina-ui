<script lang="ts">
	import { Button, Table } from 'sveltestrap';
	import { startDiscovery } from '$lib/discovery';
	import type { Resource } from '$lib/discovery';
	import { base } from '$app/paths';
	import type { PageData } from './$types';

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
				<td><a href="{base}/discovery/{resource.id}">{resource.name}</a></td>
				<td>{resource.type.join(', ')}</td>
				<td><pre>{JSON.stringify(resource)}</pre></td>
			</tr>
		{/each}
	</tbody>
</Table>

<Button on:click={startDiscovery}>Start Discovery</Button>
