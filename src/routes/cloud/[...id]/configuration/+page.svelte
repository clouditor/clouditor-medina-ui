<script lang="ts">
import { invalidate } from '$app/navigation';
import { updateCloudService } from '$lib/orchestrator';
import { toast } from '@zerodevx/svelte-toast';
import { Button, FormGroup, Input } from 'sveltestrap';

export let data: import('./$types').PageData;

async function save(event) {
	try {
		data.service = await updateCloudService(data.service);
		toast.push('Cloud service updated.', { classes: ['toast-success'] });

		// Invalidate the cloud service's URL, so the layout's load function is triggered again
		invalidate(`/v1/orchestrator/cloud_services/${data.service.id}`);
	} catch (err) {
		toast.push(err);
	}
}
</script>

<FormGroup floating label="Name">
	<Input placeholder="Enter a name" bind:value={data.service.name} />
</FormGroup>

<FormGroup floating>
	<Input type="textarea" placeholder="Enter a description" bind:value={data.service.description} />
	<div slot="label">Description</div>
</FormGroup>

<Button color={'primary'} on:click={save}>Save</Button>

<hr />
<pre style="font-size: 0.8rem">data = {JSON.stringify(data, null, ' ')}</pre>

<style>
:root {
	--toastBorderRadius: 0.375rem;
}

:global(.toast-success) {
	--toastBackground: #48bb78;
	--toastBarBackground: #2f855a;
}
</style>
