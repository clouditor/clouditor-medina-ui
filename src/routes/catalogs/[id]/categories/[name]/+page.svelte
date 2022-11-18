<script lang="ts">
import { Table } from 'sveltestrap';
import ControlRow from '$lib/components/ControlRow.svelte';

export let data: import('./$types').PageData;
</script>

<Table hover striped class="mt-2">
	<thead>
		<tr>
			<th style="text-align: center">ID</th>
			<th>Name</th>
			<th>Description</th>
			<th>Metrics</th>
		</tr>
	</thead>
	<tbody>
		{#each data.controls as control, index}
			<ControlRow {control} {index} />
		{/each}
	</tbody>
</Table>
