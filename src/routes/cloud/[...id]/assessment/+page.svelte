<script lang="ts">
import AssessmentResultRow from '$lib/components/AssessmentResultRow.svelte';
import { Table } from 'sveltestrap';

export let data: import('./$types').PageData;
</script>

<Table hover striped class="mt-2">
	<thead>
		<tr>
			<th style="text-align: center">Compliant</th>
			<th>Date</th>
			<th>Resource ID</th>
			<th>Resource Type</th>
			<th>Metric</th>
			<th>Metric Category</th>
		</tr>
	</thead>
	<tbody>
		{#each data.results as result, index}
			<AssessmentResultRow {result} {index} />
		{/each}
	</tbody>
</Table>
