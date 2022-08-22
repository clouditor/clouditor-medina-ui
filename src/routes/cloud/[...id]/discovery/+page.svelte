<script lang="ts">
import Fa from 'svelte-fa';
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'sveltestrap';

export let data: import('./$types').PageData;
</script>

<Table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Resource type</th>
			<th>Creation time</th>
		</tr>
	</thead>
	<tbody>
		{#each data.resources as resource}
			<tr>
				<td><a href="/discovery/{resource.id}">{resource.name}</a></td>
				<td><Fa icon={faBoxArchive} /> {resource.type[0]}</td>
				<td>{new Date(resource.creationTime * 1000).toString()}</td>
			</tr>
		{/each}
	</tbody>
</Table>
