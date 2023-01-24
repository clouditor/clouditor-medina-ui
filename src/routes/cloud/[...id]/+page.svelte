<script lang="ts">
export let data: import('./$types').PageData;
import { Button} from 'sveltestrap';
</script>

<div class="h-100 p-5 bg-light border rounded-3">
	<h2>{data.service.name}</h2>
	<p>
		{data.service.id} <br/>
		{data.service.description}
		<!-- TODO(all): How to call the remove() from CloudServiceCard.svelte? Or do we have to write a separate remove-function? -->
		<!-- <Button color="danger" on:click={() => remove(service.id)}><Fa icon={faTrash} /></Button> -->
	</p>
	<p>
		<a href="./{data.service.id}/discovery">
			{data.statistics.discoveredResources} discovered resources
		</a>
	</p>
	<a href="./{data.service.id}/configuration">
		<button class="btn btn-outline-secondary" type="button">Configure</button>
	</a>
</div>
