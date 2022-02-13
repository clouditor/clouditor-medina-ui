<script lang="ts" context="module">
	import { queryDiscovery } from '$lib/discovery';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch, session, context }) {
		return queryDiscovery().then((results) => {
			return {
				props: {
					resources: results
				}
			};
		});
	}
</script>

<script lang="ts">
	import { Button, Table } from 'sveltestrap';
	import { Resource, startDiscovery } from '$lib/discovery';
	import { base } from '$app/paths';

	export let resources: Resource[] = [];
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
