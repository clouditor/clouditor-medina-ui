<script lang="ts">
	import { Table } from 'sveltestrap';
	import type { PageData } from './$types';

	export let data: PageData;
	let { catalogs } = data;
</script>

<h2>Catalogs</h2>

{#if catalogs}
	<Table hover striped class="mt-2">
		<thead>
			<tr>
				<th>Name</th>
				<th>Description</th>
				<th>Controls</th>
			</tr>
		</thead>
		<tbody>
			{#each catalogs as catalog}
			<tr>
				<td>{catalog.name}</td>
				<td>{catalog.description}</td>
				<td>{catalog.controls}</td>
			</tr>
			{/each}
		</tbody>
	</Table>
{:else}
	Loading...
{/if}
