<script lang="ts">
	import type { StartDiscoveryResponse } from '$lib/discovery';
	import type { QueryResponse } from '$lib/login';
	import { Button, Table } from 'sveltestrap';

	let success;
	let result: any[] = [];

	function startDiscovery() {
		const apiUrl = `/v1/discovery/start`;

		fetch(apiUrl, {
			method: 'POST',
			body: JSON.stringify({})
		})
			.then((res) => res.json())
			.then((response: StartDiscoveryResponse) => {
				success = response.successful;
			});
	}

	function queryDiscovery() {
		const apiUrl = `/v1/discovery/query`;

		fetch(apiUrl, {
			method: 'POST',
			body: JSON.stringify({})
		})
			.then((res) => res.json())
			.then((response: QueryResponse) => {
				result = response.result;
			});
	}
</script>

<Button on:click={startDiscovery}>Start</Button>
<Button on:click={queryDiscovery}>Query</Button>

<p>Was successful: {success}</p>

<p>Result</p>

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
		{#each result as resource, i}
			<tr>
				<th scope="row">{i}</th>
				<td>{resource.name}</td>
				<td>{resource.type.join(', ')}</td>
				<td><pre>{JSON.stringify(resource)}</pre></td>
			</tr>
		{/each}
	</tbody>
</Table>
