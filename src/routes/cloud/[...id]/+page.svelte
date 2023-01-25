<script lang="ts">
export let data: import('./$types').PageData;
import { Button} from 'sveltestrap';
import Fa from 'svelte-fa';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { removeCloudService } from '$lib/orchestrator';
</script>

<div class="h-100 p-5 bg-light border rounded-3">
	<h2>{data.service.name}</h2>
	<p>
		{data.service.id} <br/>
		{data.service.description}
	</p>
	<p>
		<a href="./{data.service.id}/discovery">
			{data.statistics.discoveredResources} discovered resources
		</a>
	</p>
	<a href="./{data.service.id}/configuration">
		<button class="btn btn-outline-secondary" type="button">Configure</button>
	</a>
		<Button color="danger" on:click={() => removeCloudService(data.service.id)}><Fa icon={faTrash} /></Button>
</div>
